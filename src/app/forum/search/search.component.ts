import {Component, OnInit, OnDestroy} from '@angular/core';
import {ForumService} from '../../services/forum.service';
import {ActivatedRoute} from '@angular/router';
import {URLSearchParams} from '@angular/http';
import {Subscription} from "rxjs/Rx";

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

  page: string;

  constructor(private forumServicve: ForumService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.count = [];
        this.search = queryParam['title'];
        this.onSubmit();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(){
    console.log('here');
    let params = new URLSearchParams();
    params.set('title', this.search);
    this.forumServicve.searchTopics(params)
      .subscribe(
        data => {
          this.topics = data.result.threads;
          this.calculatePages(data.result.count);
        },
        err => console.log(err)
      );
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
