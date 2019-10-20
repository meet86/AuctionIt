import { ToastrService } from 'ngx-toastr';
import { BidModel } from './product-detail/bid.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productSubject = new Subject<any>();
  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }
  private responsedData;
  status: boolean;
  getProductSubject() {
    return this.productSubject.asObservable();
  }

  getProductDetails(currentProduct: string) {
    this.http.get('http://localhost:3000/api/product/detail/' + currentProduct)
      .subscribe((data: any) => {
        console.log(data.docs);
        this.productSubject.next(data.docs);
      });
  }
  onBidPlaced(productid: string, userid: string, bid: string) {
    const postData: BidModel = { productid, userid, bid };
    this.http.post('http://localhost:3000/api/product/post/' + productid + '/' + sessionStorage.getItem('loggedemail'), postData)
      .subscribe((data: any) => {
        if (data.docs) {
          this.toastr.success('Your Bid has been placed', 'Success!');
          console.log(data);
        } else {
          this.toastr.error('Maybe Auction are not available right now', 'Please try again later');
        }
      });
    this.router.navigate(['/home']);
  }



}
