import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  outletList;

  ngOnInit(): void {
    this.getOutletList();
    localStorage.setItem('isLoggedin', 'true');
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
}
