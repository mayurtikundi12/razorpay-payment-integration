import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit {
  obj = {
    email: '',
    password: '',
    new_password: ''
  }
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  createAccount(){

    this.apiService.http_post('business/create/pass', this.obj)
    .subscribe((response) => {
      console.log("response",response);
      this.router.navigate(['/business-login']);
    },(err) => {
      console.log("err", err);
    })
    console.log("in")
  }

}
