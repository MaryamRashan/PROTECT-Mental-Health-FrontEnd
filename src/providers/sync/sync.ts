import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SocketProvider } from '../../providers/socket/socket';
import { DataProvider } from '../../providers/data/data';

import * as UUID from 'uuid/v1';

/*
  Generated class for the SyncProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SyncProvider {

  public counter = 0;
  public queu = [];

  constructor(public http: Http, public socket : SocketProvider, public data : DataProvider) {
    console.log('Hello SyncProvider Provider');
  }

  // incerementCount(){
  //   this.counter += 1;
  // }

  // decrementCount(){
  //   if (!(this.counter == 0)){
  //     this.counter -= 1;
  //   }
  // }

  // addToQueu(id){
  //   this.queu.push(id)
  // }

  // removeFromQueu(id){

  // }

  invokeSendDataThroughSocket(data, type, patientId){
    let payLoad = {
      id : UUID(),
      data : data,
      type : type,
      patientId : patientId
    }
    this.socket.sendData(payLoad)
  }

}
