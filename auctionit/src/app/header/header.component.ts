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
  constructor(public authService: AuthService, private router: Router) {
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.userInfoSenderSubs = this.authService.getUserInfoSender()
      .subscribe(data => {
        this.userInfo = data;
        this.obj = JSON.parse(this.userInfo);
        console.log(this.obj);
        this.userInfo = this.obj.userId;
      });
  }
  private authListenerSubs: Subscription;
  status = this.authService.isLoggedIn();
  private userInfoSenderSubs: Subscription;
  jwtToken = this.authService.getJwtToken();
  decoded = this.authService.getUserInfo();
  userInfo: string;
  obj;
  id: string;
  // userEmail = this.obj1.email;

  ngOnInit() {



  }

  onShowList() {

    this.router.navigate(['/profile/show-list'], { queryParams: { id: this.obj.userId } });
  }
  onPostAuction() {
    this.router.navigate(['/actions/upload'], { queryParams: { id: this.obj.userId } });
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
