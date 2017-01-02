import {Component, OnInit, OnDestroy} from '@angular/core';
import {ForumService} from '../../services/forum.service';
import {ActivatedRoute, Router} from '@angular/router';
import {URLSearchParams} from '@angular/http';
import {Subscription} from "rxjs/Rx";
import {AuthGuard} from '../../common/auth.guard';

const PageSize = 3;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  topics = [];
  count = [];
  search: string;
  private subscription: Subscription;
  isLogged = false;
  page: string;

  constructor(private forumServicve: ForumService, private route: ActivatedRoute,
              private router: Router, private authGuard: AuthGuard) {
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.count = [];
        this.search = queryParam['title'];
        this.page = queryParam['page'];
        let params = new URLSearchParams();
        params.set('page', this.page);
        params.set('title', this.search);
        this.forumServicve.searchTopics(params)
          .subscribe(
            data => {
              this.topics = data.result.threads;
              this.calculatePages(data.result.count);
            },
            err => console.log(err)
          );
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(){
    if (this.authGuard.canActivate()){
      this.isLogged = true;
    }
    this.router.navigate( ['forum/search'], {queryParams: {title: this.search }});
  }

  calculatePages(count){
    this.count = [];
    if (count <= PageSize){
      this.count.push(1).toString();
    }else{
      for (let i = 1; i <= Math.ceil(count/PageSize); ++i) {
        this.count.push(i).toString();
      }
    }
  }

}
