import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';

import * as io from 'socket.io-client';

import { DeviceProvider } from '../../providers/device/device';
import { DataProvider } from './../../providers/data/data';


import * as UUID from 'uuid/v1';


/*
  Generated class for the SocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocketProvider {



  public deviceId: any = 'Is not recieved :[ ';
  // private baseUrl = 'http://localhost:7171';
  private baseUrl = 'http://mi.nicst.net';
  // public token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWZlZjRmYmFiZGEwNTFhM2M2OWQ4MzgiLCJ1c2VyTmFtZSI6InRlc3QxIiwicm9sZSI6ImFkbWluIiwiaG9zcGl0YWxzIjpbIjU5ZmVlYWExMjAwMzI4MDY3NDhlNzQ5NSJdLCJ1bml0cyI6WyI1OWZlZWUzNWJlODkzMjE5MTAyOTUyNmYiXSwiaWF0IjoxNTA5ODgyODk2LCJleHAiOjE2MTA2ODI4OTZ9.c8ceFurWEx4TFrzNLhKoUytQQ16UUpAdvwezGN7dODg';
  public token = '';
  public nspData;
  public unitId;
  public userId;

  public counter = 0;
  public queu = [];

  constructor(public http: Http, public device: DeviceProvider, public data: DataProvider, public event: Events) {
    console.log('Hello SocketProvider Provider');
    this.setdata()
    this.event.subscribe('-decerementCount-', ()=>{
      
      this.decrementCount();
      console.log(`counter decremented,  new counter is [ ${this.counter} ]`)
    })

  }

  incerementCount(){
    this.counter += 1;
  }

  decrementCount(){
    if (!(this.counter == 0)){
      this.counter -= 1;
    }
  }

  addToQueu(id){
    this.queu.push(id)
  }

  removeFromQueu(id){

  }

  async setdata(){
    this.userId = await this.data.getUserId();
    this.unitId = await this.data.getUnitId();
    this.token = await this.data.getUserToken();
  }

  //TODO this.token check is problematic

  async openDataConnection(){
    await this.setdata();
    console.log('openDataConnection()');
    this.device.getDeviceId().then(result=>{
      this.deviceId = result;
      console.log(this.deviceId);
      console.log(this.token);
      if(this.token){
        // let userId = await this.data.getUserId();
        // let unitId = this.data.getUnitId();
        this.nspData = io(`${this.baseUrl}/data`, {query: 'auth_token=' + this.token + '&deviceId='+ this.deviceId + '&userId='+ this.userId + '&unitId='+ this.unitId, 'sync disconnect on unload' : true} );
            this.nspData.on('-sync-', (data)=>{
              console.log('recieved patients ', data)
              this.syncData(data);
            })

            this.nspData.on('success', (success)=> {
              this.getPatientDataThroughSocket()
              console.log(success);
              this.data.getDataFromTempDb().then((result)=>{
                console.log('getDataFromTempDb()',result)
                let _result = result;
                if(_result.length > 0){
                    _result.forEach((value)=>{
                      this.resendData(value);
                    })
                }
              })

              // let payLoad ={
                
              //   data : '-pong-',
              //   deviceId : this.deviceId,
              //   type : '-ping-'
                
              // }
              // this.nspData.emit('add-message', payLoad)
              // window.setInterval(()=>{
              //   this.nspData.emit('add-message', payLoad)
              // }, 60000)
              
              
              // console.log('user info: ' + data.user);
              // console.log('logged in: ' + data.user.logged_in)
            })

            this.nspData.on('-dataFromServer-', (_data, callback)=> {
              let data = _data;
              this.incerementCount();
              console.log('-dataFromServer-', this.counter);
              window.setTimeout(()=>{
                console.log(data);
                
                callback('-delivered-');
                let convData = JSON.parse(data.data);
                // console.log(data);
                // console.log(convData);
  
                if(!(this.deviceId == convData.deviceId)){
                  console.log('Needs to update');
                  console.log(convData.type);
                  console.log('THIS DEVICE ID ',this.deviceId);
                  console.log('OTHER DEVICE ID ',convData.deviceId);
  
                  if(convData.type == '-newAdmission-'){
                    this.data.saveNewPatient(convData.data)
                  } else if(convData.type == '-updateAdmission-'){
                    console.log('-updateAdmission- DATA>>>>', convData.data)
                    this.data.updatePatient(convData.data, '-updateAdmission-')
                  } else if(convData.type == '-newObservation-'){
                    console.log('-newObservation- DATA>>>>', convData)
                    this.data.updatePatient(convData, '-newObservation-')
                  } else if(convData.type == '-newInterventionPci-'){
                    console.log('-newInterventionPci- DATA>>>>', convData)
                    this.data.updatePatient(convData, '-newInterventionPci-')
                  } else if(convData.type == '-newThrombolysis-'){
                    console.log('-newThrombolysis- DATA>>>>', convData)
                    this.data.updatePatient(convData, '-newThrombolysis-')
                  } else if(convData.type == '-newPostOpDay1-'){
                    console.log('-newPostOpDay1- DATA>>>>', convData)
                    this.data.updatePatient(convData, '-newPostOpDay1-')
                  } else if(convData.type == '-newPostOpDay3-'){
                    console.log('-newPostOpDay3- DATA>>>>', convData)
                    this.data.updatePatient(convData, '-newPostOpDay3-')
                  } else if(convData.type == '-newPostOpDay7-'){
                    console.log('-newPostOpDay7- DATA>>>>', convData)
                    this.data.updatePatient(convData, '-newPostOpDay7-')                    
                  } else if(convData.type == '-newIntOp-'){
                    console.log('-newIntOp- DATA>>>>', convData)
                    this.data.updatePatient(convData, '-newIntOp-')
                  } else if(convData.type == '-newQualityOfLife-'){
                    console.log('-newQualityOfLife- DATA>>>>', convData)
                    this.data.updatePatient(convData, '-newQualityOfLife-')
                  } else if(convData.type == '-updateObservation-'){
                    console.log('-updateObservation- DATA>>>>', convData)
                    this.data.updatePatient(convData, '-updateObservation-')
                  } else if(convData.type == '-updateInterventionPci-'){
                    console.log('-updateInterventionPci- DATA>>>>', convData)
                    this.data.updatePatient(convData, '-updateInterventionPci-')
                  } else if(convData.type == '-updateThrombolysis-'){
                    console.log('-updateThrombolysis- DATA>>>>', convData)
                    this.data.updatePatient(convData, '-updateThrombolysis-')
                  } else if(convData.type == '-updatePostOpDay1-'){
                    console.log('-updatePostOpDay1- DATA>>>>', convData)
                    this.data.updatePatient(convData, '-updatePostOpDay1-')
                  } else if(convData.type == '-updatePostOpDay3-'){
                    console.log('-updatePostOpDay3- DATA>>>>', convData)
                    this.data.updatePatient(convData, '-updatePostOpDay3-')
                  } else if(convData.type == '-updatePostOpDay7-'){
                    console.log('-updatePostOpDay7- DATA>>>>', convData)
                    this.data.updatePatient(convData, '-updatePostOpDay7-')
                  } else if(convData.type == '-updateQualityOfLife-'){
                    console.log('-updateQualityOfLife- DATA>>>>', convData)
                    this.data.updatePatient(convData, '-updateQualityOfLife-')
                  } else if(convData.type == '-updateIntOp-'){
                    console.log('-updateIntOp- DATA>>>>', convData)
                    this.data.updatePatient(convData, '-updateIntOp-')
                  } else if (convData.type == '-discharge-'){
                      this.data.removePatient(convData.patientId);
                      console.log('patient removed >>>>>> ', convData.patientId )
                  }
                } else{
                  this.decrementCount()
                }
              }, this.counter * 100)
              
              
              
              // console.log('user info: ' + data.user);
              // console.log('logged in: ' + data.user.logged_in)
            })

            this.nspData.on('-data-', (success, callback)=> {
              
              console.log(success);
              callback('delivered')
              
              // console.log('user info: ' + data.user);
              // console.log('logged in: ' + data.user.logged_in)
            })

            this.nspData.on('-ready-', (success)=> {
              
              console.log(success);
              // this.subscribeToRabbitmq();
              
              // console.log('user info: ' + data.user);
              // console.log('logged in: ' + data.user.logged_in)
            })
            
      }
    });
    
  }

  getPatientDataThroughSocket(){
    console.log('recieved getPatientDataThroughSocket( >>')
    this.nspData.emit('-sync-')
  }

  async syncData(patients){
    let currentData =  this.data.getPatients();
    if (currentData.length ==0){
      console.log('@@@@@@@@SYNC Happens!@@@@@@@@@@')
        patients.forEach(patient => {
          let newPatient: any = {
            // patientId : patient.patientId,
            // admission : patient.admission[0],
            // postopday1s : patient.postopday1[0],
            // postopday3s : patient.postopday3[0],
            // postopday7s : patient.postopday7[0],            
            // intraOps : patient.intraOp,
            // observations : patient.observation,
            // qol : patient.qol,
          };
          newPatient.patientId = patient.patientId;
          newPatient.admission = patient.admission[0];
          // if(patient.postopday1[0]){
          //   newPatient.postopday1s = patient.postopday1[0];
          // }
          // if(patient.postopday3[0]){
          //   newPatient.postopday3s = patient.postopday3[0];
          // }
          // if(patient.postopday7[0]){
          //   newPatient.postopday7s = patient.postopday7[0];
          // }
          // if (patient.interventionpci[0]){
          //   newPatient.interventionpci = patient.interventionpci[0];
          // }
          // if (patient.thrombolysis[0]){
          //   newPatient.thrombolysis = patient.thrombolysis[0];
          // }
          // if (patient.intraOp[0]){
          //   newPatient.intraOps = patient.intraOp;
          // }
          if (patient.observation[0]){
            newPatient.observations = patient.observation;
          }
          if (patient.qol[0]){
            newPatient.qol = patient.qol;
          }
          this.data.saveNewPatientFromSync(newPatient)

        });
    }
  }

  testRabbitmq(){
    let msg = {
      body: Date.now(),
      _id: this.deviceId
    }
    this.nspData.emit('add-message', msg)
  }

  subscribeToRabbitmq(){
    let msg = {
      type: "-ping-",
      body: Date.now(),
      _id: this.deviceId
    }
    this.nspData.emit('-subscribe-', msg)
  }


  sendData(data){
    let payLoad ={
      id : data.id,
      data : data.data,
      deviceId : this.deviceId,
      type : data.type,
      patientId : data.patientId
    }
    this.data.saveToTempDb(payLoad);
    this.nspData.emit('add-message', payLoad, (responseData)=>{
      console.log('ACKNOWLEGEMENT : ', responseData)
      this.data.removeFromTempDb(responseData)
    })
  }

  resendData(payLoad){
    console.log('data to RESEND ', payLoad);
    this.sendData(payLoad)

  }



}
