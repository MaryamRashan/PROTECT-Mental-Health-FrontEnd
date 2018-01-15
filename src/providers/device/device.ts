import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as UUID from 'uuid/v1';

import { DataProvider } from './../../providers/data/data';

/*
  Generated class for the DeviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeviceProvider {

  public deviceId = 'AAAAAA000000BBBBBBB222222CCCCCCC33333333'

  constructor(public http: Http, public data: DataProvider) {
    console.log('Hello DeviceProvider Provider');
    this.generateDeviceId();
  }

  getDeviceId(){
    return new Promise((resolve, reject)=>{
      resolve(this.deviceId)
    })
  }

  async generateDeviceId(){
        let currntDeviceId = await this.data.getDeviceId()
        if(currntDeviceId){
          this.deviceId = currntDeviceId;
        }else{
          let newDeviceId = UUID();
          this.deviceId = newDeviceId;
          this.data.setDeviceId(newDeviceId)
        }
  }

}
