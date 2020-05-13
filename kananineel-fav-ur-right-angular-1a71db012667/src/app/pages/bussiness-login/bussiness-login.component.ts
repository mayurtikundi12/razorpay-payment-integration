import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bussiness-login',
  templateUrl: './bussiness-login.component.html',
  styleUrls: ['./bussiness-login.component.css']
})
export class BussinessLoginComponent implements OnInit {
obj = {
  email: '',
  password: ''
}
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  createAccount(){

    this.apiService.http_post('business/login', this.obj)
    .subscribe((response) => {
      console.log("response",response);
      this.router.navigate(['/dashboard']);
    },(err) => {
      console.log("err", err);
    })
    console.log("in")
  }
}
