import { ActivatedRoute } from '@angular/router';
import { mimeType } from './mime-validator';
import { NotifierService } from 'angular-notifier';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostauctionService } from './postauction.service';

@Component({
  selector: 'app-post-auction',
  templateUrl: './post-auction.component.html',
  styleUrls: ['./post-auction.component.css']
})
export class PostAuctionComponent implements OnInit {
  form: FormGroup;
  imagePreview: any;
  errmsg: string;
  param1: string;
  currentUser: string;
  constructor(public notifer: NotifierService, public postauctionService: PostauctionService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      initialBid: new FormControl(null, {
        validators: [Validators.required, Validators.min(1)], updateOn: 'blur'
      }),
      productType: new FormControl(null, {
        validators: [Validators.required], updateOn: 'blur'
      }),
      productName: new FormControl(null, {
        validators: [Validators.required], updateOn: 'blur'
      }),
      desc: new FormControl(null, {
        validators: [Validators.required], updateOn: 'blur'
      }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] }),
    });
    this.currentUser = sessionStorage.getItem('loggedemail');
  }

  onPostAuction() {

    const initialBid = this.form.value.initialBid;

    const productType = this.form.value.productType;
    const desc = this.form.value.desc;
    const productName = this.form.value.productName;
    const param = this.route.snapshot.queryParamMap.get('id');
    if (this.form.invalid) {
      this.notifer.notify('error', 'Entered form data isn\'t valid, Please Try again.');
      // this.form.reset();
      this.errmsg = 'Entered form data isn\'t valid, Please Try again.';
      return;
    }
    this.postauctionService.addAuction(initialBid, productType, desc, productName,
      this.form.value.image, param, this.currentUser);

    console.log(productName + ', ' + + ',' + + ',' + initialBid + ',' + + ',' + + ',' + productType + ',' + desc);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
    console.log(file);
  }

}
