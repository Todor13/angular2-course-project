import {Component, OnInit, OnDestroy} from '@angular/core';
import {ForumService} from '../services/forum.service';
import {ActivatedRoute, Router} from '@angular/router';
import {URLSearchParams} from '@angular/http';
import {Subscription} from "rxjs/Rx";
import {AuthGuard} from '../common/auth.guard';

const PageSize = 3;

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit, OnDestroy {
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
    if (this.authGuard.canActivate()){
      this.isLogged = true;
    }
    this.subscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.count = [];
        this.page = queryParam['page'];
        let params = new URLSearchParams();
        params.set('page', this.page);
        this.getTopics(params);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getTopics(params: any) {
    this.forumServicve.getTopics(params)
      .subscribe(
        data => {
          this.topics = data.result.threads;
          this.calculatePages(data.result.count);
        },
        err => console.log(err)
      );
  }

  onSubmit(){
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
