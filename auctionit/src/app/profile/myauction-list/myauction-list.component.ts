import { ToastrModule } from 'ngx-toastr';
import { NotifierService } from 'angular-notifier';
import { PostAuctionModel } from './../../post-auction/post-auction.model';
import { Subscription } from 'rxjs';
import { PostauctionService } from './../../post-auction/postauction.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-myauction-list',
  templateUrl: './myauction-list.component.html',
  styleUrls: ['./myauction-list.component.css']
})
export class MyauctionListComponent implements OnInit {
  private postDataSub: Subscription;
  param1: string;
  postAuctionData: any;
  public temp: any = [];
  constructor(private postAuctionService: PostauctionService, private route: ActivatedRoute, public toastrr: ToastrModule) { }
  err: string;
  err1: string;

  ngOnInit() {
    this.postDataSub = this.postAuctionService.PostdataSubjectListener()
      .subscribe((responsedData) => {
        this.postAuctionData = responsedData;
        console.log(this.postAuctionData);
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < this.postAuctionData.length; index++) {
          this.temp.push(this.postAuctionData[index]);

        }
      });
    this.param1 = this.route.snapshot.queryParamMap.get('id');
    this.postAuctionService.getAuction(this.param1);


  }

  onSubmit(form: NgForm, id: string) {
    // console.log(form);
    // console.log('ID From FORm: ' + id);
    if (form.value.initialBid === 0) {
      this.err1 = 'Bid can\'t be 0';
    }
    if (form.invalid) {
      this.err = 'Entered form data is invalid';
      console.log('invalid');
    }
    this.postAuctionService.onEditAuction(form.value.initialBid, form.value.productType, form.value.desc, id);
  }

  onAuctionDelete(id: string) {
    this.postAuctionService.OnDeleteAuction(id);
  }

}
