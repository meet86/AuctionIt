import { NotifierService } from 'angular-notifier';
import { PostAuctionModel } from './post-auction.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuctionEditModel } from '../profile/myauction-list/auction-edit.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PostauctionService {
  private PostdataSubject = new Subject<PostAuctionModel[]>();
  postData1: PostAuctionModel[] = [];
  private dataSub = new Subject<any>();
  constructor(private http: HttpClient, private router: Router, private notifier: NotifierService, private toastr: ToastrService) { }

  PostdataSubjectListener() {
    return this.PostdataSubject.asObservable();
  }

  dataSubListener() {
    return this.dataSub.asObservable();
  }

  addAuction(initialBid: string,
    // tslint:disable-next-line: align
    productType: string, desc: string, productName: string, image: File, param1: string, currentUser: string) {
    const postData = new FormData();
    // postData.append('first', first);
    // postData.append('last', last);
    postData.append('initialBid', initialBid);
    // postData.append('phone', phone);
    // postData.append('email', email);
    postData.append('productType', productType);
    postData.append('desc', desc);
    postData.append('productName', productName);
    postData.append('image', image, productName);
    // postData.append('dueDate', dueDate);
    this.http.post('http://localhost:3000/api/post/upload/' + param1, postData)
      .subscribe((responsedData: any) => {
        console.log(responsedData);
        if (responsedData.status) {
          this.toastr.success('Auction added successfully.', 'Success', { progressBar: true });
          this.router.navigate(['/home']);
        } else {
          this.toastr.error('Something is fishy, Please check your entered details and fill up again', 'OH FISH!');
        }
      });
  }

  getAuction(currentUser?: string) {
    this.http.get('http://localhost:3000/api/post/' + currentUser)
      .subscribe((postData: any) => {
        console.log(postData);

        this.PostdataSubject.next(postData.docs);
      });
  }

  onEditAuction(initialBid: number, productType: string, desc: string, id: string) {
    const editModel: AuctionEditModel = { initialBid, productType, desc };
    if (!initialBid || !productType || !desc) {
      this.toastr.error('Required Validation', 'All fields are required..!');
      return;
    }
    this.http.put('http://localhost:3000/api/post/edit/' + id, editModel)
      .subscribe((data: any) => {
        console.log(data);
        if (data.status) {
          this.toastr.success('Edited SuccessFully', 'Success!', { progressBar: true });
          this.router.navigate(['/home']);
        }
      });
  }
  OnDeleteAuction(id: string) {
    this.http.delete('http://localhost:3000/api/post/delete/' + id)
      .subscribe((data: any) => {
        console.log(data);
        if (data.status) {
          this.toastr.success('Deleted Successfully.', 'Success', { progressBar: true });
          this.router.navigate(['/home']);
        }
      });
  }
  getAllAuction() {
    this.http.get('http://localhost:3000/api/post/getall')
      .subscribe((res: any) => {
        this.dataSub.next(res);
      });
  }
}
