import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public authService: AuthService, public notifier: NotifierService) { }
  err: any;
  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const password = form.value.password;
    const cpassword = form.value.cpassword;
    const fullname = form.value.fullname;
    const address = form.value.address;
    const contact = form.value.contact;
    const email = form.value.email;


    // if (fullname == null || address == null || contact == null || email == null || password == null) {
    //   this.required = true;
    // }
    if (form.invalid) {
      this.err = 'All Fields are required.!';
      this.notifier.notify('error', 'All Fields are required');
      return;
    }
    if (password !== cpassword) {
      this.notifier.notify('error', 'Password Didn\'t matched..!', 'Error:PASSWDNTMATCHED');
      return;
    }
    // console.log(form.value.fullname + ',' + form.value.useremail + ',' + form.value.password + ',' + form.value.cpassword
    //   + ',' + form.value.address + ',' + form.value.contact);
    this.authService.createUser(fullname, email, password, contact, address);
  }

}
