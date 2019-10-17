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
  constructor(public notifer: NotifierService, public postauctionService: PostauctionService) { }

  ngOnInit() {
    this.form = new FormGroup({
      first: new FormControl(null, {
        validators: [Validators.required], updateOn: 'blur'
      }),
      last: new FormControl(null, {
        validators: [Validators.required], updateOn: 'blur'
      }),
      initialBid: new FormControl(null, {
        validators: [Validators.required, Validators.min(1)], updateOn: 'blur'
      }),
      phone: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(10)], updateOn: 'blur'
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email], updateOn: 'blur'
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
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
  }

  onPostAuction() {
    const first = this.form.value.first;
    const last = this.form.value.last;
    const initialBid = this.form.value.initialBid;
    const phone = this.form.value.phone;
    const email = this.form.value.email;
    const productType = this.form.value.productType;
    const desc = this.form.value.desc;
    const productName = this.form.value.productName;

    if (this.form.invalid) {
      this.notifer.notify('error', 'Entered form data isn\'t valid, Please Try again.');
      // this.form.reset();
      this.errmsg = 'Entered form data isn\'t valid, Please Try again.';
      return;
    }
    this.postauctionService.addAuction(first, last, initialBid, phone, email, productType, desc, productName, this.form.value.image);

    console.log(productName + ', ' + first + ',' + last + ',' + initialBid + ',' + phone + ',' + email + ',' + productType + ',' + desc);
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
