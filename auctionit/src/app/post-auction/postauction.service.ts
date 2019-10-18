import { NotifierService } from 'angular-notifier';
import { PostAuctionModel } from './post-auction.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuctionEditModel } from '../profile/myauction-list/auction-edit.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class PostauctionService {
  private PostdataSubject = new Subject<PostAuctionModel[]>();
  postData1: PostAuctionModel[] = [];

  constructor(private http: HttpClient, private router: Router, private notifier: NotifierService, private toastr: ToastrService) { }

  PostdataSubjectListener() {
    return this.PostdataSubject.asObservable();
  }

  addAuction(initialBid: string,
    // tslint:disable-next-line: align
    productType: string, desc: string, productName: string, image: File, param1: string) {
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

    this.http.post('http://localhost:3000/api/post/upload/' + param1, postData)
      .subscribe(responsedData => {
        console.log(responsedData);
      });
  }

  getAuction(currentUser: string) {
    this.http.get('http://localhost:3000/api/post/' + currentUser)
      .subscribe((postData: any) => {
        console.log(postData);

        this.PostdataSubject.next(postData.docs);
      });
  }

  onEditAuction(initialBid: number, productType: string, desc: string, id: string) {
    const editModel: AuctionEditModel = { initialBid, productType, desc };
    this.http.put('http://localhost:3000/api/post/edit/' + id, editModel)
      .subscribe((data: any) => {
        console.log(data);
        if (data.status) {
          this.toastr.success('Edited SuccessFully', 'Success!', { progressBar: true });
          this.router.navigate(['/home']);
        }
      });
  }
}
