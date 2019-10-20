import { ToastrService } from 'ngx-toastr';
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
  constructor(public authService: AuthService, private router: Router, private toastr: ToastrService) {

  }
  private authListenerSubs: Subscription;
  status = this.authService.isLoggedIn();
  private userInfoSenderSubs: Subscription;
  jwtToken = this.authService.getJwtToken();
  decoded = this.authService.getUserInfo();
  userInfo: string;
  obj;
  userID;

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
        console.log(this.obj);
        this.userInfo = this.obj.userId;
        sessionStorage.setItem('userID', this.obj.userId);
        this.userID = this.obj.userId;
      });

  }

  onShowList() {
    this.userID = sessionStorage.getItem('userID');
    this.router.navigate(['/profile/show-list'], { queryParams: { id: this.userID } });
  }
  onPostAuction() {
    this.userID = sessionStorage.getItem('userID');
    this.router.navigate(['/actions/upload'], { queryParams: { id: this.userID } });
  }

  onShowStats() {
    this.userID = sessionStorage.getItem('userID');
    this.router.navigate(['/profile/show-stats'], { queryParams: { id: this.userID } });
  }

  onLogout() {
    this.userIsAuthenticated = false;
    window.sessionStorage.clear();
    this.status = false;
    this.toastr.warning('Logged Out', 'Success!');
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.userInfoSenderSubs.unsubscribe();
  }





}
