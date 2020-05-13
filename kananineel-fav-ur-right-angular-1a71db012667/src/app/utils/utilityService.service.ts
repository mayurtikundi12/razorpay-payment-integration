import { Injectable } from '@angular/core';
// import {MatDialog, MatDialogRef} from '@angular/material';
import { Http, URLSearchParams, Response } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { CommonURL } from './common';
import { SharedService } from './shared-service.service';
import {CustomDialogComponent} from "../custom-dialog/custom-dialog.component";
import {CommonUIStrings} from "./commonUIStrings";
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  mutex:boolean = false;
  dialogRef:any;
  constructor(private httpClient:HttpClient, public modalService: NgbModal,private http: Http, private router: Router, private sharedService: SharedService) {
    this.mutex = false;
   }


   callGetApi(apiurl: string, params?: URLSearchParams) {
    return this.http.get(apiurl, {
        search: params
      })
      .pipe( map(
        (response: Response) => {
          return this.handleResponse(response.json(), apiurl);
        }
      )
      ,catchError(
        //(error: Response) => {
        //  return this.handleErrorResponse(error.json());
        //}
        (error: Response) => (error.status == 401) ? this.handleErrorResponse(error.json()) : Observable.throw(error.json())
      ));
  }

  callGetWithHeaderApi(apiurl: string,options?:any ) {
    return this.http.get(apiurl,options)

  }

  callCustomGetApi(apiurl: string, params?: URLSearchParams,token?:any) {
      if(token){
        console.log("this is the token when setting the headers ",token);

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.httpClient.get(apiurl, { headers: headers })
      .map(response => {
        return response;
      })
      .catch(response => (Observable.throw(response)
      ))
      }else{
        return this.httpClient.get(apiurl)
      }

    }

  callPostApi(apiurl: string, body: any, options?) {

    // if(this.isInValidSession()){
    //   this.redirectToLogin();
    // }
    // else{
      return this.http.post(apiurl, body, options).pipe( map(
        (response: Response) => {
          const json = response.json() as any;
          if (!json.is_success) {
            throw new Error(json);
          }
            return this.handleResponse(response.json(), apiurl);
        }
      ),
      catchError(
        (error: Response) => (error.status == 401 && apiurl != (CommonURL.BASE_URL + CommonURL.URL_LOGIN)) ? this.handleErrorResponse(error.json()) : Observable.throw(error.json())

      ));
    // }

  }

  callCustomPostApi(apiurl: string, body: any, options?) {

    if(this.isInValidSession()){
      this.redirectToLogin();
    }else{
      return this.http.post(apiurl, body, options);
    }

  }

  callPutApi(apiurl: string, body: any, params?: URLSearchParams) {
    return this.http.post(apiurl, body, {
      search: params
    }).pipe(map(
      (response: Response) => {
        return this.handleResponse(response.json(), apiurl);
      }
    ),catchError(
      //(error: Response) => Observable.throw(error.json().error
      //  || "Server Error")
      (error: Response) => (error.status == 401) ? this.handleErrorResponse(error.json()) : Observable.throw(error.json())

      //(error: Response) => {
      //  return this.handleErrorResponse(error.json())
      //}
    ));
  }

  callDeleteApi(apiurl: string, params?: URLSearchParams) {
    return this.http.post(apiurl, {
      search: params
    }).pipe(map(
      (response: Response) => {
        return this.handleResponse(response.json(), apiurl);
      }
    ),catchError(
      //(error: Response) => Observable.throw(error.json().error
      //  || "Server Error")
      //
      (error: Response) => (error.status == 401) ? this.handleErrorResponse(error.json()) : Observable.throw(error.json())
      //(error: Response) => {
      //  return this.handleErrorResponse(error.json())
      //}
    ));
  }

  prepareRequestParams(params): URLSearchParams {
    let searchParam: URLSearchParams = new URLSearchParams();
    if (typeof params == 'object') {
      for (var i in params) {
        searchParam.set(i, params[i]);
      }
      return searchParam;
    }
    return null;
  }

  handleResponse(response, apiurl) {
    // if(apiurl == CommonURL.BASE_URL + CommonURL.GET_VENUE_PERK_REPORT_EXCEL)
    //   return response;
    // else{
      if (response.status_code == 200 || response.status_code == 201) {
        return response;
      } else {
        return null;
      }
    // }
  }

  handleErrorResponse(error){
    if(error.status_code == 401){
      this.sharedService.dialogText = {
        title : CommonUIStrings.FAILURE,
        description : error.message,
        isInfoDialog : true,
        headerBgClass : CommonUIStrings.REJECT_POPUP_BG_CLASS,
        headerIcon : CommonUIStrings.REJECT_POPUP_ICON_CLASS
      };

      // console.log('Error');
      this.dialogRef = this.modalService.open(CustomDialogComponent);
      this.dialogRef.afterClosed().subscribe(result => {
        if(result == 1)
        {
          //window.history.back();
          this.router.navigate(["/" + CommonURL.URL_LOGIN ]);
        }
      });
      // this.myDialog.hidePleaseWait();
    }else if(error.status_code == 403){
      this.sharedService.dialogText = {
        title : CommonUIStrings.FAILURE,
        description : error.message,
        isInfoDialog : true,
        headerBgClass : CommonUIStrings.REJECT_POPUP_BG_CLASS,
        headerIcon : CommonUIStrings.REJECT_POPUP_ICON_CLASS
      };
      // // console.log("403");
      this.dialogRef = this.modalService.open(CustomDialogComponent);
      this.dialogRef.afterClosed().subscribe(result => {
        if(result == 1)
        {
          //window.history.back();
          //this.router.navigate(["/" + CommonURL.URL_LOGIN ]);
        }
      });
    }else{
      return error;
    }


  }

  setLocalstorageKey(key, val) {
    localStorage.setItem(key, val);
  }

  getLocalStorageKey(key) {
    return localStorage.getItem(key);
  }

  removeLocalStorageKey(key) {
    localStorage.removeItem(key);
  }

  isInValidSession(){

    if(this.getLocalStorageKey(CommonURL.LOCAL_STORAGE_SESSION_TIMESTAMP) == null && this.getLocalStorageKey(CommonURL.LOCAL_STORAGE_USER_KEY) == null && this.getLocalStorageKey(CommonURL.LOCAL_STORAGE_USER_LIST) == null)
      return false;
    else{
      let lastTimeStamp:any = JSON.parse(this.getLocalStorageKey(CommonURL.LOCAL_STORAGE_SESSION_TIMESTAMP));

      let currentTimeStamp = Date.now();
      if((currentTimeStamp - lastTimeStamp) > CommonURL.SESSION_TIMEOUT)
      {
        this.removeLocalStorageKey(CommonURL.LOCAL_STORAGE_USER_KEY);
        this.removeLocalStorageKey(CommonURL.LOCAL_STORAGE_USER_LIST);
        this.removeLocalStorageKey(CommonURL.LOCAL_STORAGE_SESSION_TIMESTAMP);
        return true;
      }
      else
        return false;
    }
  }

  redirectToLogin(){
    this.sharedService.updateIsRequestOn(false);
    this.sharedService.dialogText = {
      title : CommonUIStrings.FAILURE,
      description : CommonUIStrings.SESSION_EXPIRED,
      isInfoDialog : true,
      headerBgClass : CommonUIStrings.REJECT_POPUP_BG_CLASS,
      headerIcon : CommonUIStrings.REJECT_POPUP_ICON_CLASS
    };
    // this.dialogRef = this.dialog.open(CustomDialogComponent, {
      // "disableClose" : true
    // });
    this.dialogRef.afterClosed().subscribe(result => {
      if(result == 1)
      {
        this.router.navigate(["/" + CommonURL.URL_LOGIN ]);
      }
    });
  }

  public loadScript(url) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  // myDialog = this.myDialog || (function () {
  //   var pleaseWaitDiv = $(`<div class="modal fade"
  //   id="pleaseWaitDialog" data-backdrop="static"
  //   data-keyboard="false"><div class="modal-dialog"><div
  //     class="modal-content"><div
  //     class="modal-header"><h4>Processing...</h4></div><div
  //     class="modal-body"><div class="progress"><div class="progress-bar
  //   progress-bar-striped active" role="progressbar" aria-valuenow="100"
  //   aria-valuemin="0" aria-valuemax="100"
  //   style="width:100%"></div></div></div></div></div></div>`);
  //   return {
  //     showPleaseWait: function () {
  //       pleaseWaitDiv.modal('show');
  //     },
  //     hidePleaseWait: function () {
  //       pleaseWaitDiv.modal('hide');
  //     },

  //   };
  // })();
}

