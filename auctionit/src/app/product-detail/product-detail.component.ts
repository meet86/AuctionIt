import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductService } from './../product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  param1: string;
  public productSub: Subscription;
  public responsedData: any;
  constructor(private router: ActivatedRoute, private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit() {
    this.param1 = this.router.snapshot.queryParamMap.get('id');
    this.productService.getProductDetails(this.param1);
    this.productSub = this.productService.getProductSubject().subscribe((data) => {
      setTimeout(() => {
        this.responsedData = data;
        console.log(this.responsedData);
      }, 50);
    });

  }

  onBidPlace(form: NgForm) {
    const uid = window.sessionStorage.getItem('userID');
    const today = new Date();
    const date: Date = this.responsedData.dueDate;

    if (window.sessionStorage.getItem('userID') === this.responsedData._creator) {
      this.toastr.error('You can\'t place bid on your own auction');
      return;
    }

    if (form.value.newbid < this.responsedData.initialBid) {
      this.toastr.error('New Bid should be > initialBid', 'Error', { progressBar: true });
      return;
    }

    if (form.invalid) {
      this.toastr.error('Error', 'Entered data is not valid');
      return;

    }

    this.productService.onBidPlaced(this.param1, uid, form.value.newbid);
  }

}
