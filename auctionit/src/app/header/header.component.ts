import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  constructor(public authService: AuthService, private router: Router) { }
  private authListenerSubs: Subscription;
  userEmail: string;
  status: boolean;
  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.status = this.authService.isLoggedIn();
    this.userEmail = window.sessionStorage.getItem('loggedemail');
  }

  onLogout() {
    this.userIsAuthenticated = false;
    window.sessionStorage.clear();
    this.status = false;
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
