import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/utils/api.service';
import { UtilService } from 'src/app/utils/utilityService.service';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Location } from '@angular/common';

import {CommonURL} from '../../utils/common'
declare var Razorpay: any; 
@Component({
  selector: 'app-buy-gift-card',
  templateUrl: './buy-gift-card.component.html',
  styleUrls: ['./buy-gift-card.component.scss']
})
export class BuyGiftCardComponent implements OnInit {
  id;
  customCard = '';
  outletDetail;
  payment_creation_id=null;

  obj = {
    reciepient_name: '',
    reciepient_email: '',
    your_name: '',
    your_email: '',
    radioValue: 500,
    couponCount: 1,
    radioValueCustom: ''
  };

  static API_SERVICE:ApiService ;
  
  razorPayOptions = {
    "key": '', // Enter the Key ID generated from the Dashboard
    "amount": '', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
    "currency": "INR",
    "name": "Favouright",
    "description": "favouright bill payment",
    "order_id":"ORDERID_FROM_BACKEND",
    "image": "https://example.com/your_logo",
    "handler": function (response) {
      console.log("this is the response ",response);
    },
    "notes": {
        "address": "Thank you for saving people in need"
    },
    "theme": {
        "color": "#8bf7a8"
    },
    http_post:this.apiService
};

  discounted_value;

  @ViewChild('success') success: TemplateRef<any>;

  constructor(private route: ActivatedRoute,
    private apiService: ApiService,
    private util: UtilService,
    private router: Router,
    private location: Location,
    private dialog: MatDialog) {
    this.id = this.route.snapshot.paramMap.get('id');
    BuyGiftCardComponent.API_SERVICE = this.apiService ;
   }


  ngOnInit(): void {
    this.getOutletDetail();
  }

  getOutletDetail() {
    this.apiService.http_get('business/get/single/' + this.id)
    .subscribe((response) => {
      this.outletDetail = response.payload;
      console.log("response", response);
      console.log("response", this.outletDetail);
    }, (error) => {
      console.log("error", error);
    });
  }


  Procedure(event) {
    // this.obj.radioValue = ( this.obj.radioValue - ((this.obj.radioValue/100)*10) )
    // if(this.obj.radioValueCustom != ''){
    //  let radioCustom =  +this.obj.radioValueCustom;
    //  this.obj.radioValue = ( radioCustom- ((radioCustom/100)*10) )
    // }
    // console.log("this.obj", this.obj);
    // console.log("outlet detail",this.outletDetail);

    let finalObject = {
      "user_id":"5e7a6fcd3cd6e61c5059ca62",
      "business_id":this.outletDetail._id,
      "amount": Number(this.obj.radioValue),
      "recipient_name":this.obj.reciepient_name,
      "recipient_email":this.obj.reciepient_email,
      "user_email":this.obj.your_email,
      "user_name":this.obj.your_name
    }
    console.log("this is the final object ",finalObject);


    this.apiService.http_post(CommonURL.URL_PURCHASE_GIFT_CARD,finalObject)
    .subscribe((response) => {
      console.log("response for purchase ",response);
      let payload = response.payload;
      if (payload["key"] && payload["dbRes"]["order"]["id"] && payload["dbRes"]["order"]["amount"]) {
        this.razorPayOptions.key = payload["key"];
        this.razorPayOptions.order_id = payload["dbRes"]["order"]["id"];
        this.razorPayOptions.amount =  payload["dbRes"]["order"]["amount"];
        this.razorPayOptions.handler =  this.razorPayResponseHandler;
        this.payment_creation_id = payload["dbRes"]["_id"];
        finalObject["_id"] =payload["dbRes"]["_id"]
        sessionStorage.setItem("temp",JSON.stringify(finalObject))

        console.log("op",this.razorPayOptions)
  
      var rzp1 = new Razorpay(this.razorPayOptions);
      rzp1.open();
      console.log("opened")
      } else {
        // bro show error here
      }
    }, (error) => {
      console.log("error", error);
    });

  
  }

 call(event: MatRadioChange){
  console.log("this", event.value);
  let result = +event.value
  this.discounted_value = ( result - ((result/100)*this.outletDetail.discount))
  if(this.obj.radioValueCustom != ''){
    console.log("this", event);
    console.log("in")
  }
  console.log("this", this.discounted_value);
 }

 apply(event: any) {
  let result = event.target.value;
  this.discounted_value = ( result - ((result/100)*this.outletDetail.discount))
 }




 razorPayResponseHandler(response){
  //  console.log("final response",response);
  let storage_data =sessionStorage.getItem('temp') 
  let sess =  JSON.parse(storage_data);
  console.log("storage ",sess)
  let paymentObject= {
    _id:sess._id,
    payment:response,
    user_name:sess.user_email,
    amount: sess.amount,
    recipient_email:sess.recipient_email,
    user_email:sess.user_name,
  }
  console.log("payment object ",paymentObject)
  BuyGiftCardComponent.API_SERVICE.http_put(CommonURL.URL_PURCHASE_GIFT_CARD_SUCCESS,paymentObject).subscribe(success=>{
    console.log("success");
    alert("payment success send to success page");
    sessionStorage.removeItem('temp');
   },error=>{
    BuyGiftCardComponent.API_SERVICE.http_delete(CommonURL.URL_PURCHASE_GIFT_CARD_ERROR,{_id:paymentObject._id}).subscribe(success_delete=>{
      console.log("error in payment payment suucessfull deleted from db");
      
    },error=>{
      console.log("error",error)
    })
    console.log("error",error)
   })
 }

}
