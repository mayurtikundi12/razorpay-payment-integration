import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { ApiService } from 'src/app/utils/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  constructor(private apiService: ApiService) { }
  outletList;
  ngOnInit() {
    this.getOutletList();
    localStorage.setItem('isLoggedin', 'true');
  }

  applyFilter(filterValue: string) {
    if (filterValue.length !== 0) {
      this.outletList = this.outletList.filter(dt =>
        dt.name.toLowerCase().includes(filterValue.toLowerCase()));
    } else {
      this.outletList.filter(null);
    }
  }

  /* Added */

  result = [
    {
      id: '1',
      img: '../../../assets/img/images/2.jpg',
      name: 'Filament'
    },
    {
      id: '2',
      img: '../../../assets/img/images/3.jpg',
      name: 'Urbo'
    },
    {
      id: '3',
      img: '../../../assets/img/images/2.jpg',
      name: 'tns'
    },
    {
      id: '4',
      img: '../../../assets/img/images/4.jpg',
      name: 'thikana'
    },
    {
      id: '5',
      img: '../../../assets/img/images/3.jpg',
      name: 'fly high'
    },
    {
      id: '6',
      img: '../../../assets/img/images/4.jpg',
      name: 'Agent Jacks'
    },
    {
      id: '7',
      img: '../../../assets/img/images/2.jpg',
      name: 'Farmaaish'
    },
  ]

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
