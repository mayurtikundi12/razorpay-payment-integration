import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './main-new.component.html',
  styleUrls: ['./main-new.component.scss']
})
export class MainNewComponent implements OnInit, OnDestroy {
  constructor(private apiService: ApiService,
    private router: Router) {}
  searchText:any;
  outletList;
  ngOnInit() {
    this.getOutletList();
    localStorage.setItem('isLoggedIn', 'true');
  }
  ngOnDestroy() {
  }

  getOutletList(){
    this.apiService.http_get("business/get/all")
    // this.http.get("http://localhost:3000/v1/business/get/all")
    .subscribe((response) => {
      this.outletList = response['payload'];
      console.log("this", this.outletList);
    },(error) => {
      console.log("err", error);
    })
  }

  buyCard(id) {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate(['buy-gift-card', id]);
    } else {
      this.router.navigate(['verify-phone']);
    }
  }

  donate(id) {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate(['help-donating', id]);
    } else {
      this.router.navigate(['verify-phone']);
    }
  }

}
