import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/utils/api.service';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-help-donating',
  templateUrl: './help-donating.component.html',
  styleUrls: ['./help-donating.component.scss']
})
export class HelpDonatingComponent implements OnInit {

  id;
  customCard = '₹500-₹10000';
  customDonation = 'Any Other Amount';
  outletDetail;
  discounted_value;

  constructor(private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
   }

  obj = {
    receipient_name: '',
    receipient_email: '',
    your_name: '',
    your_email: '',
    radioValue: 500,
    couponCount: 1,
    radioValueCustom: ''
  }

   resObj = {
    id : 1,
    img : '../../../assets/img/images/3.jpg',
    name : 'Filament Bar'
   };

  ngOnInit(): void {
    this.getOutletDetail();
  }

  getOutletDetail(){
    this.apiService.http_get('business/get/single/'+this.id)
    .subscribe((response) => {
      this.outletDetail = response.payload;
      console.log("response", response);
      console.log("response", this.outletDetail);
    }, (error) => {
      console.log("error", error);
    })
  }

  Procedure() {
    this.obj.radioValue = ( this.obj.radioValue - ((this.obj.radioValue/100)*10) )
    if(this.obj.radioValueCustom != ''){
     let radioCustom =  +this.obj.radioValueCustom;
     this.obj.radioValue = ( radioCustom- ((radioCustom/100)*10) )
    //  console.log("acx", abc)
    }
    return console.log("this.obj", this.obj);
    this.router.navigate(['checkout']);
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
}
