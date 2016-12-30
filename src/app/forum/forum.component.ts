import {Component, OnInit, OnDestroy} from '@angular/core';
import {ForumService} from '../services/forum.service';
import {ActivatedRoute} from '@angular/router';
import {URLSearchParams} from '@angular/http';
import {Subscription} from "rxjs/Rx";

const PageSize = 3;

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit, OnDestroy {
  topics = [];
  count = [];
  private subscription: Subscription;

  page: string;

  constructor(private forumServicve: ForumService, private route: ActivatedRoute) {
  }


  ngOnInit() {
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

          if (data.result.count <= PageSize){
            this.count.push(1).toString();
          }else{
            for (let i = 1; i <= Math.round(data.result.count/PageSize); ++i) {
              this.count.push(i).toString();
            }
          }
        }
      );
  }
}
