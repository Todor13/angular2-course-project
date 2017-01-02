import { Headers } from '@angular/http';

export const AuthHeaders = new Headers();
if (localStorage.getItem('currentUser')){
   var currentUser = JSON.parse(localStorage.getItem('currentUser'));
   if (currentUser.token){
      AuthHeaders.append('Authorization', `${currentUser.token}`)
   }
}


AuthHeaders.append('Accept', 'application/json');
AuthHeaders.append('Content-Type', 'application/json');