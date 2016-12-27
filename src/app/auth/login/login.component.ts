import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  submited=false;
  message: string;

  constructor(public router: Router, public authService: AuthenticationService) {
  }

  login(){
    this.authService.login(this.username, this.password)
        .subscribe(data=>this.handleResponse(data));

  }

  handleResponse(data){
    console.log(data);
    if (!data.error){
      this.submited = true;
      this.message = `Welcome ${data}!`;
      setTimeout(()=>this.router.navigate(['home']), 2000);
    }else {
      this.message = data.error;
    }
  }

}
