import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import { ContentHeaders } from '../common/headers';

const Domain="http://localhost:4200";
const RegisterUrl="/register";

@Injectable()
export class UserService {

    constructor(private http: Http){
    }

    register(user: User): Observable<any>{
        return this.http.post(`${Domain}${RegisterUrl}`, JSON.stringify(user), {headers: ContentHeaders})
            .map((response: Response) => response.json());
    }

}