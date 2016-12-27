import { Injectable } from '@angular/core';
import { Topic } from '../../models/topic';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { ContentHeaders } from '../common/headers';
import { AuthHeaders } from '../common/auth-headers';

const Domain="http://localhost:4200";
const RegisterUrl="/forum/create";

@Injectable()
export class ForumService {

    constructor(private http: Http){
    }

    createTopic(topic: Topic): Observable<any>{
        return this.http.post(`${Domain}${RegisterUrl}`, JSON.stringify(topic), {headers: AuthHeaders})
            .map((response: Response) => response.json());
    }

}