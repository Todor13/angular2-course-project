import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthGuard } from '../common/auth.guard'
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges{
  isIn = false;
  username: string;

  constructor(private authGuard: AuthGuard, private authService: AuthenticationService){

  }

  ngOnInit(){
    if (this.isLogged()){
      this.getCurrentUser();
    }
  }

  ngOnChanges(){
    if (this.isLogged()){
      this.getCurrentUser();
    }
  }

  toggleState() {
    let bool = this.isIn;
    this.isIn = bool === false ? true : false;
  }

  isLogged(): boolean{
    return this.authGuard.canActivate();
  }

  logOut(){
    this.authService.logout();
  }

  getCurrentUser(){
    var json;

    if (localStorage.getItem('currentUser')){
      json = JSON.parse(localStorage.getItem('currentUser'));
      this.username = json.username;
    }

  }
}
