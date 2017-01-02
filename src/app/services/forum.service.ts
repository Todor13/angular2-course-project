import { Injectable } from '@angular/core';
import { Topic } from '../../models/topic';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { ContentHeaders } from '../common/headers';
import { AuthHeaders } from '../common/auth-headers';

const Domain="http://localhost:4200";
const RegisterUrl="/forum/create";
const TopicsUrl="/forum/threads/";
const SearchUrl="search";

@Injectable()
export class ForumService {

    constructor(private http: Http){
    }

    createTopic(topic: Topic): Observable<any>{
        return this.http.post(`${Domain}${RegisterUrl}`, JSON.stringify(topic), {headers: AuthHeaders})
            .map((response: Response) => response.json());
    }

    getTopics(params: any): Observable<any>{
        return this.http.get(`${Domain}${TopicsUrl}`, {headers: ContentHeaders, search: params})
            .map((response: Response) => response.json());
    }

    getTopicById(id: any): Observable<any>{
        return this.http.get(`${Domain}${TopicsUrl}${id}`, {headers: ContentHeaders})
          .map((response: Response) => response.json());
    }

    addAnswerToTopic(id: string, answer: string): Observable<any>{
        return this.http.post(`${Domain}${TopicsUrl}${id}`, JSON.stringify(answer), {headers: AuthHeaders})
          .map((response: Response) => response.json());
    }

    searchTopics(params: any): Observable<any>{
        return this.http.get(`${Domain}${TopicsUrl}${SearchUrl}`, {headers: ContentHeaders, search: params})
          .map((response: Response) => response.json());
    }

}