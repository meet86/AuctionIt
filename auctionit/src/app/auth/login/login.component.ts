import { AuthService } from './../../auth.service';
import { NotifierService } from 'angular-notifier';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public notifier: NotifierService, public authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    console.log(email + ' ' + password);
    if (form.invalid) {
      this.notifier.notify('error', 'All fields are required.');
      return;
    }
    this.authService.loginUser(email, password);
  }
}
