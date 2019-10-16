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
  private userEmail = window.sessionStorage.getItem('loggedemail');
  private status;
  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.status = this.authService.isLoggedIn();
  }

  onLogout() {
    this.userIsAuthenticated = false;
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('loggedemail');
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
