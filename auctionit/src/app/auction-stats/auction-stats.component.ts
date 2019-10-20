import { ProfileStatsService } from './../profile-stats.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostauctionService } from '../post-auction/postauction.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-auction-stats',
  templateUrl: './auction-stats.component.html',
  styleUrls: ['./auction-stats.component.css']
})
export class AuctionStatsComponent implements OnInit {
  private postDataSub: Subscription;
  private maxSub: Subscription;
  param1: string;
  postAuctionData: any;
  maxData: any;
  public temp = [];
  obj;
  constructor(private profileStatsService: ProfileStatsService, private route: ActivatedRoute, public toastrr: ToastrModule) { }

  ngOnInit() {
    this.param1 = this.route.snapshot.queryParamMap.get('id');
    this.profileStatsService.getStats(this.param1);
    this.postDataSub = this.profileStatsService.getDataSubject().subscribe((data) => {
      console.log(data);
      this.postAuctionData = data;
      console.log(this.postAuctionData.extra);
    });
    this.maxSub = this.profileStatsService.getMaxSubject().subscribe((data: any) => {
      this.maxData = data;
    });
    // setTimeout(() => {
    //   this.obj = this.postAuctionData;
    //   // console.log('ABC: ' + JSON.stringify(this.obj));
    //   // for (let index = 0; index < this.obj.length; index++) {
    //   //   this.temp.push(this.obj.extra[index]);
    //   // }
    //   // console.log('TEMp: ' + this.obj.bids);
    // }, 5000);
  }


  onEndAuction(prodid) {
    console.log('From ENd Auction ' + prodid)
  }
  onFindMax(prodid) {
    console.log(prodid);
    this.profileStatsService.findMax(prodid);
  }
}
