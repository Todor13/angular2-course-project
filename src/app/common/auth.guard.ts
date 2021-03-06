import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            //console.log('strange true');
            return true;

        }
        //console.log('strange false');
        // not logged in so redirect to login page
        //this.router.navigate(['/login']);
        return false;
    }
}