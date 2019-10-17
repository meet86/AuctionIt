import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  constructor(public authService: AuthService, private router: Router) { }
  private authListenerSubs: Subscription;
  status = this.authService.isLoggedIn();
  private userInfoSenderSubs: Subscription;
  jwtToken = this.authService.getJwtToken();
  decoded = this.authService.getUserInfo();
  userInfo: string;
  obj;
  // userEmail = this.obj1.email;

  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.userInfoSenderSubs = this.authService.getUserInfoSender()
      .subscribe(data => {
        this.userInfo = data;
        this.obj = JSON.parse(this.userInfo);
      });
  }
  onLogout() {
    this.userIsAuthenticated = false;
    window.sessionStorage.clear();
    this.status = false;
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.userInfoSenderSubs.unsubscribe();
  }





}
