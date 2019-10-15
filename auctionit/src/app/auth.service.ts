import { NotifierService } from 'angular-notifier';
import { RegisterModel } from './auth/register/register.model';
import { Injectable, forwardRef, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient, private router: Router, private notifier: NotifierService) { }


  createUser(fullname: string, email: string, password: string, contact: number, address: string) {
    const regModel: RegisterModel = { fullname, email, password, contact, address };
    this.http.post('http://localhost:3000/api/user/signup', regModel)
      .subscribe((response: any) => {
        if (response.isSucceed) {
          this.notifier.notify('success', 'Registered Successfully, Redirecting to home page in 4 secs..', 'RGTRSUCC');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        }

        console.log(response);
      },
        (error: any) => {
          if (!error.isSucceed) {
            this.notifier.notify('error', 'Status:500');
            this.notifier.notify('error', 'Something went wrong, entered data isn\'t corrent as it supposed to be.!');
          }
        });
  }
}
