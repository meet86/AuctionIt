import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileStatsService {
  private dataSubject = new Subject<any>();
  private maxSubject = new Subject<any>();
  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  getDataSubject() {
    return this.dataSubject.asObservable();
  }
  getMaxSubject() {
    return this.maxSubject.asObservable();
  }
  getStats(currentUser: string) {
    this.http.get('http://localhost:3000/api/stats/list/' + currentUser)
      .subscribe((data: any) => {
        console.log(data);
        console.log('Hi', data.docs);
        this.dataSubject.next(data.docs);
      });
  }

  endAuction(prodId: string) {
    this.http.delete('http://localhost:3000/api/stats/endauction/' + prodId + '/' + sessionStorage.getItem('userID'))
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  findMax(prodId: string) {
    this.http.get('http://localhost:3000/api/stats/sort/' + prodId).
      subscribe((data: any) => {
        this.maxSubject.next(data.max);
        console.log('sort data from service: ' + data.max[0]);
      });
  }
}
