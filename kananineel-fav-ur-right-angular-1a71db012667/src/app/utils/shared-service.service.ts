import { Injectable } from '@angular/core'
import { Http, URLSearchParams, Response } from '@angular/http'
import { RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { CommonURL } from "./common";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

declare var $: any;

@Injectable()
export class SharedService {

  constructor(private http: Http, private router: Router) {

  }

  private newFeedsSubject : Subject<any> = new Subject<any>();
  newFeeds$ = this.newFeedsSubject.asObservable();


  private scheduledFeedsSubject : Subject<any> = new Subject<any>();
  scheduledFeeds$ = this.scheduledFeedsSubject.asObservable();


  private rejectedFeedsSubject : Subject<any> = new Subject<any>();
  rejectedFeeds$ = this.rejectedFeedsSubject.asObservable();

  private breadCrumbSubject : Subject<any> = new Subject<any>();
  breadCrumb$ = this.breadCrumbSubject.asObservable();

  private restaurantListSubject : Subject<any> = new Subject<any>();
  restaurant$ = this.restaurantListSubject.asObservable();

  //vedants changes
  private actionBarIconSpotlightSubject : Subject<any> = new Subject<any>();
  actionBarIconSpotlight$ = this.actionBarIconSpotlightSubject.asObservable();

  private hideSpotlightParentSubject : Subject<any> = new Subject<any>();
  hideSpotlightParent$ = this.hideSpotlightParentSubject.asObservable();

  private hidePerksParentSubject : Subject<any> = new Subject<any>();
  hidePerksParentSubject$ = this.hidePerksParentSubject.asObservable();

  private isRequestOnSubject : Subject<any> = new Subject<any>();
  isRequestOn$ = this.isRequestOnSubject.asObservable();

  private snackBarMessageSubject : Subject<any> = new Subject<any>();
  snackBarMessage$ = this.snackBarMessageSubject.asObservable();


  private isParentSubject : Subject<any> = new Subject<any>();
  isParentFlag$ = this.isParentSubject.asObservable();

  private hideSpotlightInitSubject : Subject<any> = new Subject<any>();
  hideSpotlightInitSubject$ = this.hideSpotlightInitSubject.asObservable();

  private hideSpotlightMParentSubject : Subject<any> = new Subject<any>();
  hideSpotlightMParent$ = this.hideSpotlightMParentSubject.asObservable();

  private hideUsersFilterSubject : Subject<any> = new Subject<any>();
  hideUsersFilterSubject$ = this.hideUsersFilterSubject.asObservable();

  private hidePerkReportFilterSubject : Subject<any> = new Subject<any>();
  hidePerkReportFilterSubject$ = this.hidePerkReportFilterSubject.asObservable();

  private toggleUsersAppFilterSubject : Subject<any> = new Subject<any>();
  toggleUsersAppFilterSubject$ = this.toggleUsersAppFilterSubject.asObservable();

  private togglePerkReportAppFilterSubject : Subject<any> = new Subject<any>();
  togglePerkReportAppFilterSubject$ = this.togglePerkReportAppFilterSubject.asObservable();

  private perkUpdateSubject : Subject<any> = new Subject<any>();
  isPerkUpdated$ = this.perkUpdateSubject.asObservable();

  private iscompanyCustomerPerkAddedSubject : Subject<any> = new Subject<any>();
  iscompanyCustomerPerkAdded$ = this.iscompanyCustomerPerkAddedSubject.asObservable();

  private isHideUsersInfoSubject : Subject<any> = new Subject<any>();
  hideUsersInfoSubject$ = this.isHideUsersInfoSubject.asObservable();


  perksDetailsObject;
  starPerkDetailsObject:any = null;
  superStarPerkDetailsObject:any = null;
  isStarPerk:boolean = false;
  spotlightDetailsObject;
  feeds:any = [];
  feedTrail:any;
  userObject:any;
  usersArrayObject:any;
  dialogText:any;
  companyObject:any = null;
  branchObject:any = null;
  companyCustomPerk:any = null;
  latest_feed_timestamp:any = null;
  mediaList:any = null;
  userPerkDetails:any = null;

  updateNewFeeds(data:any){
    this.newFeedsSubject.next(data);
  }

  updateRejectedFeeds(data:any){
    this.rejectedFeedsSubject.next(data);
  }

  updateScheduledFeeds(data:any){
    this.scheduledFeedsSubject.next(data);
  }

  updateBreadCrumb(data:any){
    this.breadCrumbSubject.next(data);
  }

  updateRestaurantData(data:any){
    this.restaurantListSubject.next(data);
  }

  // vedants changes
  updateSpotlightEditIcon(data:any){
    this.actionBarIconSpotlightSubject.next(data);
  }

  updateHideSpotlightParent(data:any){
    this.hideSpotlightParentSubject.next(data);
  }

  updateHidePerksParent(data:any){
    this.hidePerksParentSubject.next(data);
  }
  updateIsRequestOn(data:any){
    this.isRequestOnSubject.next(data);
  }

  updateSnackBarMessage(data:any){
    this.snackBarMessageSubject.next(data);
  }

  updateIsParentFlag(data:any) {
    this.isParentSubject.next(data);
  }

  updateHideSpotlightInit(data:any){
    this.hideSpotlightInitSubject.next(data);
  }

  updateHideSpotlightInitParent(data:any){
    this.hideSpotlightMParentSubject.next(data);
  }

  updateHideUsersFilterParent(data:any){
    this.hideUsersFilterSubject.next(data);
  }

  updateHidePerkReportFilterParent(data:any){
    this.hidePerkReportFilterSubject.next(data);
  }

  updateUsersAppFilter(data:any){
    this.toggleUsersAppFilterSubject.next(data);
  }

  updatePerkReportAppFilter(data:any){
    this.togglePerkReportAppFilterSubject.next(data);
  }

  updatePerkUpdatedFlag(data:any){
    this.perkUpdateSubject.next(data);
  }

  iscompanyCustomerPerkAddedFlag(data:any){
    this.iscompanyCustomerPerkAddedSubject.next(data);
  }


  updateIsUserInfoFlag(data:any){
    this.isHideUsersInfoSubject.next(data);
  }

}
