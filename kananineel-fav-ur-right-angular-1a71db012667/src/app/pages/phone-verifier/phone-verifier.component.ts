import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { WindowService } from 'src/app/utils/window.service';
import { ApiService } from 'src/app/utils/api.service';
import { Router } from '@angular/router';
import {CommonURL} from '../../utils/common';
@Component({
  selector: 'app-phone-verifier',
  templateUrl: './phone-verifier.component.html',
  styleUrls: ['./phone-verifier.component.scss']
})
export class PhoneVerifierComponent implements OnInit {


  windowRef: any;

  phoneNumber = new PhoneNumber()

  verificationCode: string;
  showVerification:boolean = true;
  is_otp_incorrect:boolean = false ;
  OTP_TRY:number = 0;
   firebaseConfig = {
    apiKey: "FIREBASE_APIKEY_HERE",
    authDomain: "FIREBASE_AUTH_DOMAIN",
    databaseURL: "DATABASE_URL_HERE",
    projectId: "favouright-9a938",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "ID_HERE",
    appId: "APP_ID_HERE",
    measurementId: "G-ID_HERE"
  };



  constructor(private win: WindowService,private apiSrv:ApiService,private router:Router) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef
    firebase.initializeApp(this.firebaseConfig);
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.recaptchaVerifier.render()
  }


  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.get_e164();


    firebase.auth().signInWithPhoneNumber(num, appVerifier)
            .then(result => {

                this.windowRef.confirmationResult = result;
                this.showVerification = false;
            })
            .catch( error => console.log(error) );
  }

  verifyLoginCode() {
    this.OTP_TRY++;
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {
                    // console.log("result ",result.user.uid);
                    let uid = result.user.uid ;
                    this.apiSrv.http_post(CommonURL.URL_USER_LOGIN,{uid:uid}).subscribe(success=>{
                      let token = success.token;
                        let role = success.payload.role;
                        if (token) {
                          localStorage.setItem('rl', role);
                          localStorage.setItem('token', token);
                          this.router.navigate(['main']);
                        }
                    },error=>{
                      // show errpr here
                      if(this.OTP_TRY >2){
                        this.showVerification = true;
                      }
                      this.is_otp_incorrect = true;
                    })
    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }


}


class PhoneNumber {
  country: string;
  number: string;

  // format phone numbers as E.164
  get_e164() {
    // const num = this.country + this.number ;
    const num = "91" + this.number ;
    return `+${num}`
  }

}
