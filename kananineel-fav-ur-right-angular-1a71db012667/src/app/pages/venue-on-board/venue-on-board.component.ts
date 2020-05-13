import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { UtilService } from 'src/app/utils/utilityService.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { ApiService } from 'src/app/utils/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { RequestOptions, Headers } from '@angular/http';
import { CommonUIStrings } from './../../utils/commonUIStrings';
import { CommonURL } from 'src/app/utils/common';
import { Addvenue } from 'src/app/commons/classes/addvenue';

@Component({
  selector: 'app-venue-on-board',
  templateUrl: './venue-on-board.component.html',
  styleUrls: ['./venue-on-board.component.scss']
})
export class VenueOnBoardComponent implements OnInit {

  obj = {
    venuewName: '',
    adminname: '',
    adminEmail: '',
    address: '',
    state: '',
    city: '',
    bandDetails: '',
    Latitude: '',
    Longitude: '',
    contactNumber: '',
    zomatoId: '',
    giftEnabled: 0,
    donationEnabled: 1,
    isEnabled: 0,
    accountholder: '',
    gst: '',
    ifsc: '',
    accountNumber: '',
    country: '',
    pincode: '',
    area: '',
    discount: '',
    commission: '',
    logo: ''
  }

  formData = new FormData();

  @ViewChild('success') success: TemplateRef<any>;
  @ViewChild('failure') failure: TemplateRef<any>;

  constructor(private http: HttpClient,
    private apiSrv: ApiService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  attachFiles(ev){
    console.log("event", ev.target.files[0])
    let image  = ev.target.files[0]
    let imageFileReader = new FileReader();
    // console.log("this is the image",image);
    
    if (image) {
      imageFileReader.readAsDataURL(image);
      imageFileReader.onload = () => {
        this.formData.append('logo', image);
      }

  }
}

  Addvenue(){
    // return console.log("console.log", this.obj)
    let headers = new Headers({ 'Authorization' : "abcdef" });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let paramobj = {
      business_category : "food",
      business_name: this.obj.venuewName,
      description : "HIIII",
      contact_name : this.obj.adminname,
      contact_email : this.obj.adminEmail,
      contact_number : this.obj.contactNumber,
      gift_enabled : this.obj.giftEnabled,
      donation_enabled : this.obj.donationEnabled,
      discount: this.obj.discount,
      commision: this.obj.commission,
      bank_details : {
        legal_entity_name: this.obj.accountholder,
        account_number : this.obj.accountNumber,
        gst_number: this.obj.gst,
        ifsc_number: this.obj.ifsc
      },
      address : {
        address: this.obj.address,
        city : this.obj.city,
        state: this.obj.state,
        country: this.obj.country,
        pincode: this.obj.pincode,
        lat: this.obj.Latitude,
        long: this.obj. Longitude,
        area: this.obj.area
      },
      is_enabled : this.obj.isEnabled,
    }

    // let form = Addvenue.create(paramobj);
    for (const key of Object.keys(paramobj)) {
       let value = typeof paramobj[key] == 'object'?JSON.stringify(paramobj[key]):paramobj[key]
          this.formData.append(key,value)
    }

    let form = this.formData;

    this.apiSrv.http_post('business/add', form).subscribe(
      success => {
        this.dialog.open(this.success);
        console.log('saved success fully', success);
        this.formData = new FormData();
      }, error => {
        this.dialog.open(this.failure, {width: '200px'});
        console.log('error saving data', error);
        this.formData = new FormData();
      }
    );

    // this.util.callPostApi("http://localhost:3000/v1/"+"business/add", paramobj)
    // .subscribe((res) => {
    //   console.log("res", res)
    // }, (err) => {
    //   console.log("err", err)
    // })
    // console.log("inside", this.obj)
  }

  // isValidFile;
  // attachFile(ev){
  //   if (ev.target.files && ev.target.files[0] && this.validateFileType(ev.target.files[0].type)) {
  //     // this.isValid = true;
  //     // this.isError = false;
  //     // this.imagevalidcheck = false;
  //     var reader = new FileReader();
  //     reader.readAsDataURL(ev.target.files[0]);
  //     var file_type = ev.target.files[0].type.split('/');
  //     this.type = file_type[0].toUpperCase();
  //     // var mediasize,file,videon;
  //     /*********************************
  //      Checking Horizontal Or Vertical Media.
  //      ***************************************** */

  //       this.Media_details.h_media = ev.target.files[0];
  //       this.Media_details.h_extension = this.Media_details.h_media.type;
  //       this.Media_details.h_type = file_type[0].toUpperCase();
  //       mediasize = this.Media_details.h_media.size;
  //       file = document.getElementById('hfile');
  //       videon = 'videoh'


  //     /*****************************************************
  //      Checking Media Type Image OR Video
  //      * ******************************************************* */
  //     if(this.type == 'IMAGE') {
  //       if(stype == 'h')
  //         this.hmaxval = 30;
  //       else
  //         this.vmaxval = 30;
  //         if(mediasize > 5242880)
  //         {
  //           $('#__'+videon).html("");
  //           file.value = '';
  //           this.isError = true;
  //           this.imagevalidcheck = true;
  //           this.uploaderrmsg = "File size is too large <br/> Image should be less than 5 MB";
  //           this.sharedService.updateIsRequestOn(false);
  //         }
  //         else
  //         {
  //           reader.onload  = (e:any)  => {
  //             $('#__'+videon).html("<img style='max-width: 100%; max-height: 100%' src=" + reader.result + " />");
  //             this.sharedService.updateIsRequestOn(false);
  //           };
  //         }
  //     }
  //     if(this.type == 'VIDEO') {
  //       let file_ext;
  //       if(stype == 'h')
  //         file_ext = this.Media_details.h_extension;
  //       else
  //         file_ext = this.Media_details.v_extension;

  //       let instance:any = this;
  //       this.sharedService.updateIsRequestOn(true);
  //       /*** *
  //        * Setting Media Size Which cannot be more than 150Mb
  //        * 209715200 - size for 200mb file size
  //         */
  //       if(mediasize > 157286400)
  //       {
  //             $('#__'+videon).html("");
  //             file.value = '';
  //             this.isError = true;
  //             this.imagevalidcheck = true;
  //             this.uploaderrmsg = "File size is too large <br/> Video should be less than 150 MB";
  //             if(stype == 'h')
  //               this.Media_details.h_type = ''
  //             else
  //               this.Media_details.v_type = ''
  //             this.sharedService.updateIsRequestOn(false);
  //       }
  //       else
  //       {
  //         reader.onload = (e) => {
  //           if(stype == 'h')
  //             this.hmaxval = 6000000000;
  //           else
  //             this.vmaxval = 6000000000;
  //           $('#__'+videon).html("<video id='"+videon+"' controls style='max-width: 100%; max-height: 100%'><source src=" + reader.result + " type=" + file_ext +" ></video>");
  //           setTimeout(() => {
  //             let videoTag:any;
  //             if(stype == 'h')
  //               videoTag = document.getElementById("videoh");
  //             else
  //               videoTag = document.getElementById("videov");

  //             var video = $('#'+videon);

  //             console.log('videoTag: ', videoTag);
  //             console.log("document.getElementsByTagName: ", videoTag.duration);
  //             if(!((video[0].videoWidth <= 1080 && video[0].videoHeight <= 1920) || (video[0].videoWidth <= 1920 && video[0].videoHeight <= 1080)))
  //             {
  //                   if(stype == 'h')
  //                     this.Media_details.h_type = ''
  //                   else
  //                     this.Media_details.v_type = ''
  //                   $('#__'+videon).html("");
  //                   file.value = '';
  //                   this.isError = true;
  //                   this.imagevalidcheck = true;
  //                   this.uploaderrmsg = "<b>Please check your video dimentions</b><br/>Allowed Maximum height: 1920 px or 1080 px<br/>Allowed Maximum width: 1080 px or 1920 px";
  //             }
  //             let duration:number = parseInt(videoTag.duration.toString());
  //             // window.setInterval(function(t){
  //             //   if(videoTag.readyState > 0 ){
  //             //     let duration = videoTag.duration;
  //             //      console.log(duration,"new");
  //             //     clearInterval(t);
  //             //   }
  //             // },1000)
  //             console.log("duration of video", duration);
  //             if(stype == 'h')
  //               this.Media_details.h_duration = duration;
  //             else
  //               this.Media_details.v_duration = duration;

  //             if(duration > 600000000000)
  //             {
  //               if(stype == 'h')
  //                 this.Media_details.h_type = ''
  //               else
  //                 this.Media_details.v_type = ''
  //               $('#__'+videon).html("");
  //               file.value = '';
  //               this.isError = true;
  //               this.imagevalidcheck = true;
  //               this.uploaderrmsg = "Video duration should be less than 40 sec.";
  //             }

  //             this.sharedService.updateIsRequestOn(false);
  //           }, 10000);
  //         };
  //       }
  //     }
  //   } else {
  //     // $('#_file').html("");
  //     $('#__'+videon).html("");
  //     file.value = '';
  //     this.isError = true;
  //     this.isValid = false;
  //   }
  //   // console.log("SLOT OBJ : ",this.Media_details);
  // }

  // validateFileType(type) {
  //   for(let i=0; i< CommonURL.FILE_TYPES.length; i++ ) {
  //     if(type == CommonURL.FILE_TYPES[i].type){
  //       this.isValidFile = true;
  //       return true
  //     }
  //   }
  //   this.isValidFile = false;
  //   return false;
  // }
}
