import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/index';
import { LoggedService } from '../../shared/logged.service';
import { Logged } from '../../../models/logged';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private logged: Logged;
  username: string;
  password: string;
  submited = false;
  message: string;

  constructor(public router: Router, public authService: AuthenticationService, private loggedService: LoggedService) {
  }

  login(){
    this.logged = {username: this.username};
    this.authService.login(this.username, this.password)
        .subscribe(data=>this.handleResponse(data));
    this.loggedService.setLogged(this.logged);

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
