import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostauctionService {
  constructor(private http: HttpClient) { }

  addAuction(first: string, last: string, initialBid: string, phone: string,
    // tslint:disable-next-line: align
    email: string, productType: string, desc: string, productName: string, image: File) {
    const postData = new FormData();
    postData.append('first', first);
    postData.append('last', last);
    postData.append('initialBid', initialBid);
    postData.append('phone', phone);
    postData.append('email', email);
    postData.append('productType', productType);
    postData.append('desc', desc);
    postData.append('productName', productName);
    postData.append('image', image, productName);

    this.http.post('http://localhost:3000/api/post/upload', postData)
      .subscribe(responsedData => {
        console.log(responsedData);
      });


  }
}
