import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/utils/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  obj = {
    email: '',
    password: ''
  }
    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit(): void {
    }

    UpdatePass(){

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
