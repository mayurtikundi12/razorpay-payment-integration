import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonURL} from './common';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  http_get(url){
    return this.http.get<any>(CommonURL.BASE_URL+url);
  }

  http_post(url,body){
    return this.http.post<any>(CommonURL.BASE_URL+url,body)
  }

  http_put(url,body){
    return this.http.put<any>(CommonURL.BASE_URL+url,body)
  }


  http_delete(url,body){
    return this.http.delete<any>(CommonURL.BASE_URL+url,body)
  }



}
