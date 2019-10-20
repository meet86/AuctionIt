import { Subscription } from 'rxjs';
import { PostauctionService } from './../post-auction/postauction.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private postSub: Subscription;
  private responsedData: any;
  private temp = [];
  private jsoned;
  private obj;
  constructor(private postAuctionService: PostauctionService, private router: Router) { }
  ngOnInit() {
    this.postAuctionService.getAllAuction();
    this.postSub = this.postAuctionService.dataSubListener()
      .subscribe((data) => {
        this.responsedData = data.docs;
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < this.responsedData.length; index++) {
          this.temp.push(this.responsedData[index]);

        }


        // console.log('from ngOninit home: ' + JSON.stringify(this.responsedData));

      });
    // tslint:disable-next-line: prefer-for-of
    // for (let index = 0; index < this.responsedData.length; index++) {
    //   this.temp.push(this.responsedData[index]);

    // }
  }
  ngOnDestroy() {
    // this.postSub.unsubscribe();
  }

  onImgClick(productid: string) {
    console.log('IMGCLICK: ' + productid);
    this.router.navigate(['/product/product-detail'], { queryParams: { id: productid } });

  }
}
