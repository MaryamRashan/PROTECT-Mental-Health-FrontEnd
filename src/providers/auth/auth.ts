import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private baseUrl = 'http://mi.nicst.net/auth/login';
  // private baseUrl = 'http://localhost:7171/auth/login';

  constructor(public http: Http) {
    console.log('Hello AuthProvider Provider');
  }
  login(credentials){

    return new Promise((resolve, reject)=>{
    
    console.log('loggin process started')

              let headers: Headers = new Headers();
    
              headers.append('Content-Type','application/json')
              headers.append('Accept','application/json')
              let opts: RequestOptions = new RequestOptions();
              opts.headers = headers;

    this.http.post(`${this.baseUrl}`, credentials, opts)
    .toPromise()
    .then((response: any) => {
      
      var data = JSON.parse(response._body)
      console.log(response)
      var user = data.user;
      // user.token = token;
      // // if (token) {
      // //   localStorage.setItem('id_token', token);
      // // }
      // console.log(token)
      console.log(user)
      console.log(data)
      resolve(data)
   
      
    })
    .catch((err) => {
      console.log(err)
      reject(err)
    });

  })
  }
  // login(credentials){
  //   return new Promise((resolve, reject)=>{
  //   console.log('loggin process started')

  //   this.http.post(`${this.baseUrl}/social/auth/googleaccesstoken`, credentials)
  //   .toPromise()
  //   .then((response: any) => {
  //     var token = response.headers.get('x-auth-token');
  //     console.log('This is x-auth-token  ' + token)
  //     var data = JSON.parse(response._body)
  //     var user = data.user;
  //     user.token = token;
  //     // if (token) {
  //     //   localStorage.setItem('id_token', token);
  //     // }
  //     console.log(token)
  //     console.log(user)
  //     resolve(user)
      
  //   })
  //   .catch((err) => console.log(err));

  //   })
  // }

}
