import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import {patient} from '../../models/models';

// import { SyncProvider } from '../../providers/sync/sync';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  public lodedPatients: patient[] ;
  public patientsArray = [];
  public tempDataIdArray = [];

  constructor(public http: Http, private storage: Storage, public event: Events) {
    console.log('Hello DataProvider Provider');
    this.getPatientsFromDb();
  }

  async saveUserData(Data){

    let token: string = Data.token;
    let tokenStripped = token.replace("JWT ", '')
    let unitId = Data.user.units[0];
    let userId = Data.user._id;
    // TODO: Promise Array?
    this.storage.set('-token-', tokenStripped);
    this.storage.set('-unitId-', unitId);
    this.storage.set('-userId-', userId);
    // this.socket.openDataConnection();
  }

  async getUserToken(){
    return await this.storage.get('-token-')
    
  }

  async getUserId(){
    return await this.storage.get('-userId-')
    
  }

  async getUnitId(){
    return await this.storage.get('-unitId-')
    
  }

  setDeviceId(deviceId){
    this.storage.set('-deviceId-', deviceId);
  }

  async getDeviceId(){
    return await this.storage.get('-deviceId-')
    
  }

  async saveNewPatient(admissionData){
    let unitId = await this.getUnitId();
    let newPatient = {
      patientId: admissionData.patientId,
      admission: admissionData,
      timeStamp: new Date().getTime()
    }

    // console.log(newPatient);
    this.patientsArray.push(newPatient);
    let key = '-patient-' + unitId + '-'+ admissionData.patientId;
    this.storage.set(key, newPatient);
    console.log(this.patientsArray);
    this.sortPatients()
    this.event.publish('-decerementCount-');

    

  }

  async saveNewPatientFromSync(newPatient){
    let unitId = await this.getUnitId();
    this.patientsArray.push(newPatient);
    let key = '-patient-' + unitId + '-'+ newPatient.patientId;
    this.storage.set(key, newPatient);
    this.sortPatients()
  }

  async saveToTempDb(tempData){
    let unitId = await this.getUnitId();
    let key = '-temp-' + unitId + '-'+ tempData.id;
    this.storage.set(key, tempData);
    this.tempDataIdArray.push(tempData.id);
  }

  async getDataFromTempDb(){

    if(this.tempDataIdArray.length > 0){
      return [];
    }
    let unitId = await this.getUnitId();
    let keyToSearch = '-temp-' + unitId ;
    let tempArray = [];
    await this.storage.forEach((value, key)=>{
      // console.log(tempArray)
      if(key.includes(keyToSearch)){
        // console.log(value);
        tempArray.push(value);
      }
        
    })
    // console.log(tempArray)
    return tempArray;
    
  }

  async removeFromTempDb(tempData){
    let unitId = await this.getUnitId();
    let key = '-temp-' + unitId + '-'+ tempData.id;
    this.storage.remove(key);
    let index = this.tempDataIdArray.indexOf(tempData.id);
    if (index > -1) {
      this.tempDataIdArray.splice(index, 1);
    }
  }

  async getPatientsFromDb(){
    let unitId = await this.getUnitId();
    let keyWithUnitId = '-patient-' + unitId;
    this.storage.forEach((value, key)=>{
      if(key.includes(keyWithUnitId)){
        console.log(value);
        this.patientsArray.push(value);
      }
        
    }).then(()=>{
      this.patientsArray = this.patientsArray.sort(function(a,b){return a.admission.bht - b.admission.bht})
      console.log('SORTED PATIENTS ', this.patientsArray)
    })
  }

  sortPatients(){
    this.patientsArray = this.patientsArray.sort(function(a,b){return a.admission.bht - b.admission.bht})
      console.log('SORTED PATIENTS ', this.patientsArray)
  }

  async getPatientByIdFromDb(id){
    let unitId = await this.getUnitId();
    let key = '-patient-'+ unitId + '-'+ id;
    return await this.storage.get(key);
  }

  async removePatient(id){
    this.removePatientByIdDromDb(id);
    this.removePatientFromArray(id);
    this.event.publish('-decerementCount-');
  }

  async removePatientFromArray(id){
    let filteredIndex = null;
    
          this.patientsArray.forEach((element, index) => {
    
            if (element.patientId == id){
              filteredIndex = index;
              // console.log('save called for edit obs', element)
              // element = observation;
              // console.log('save called for edit obs')
    
              // console.log('save called for edit obs', element)
            }

            
    
          });
          if(!(filteredIndex == null)){
            this.patientsArray.splice(filteredIndex,1);
          }
          

    
  }

  async removePatientByIdDromDb(id){
    let unitId = await this.getUnitId();
    let key = '-patient-'+ unitId + '-'+ id;
    return await this.storage.remove(key);
  }

  updatePatient(data, type){
    this.event.publish('-decerementCount-');
    switch(type) {
      case '-updateAdmission-':
          this.updateAdmission(data);
          break;
      case '-newObservation-':
          this.addObservation(data);
           break;
      case '-newInterventionPci-':
           this.addInterventionPci(data);
            break;
      case '-newThrombolysis-':
            this.addThrombolysis(data);
            break;
      case '-newPostOp-':
            this.addPostOp(data);
            break;
      case '-newPostOpDay3-':
            this.addPostOpDay3(data);
            break;
      case '-newPostOpDay7-':
            this.addPostOpDay7(data);
            break;                                                            
      case '-newQualityOfLife-':
            this.addQol(data);
            break;
      case '-newNotesVar-':
            this.addNotes(data);
            break;            
      case '-newIntOp-':
            this.addIntraOp(data);
            break;
      case '-updateObservation-':
            this.updateObservation(data);
            break;
      case '-updateInterventionPci-':
            this.updateInterventionPci(data);
             break;
      case '-updateThrombolysis-':
            this.updateThrombolysis(data);
            break;
      case '-updatePostOp-':
            this.updatePostOp(data);
            break;
      case '-updatePostOpDay3-':
            this.updatePostOpDay3(data);
            break;           
      case '-updatePostOpDay7-':
            this.updatePostOpDay7(data);
            break;                         
      case '-updateIntOp-':
            this.updateIntraOp(data);
            break;
      case '-updateQualityOfLife-':
            this.updateQol(data);
            break;
      case '-updateNotesVar-':
            this.updateNotes(data);
            break;            
      default:
          
  }

  }

  async updateAdmission(data) {

    if (data.admission) {
      let unitId = await this.getUnitId();
      let key = '-patient-' + unitId + '-' + data.patientId;
      console.log(key);
      this.patientsArray.forEach(patient => {
        if (patient.admission.patientId == data.admission.patientId) {
          patient.admission = data.admission;
          patient.timeStamp = data.timeStamp;

        }
      })
      let patientFromDb = await this.getPatientByIdFromDb(data.admission.patientId);
      patientFromDb.admission = data.admission;
      patientFromDb.timeStamp = data.timeStamp;
      console.log('data.admission', data.admission)
      console.log('patientFromDb.admission', patientFromDb.admission)
      console.log('key', key)
      this.storage.set(key, patientFromDb)
      this.sortPatients()
    } else {
      let unitId = await this.getUnitId();
      let key = '-patient-' + unitId + '-' + data.patientId;
      console.log(key);
      this.patientsArray.forEach(patient => {
        if (patient.admission.patientId == data.patientId) {
          patient.admission = data;
          // patient.timeStamp = data.timeStamp;

        }
      })
      let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
      patientFromDb.admission = data;
      // patientFromDb.timeStamp = data.timeStamp;
      console.log('data.admission', data)
      console.log('patientFromDb.admission', patientFromDb.admission)
      console.log('key', key)
      this.storage.set(key, patientFromDb)
      this.sortPatients()
    }

  }

  

  async addObservation(data){

    if(data.observations){
    let unitId = await this.getUnitId();
    let key = '-patient-' + unitId + '-' + data.patientId;
    this.patientsArray.forEach(patient =>{
      if(patient.admission.patientId == data.admission.patientId){
        patient.observations = data.observations;
        patient.timeStamp = data.timeStamp;
        
      }
    })
    let patientFromDb = await this.getPatientByIdFromDb(data.admission.patientId);
    patientFromDb.observations = data.observations;
    patientFromDb.timeStamp = data.timeStamp;
    // console.log('data.admission', data.admission)
    // console.log('patientFromDb.admission', patientFromDb.admission)
    // console.log('key', key)
    this.storage.set(key, patientFromDb)
  } else {
    let unitId = await this.getUnitId();
    let key = '-patient-' + unitId + '-' + data.patientId;
    this.patientsArray.forEach(patient =>{
      if(patient.admission.patientId == data.patientId){
        console.log('patient.observations', patient.observations)
        if(patient.observations){
          patient.observations.push(data.data);
        } else {
          patient.observations = [data.data];
        }
        
        // patient.timeStamp = data.timeStamp;
        
      }
    })
    let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
    if(patientFromDb.observations){
      patientFromDb.observations.push(data.data);
    } else {
      patientFromDb.observations = [data.data];
    }
    
    // patientFromDb.timeStamp = data.timeStamp;
    // console.log('data.admission', data.admission)
    // console.log('patientFromDb.admission', patientFromDb.admission)
    // console.log('key', key)
    this.storage.set(key, patientFromDb)
  }

  

  }

  async updateObservation(data){
    console.log('##########################')
    let unitId = await this.getUnitId();
    let key = '-patient-' + unitId + '-' + data.patientId;
    this.patientsArray.forEach(patient =>{
      if(patient.admission.patientId == data.patientId){
        console.log('patient.observations', patient.observations)
        if(patient.observations){

          let _observations = patient.observations.map(item=>{
            if(item.obsId == data.data.obsId){
              // console.log('##########################')
              // console.log('pre ', ob)
              item = data.data;
              // console.log('OB has changed!')
              // console.log('##########################')
              // console.log('post ', ob)
            }
            return item
          })
          
          patient.observations = _observations;
        }
        
        // patient.timeStamp = data.timeStamp;
        
      }
    })
    let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
    if(patientFromDb.observations){
      let _observations = patientFromDb.observations.map(item=>{
        if(item.obsId == data.data.obsId){
          // console.log('##########################')
          // console.log('pre ', ob)
          item = data.data;
          // console.log('OB has changed!')
          // console.log('##########################')
          // console.log('post ', ob)
        }
        return item
      })
      patientFromDb.observations = _observations;
    } 
    
    // patientFromDb.timeStamp = data.timeStamp;
    // console.log('data.admission', data.admission)
    // console.log('patientFromDb.admission', patientFromDb.admission)
    // console.log('key', key)
    this.storage.set(key, patientFromDb)
  }

  async addInterventionPci(data){

    if(data.interventionpci){
      let unitId = await this.getUnitId();
      let key = '-patient-' + unitId + '-' + data.patientId;
      this.patientsArray.forEach(patient =>{
        if(patient.admission.patientId == data.admission.patientId){
          patient.interventionpci = data.interventionpci;
          patient.timeStamp = data.timeStamp;
          
        }
      })
      let patientFromDb = await this.getPatientByIdFromDb(data.admission.patientId);
      patientFromDb.interventionpci = data.interventionpci;
      patientFromDb.timeStamp = data.timeStamp;
      // console.log('data.admission', data.admission)
      // console.log('patientFromDb.admission', patientFromDb.admission)
      // console.log('key', key)
      this.storage.set(key, patientFromDb)
    } else {
      let unitId = await this.getUnitId();
      let key = '-patient-' + unitId + '-' + data.patientId;
      this.patientsArray.forEach(patient =>{
        if(patient.admission.patientId == data.patientId){
          patient.interventionpci = data.data;
          // patient.timeStamp = data.timeStamp;
          
        }
      })
      let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
      patientFromDb.interventionpci = data.data;
      // patientFromDb.timeStamp = data.timeStamp;
      // console.log('data.admission', data.admission)
      // console.log('patientFromDb.admission', patientFromDb.admission)
      // console.log('key', key)
      this.storage.set(key, patientFromDb)
    }
  }

  async updateInterventionPci(data) {

    
      let unitId = await this.getUnitId();
      let key = '-patient-' + unitId + '-' + data.patientId;
      console.log(key);
      this.patientsArray.forEach(patient => {
        if (patient.admission.patientId == data.patientId) {
          patient.interventionpci = data.data;
          // patient.timeStamp = data.timeStamp;

        }
      })
      let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
      patientFromDb.interventionpci = data.data;
      // patientFromDb.timeStamp = data.timeStamp;
      console.log('data.interventionpci', data.data)
      console.log('patientFromDb.interventionpci', patientFromDb.interventionpci)
      console.log('key', key)
      this.storage.set(key, patientFromDb)
    

  }

  async addThrombolysis(data){
    if(data.thrombolysis){

      let unitId = await this.getUnitId();
      let key = '-patient-' + unitId + '-' + data.patientId;
      this.patientsArray.forEach(patient =>{
        if(patient.admission.patientId == data.admission.patientId){
          patient.thrombolysis = data.thrombolysis;
          patient.timeStamp = data.timeStamp;
          
        }
      })
      let patientFromDb = await this.getPatientByIdFromDb(data.admission.patientId);
      patientFromDb.thrombolysis = data.thrombolysis;
      patientFromDb.timeStamp = data.timeStamp;
      // console.log('data.admission', data.admission)
      // console.log('patientFromDb.admission', patientFromDb.admission)
      // console.log('key', key)
      this.storage.set(key, patientFromDb)
    } else {
        let unitId = await this.getUnitId();
        let key = '-patient-' + unitId + '-' + data.patientId;
        this.patientsArray.forEach(patient =>{
          if(patient.admission.patientId == data.patientId){
            patient.thrombolysis = data.data;
            // patient.timeStamp = data.timeStamp;
            
          }
        })
        let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
        patientFromDb.thrombolysis = data.data;
        // patientFromDb.timeStamp = data.timeStamp;
        // console.log('data.admission', data.admission)
        // console.log('patientFromDb.admission', patientFromDb.admission)
        // console.log('key', key)
        this.storage.set(key, patientFromDb)
    }
  }

  async updateThrombolysis(data) {

    
      let unitId = await this.getUnitId();
      let key = '-patient-' + unitId + '-' + data.patientId;
      console.log(key);
      this.patientsArray.forEach(patient => {
        if (patient.admission.patientId == data.patientId) {
          patient.thrombolysis = data.data;
          // patient.timeStamp = data.timeStamp;

        }
      })
      let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
      patientFromDb.thrombolysis = data.data;
      // patientFromDb.timeStamp = data.timeStamp;
      console.log('data.thrombolysis', data.data)
      console.log('patientFromDb.thrombolysis', patientFromDb.thrombolysis)
      console.log('key', key)
      this.storage.set(key, patientFromDb)
    

  }

  async addPostOp(data){

    if(data.postOp){
        let unitId = await this.getUnitId();
        let key = '-patient-' + unitId + '-' + data.patientId;
        this.patientsArray.forEach(patient =>{
          if(patient.admission.patientId == data.admission.patientId){
            patient.postOp = data.postOp;
            patient.timeStamp = data.timeStamp;
            
          }
        })
        let patientFromDb = await this.getPatientByIdFromDb(data.admission.patientId);
        patientFromDb.postOp = data.postOp;
        patientFromDb.timeStamp = data.timeStamp;
        // console.log('data.admission', data.admission)
        // console.log('patientFromDb.admission', patientFromDb.admission)
        // console.log('key', key)
        this.storage.set(key, patientFromDb)
    } else {
      let unitId = await this.getUnitId();
        let key = '-patient-' + unitId + '-' + data.patientId;
        this.patientsArray.forEach(patient =>{
          if(patient.admission.patientId == data.patientId){
            

            if(patient.postOp){
              patient.postOp.push(data.data);
            } else {
              patient.postOp = [data.data];
            }
            // patient.timeStamp = data.timeStamp;
            
          }
        })
        let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
        
        if(patientFromDb.postOp){
          patientFromDb.postOp.push(data.data);
        } else {
          patientFromDb.postOp = [data.data];
        }
        // patientFromDb.timeStamp = data.timeStamp;
        // console.log('data.admission', data.admission)
        // console.log('patientFromDb.admission', patientFromDb.admission)
        // console.log('key', key)
        this.storage.set(key, patientFromDb)
    }
  }

  async updatePostOp(data){
    console.log('##########################')
    let unitId = await this.getUnitId();
    let key = '-patient-' + unitId + '-' + data.patientId;
    this.patientsArray.forEach(patient =>{
      if(patient.admission.patientId == data.patientId){
        console.log('patient.postOp', patient.postOp)
        if(patient.postOp){

          let _postOps = patient.postOp.map(item=>{
            if(item.postOpId == data.data.postOpId){
              // console.log('##########################')
              // console.log('pre ', ob)
              item = data.data;
              // console.log('OB has changed!')
              // console.log('##########################')
              // console.log('post ', ob)
            }
            return item
          })
          
          patient.postOp = _postOps;
        }
        
        // patient.timeStamp = data.timeStamp;
        
      }
    })
    let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
    if(patientFromDb.postOp){
      let _postOps = patientFromDb.postOp.map(item=>{
        if(item.postOpId == data.data.postOpId){
          // console.log('##########################')
          // console.log('pre ', ob)
          item = data.data;
          // console.log('OB has changed!')
          // console.log('##########################')
          // console.log('post ', ob)
        }
        return item
      })
      patientFromDb.postOp = _postOps;
    } 
    
    // patientFromDb.timeStamp = data.timeStamp;
    // console.log('data.admission', data.admission)
    // console.log('patientFromDb.admission', patientFromDb.admission)
    // console.log('key', key)
    this.storage.set(key, patientFromDb)
  }

  async addPostOpDay3(data){

    if(data.postOpday3){
        console.log('hit')
        let unitId = await this.getUnitId();
        let key = '-patient-' + unitId + '-' + data.patientId;
        this.patientsArray.forEach(patient =>{
          if(patient.admission.patientId == data.admission.patientId){
            patient.postOpday3 = data.postOpday3;
            patient.timeStamp = data.timeStamp;
            
          }
        })
        let patientFromDb = await this.getPatientByIdFromDb(data.admission.patientId);
        patientFromDb.postOpday3 = data.postOpday3;
        patientFromDb.timeStamp = data.timeStamp;
        console.log('data.postOpday3', data.postOpday3)
        // console.log('patientFromDb.admission', patientFromDb.admission)
        // console.log('key', key)
        this.storage.set(key, patientFromDb)
    } else {
        let unitId = await this.getUnitId();
        let key = '-patient-' + unitId + '-' + data.patientId;
        this.patientsArray.forEach(patient =>{
          if(patient.admission.patientId == data.patientId){
            patient.postOpday3 = data.data;
            // patient.timeStamp = data.timeStamp;
            
          }
        })
        let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
        patientFromDb.postOpday3 = data.data;
        // patientFromDb.timeStamp = data.timeStamp;
        // console.log('data.postOpday3', data.postOpday3)
        // console.log('patientFromDb.admission', patientFromDb.admission)
        // console.log('key', key)
        this.storage.set(key, patientFromDb)
    }
  }

  async updatePostOpDay3(data) {

    
      let unitId = await this.getUnitId();
      let key = '-patient-' + unitId + '-' + data.patientId;
      console.log(key);
      this.patientsArray.forEach(patient => {
        if (patient.admission.patientId == data.patientId) {
          patient.postOpday3 = data.data;
          // patient.timeStamp = data.timeStamp;

        }
      })
      let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
      patientFromDb.postOpday3 = data.data;
      // patientFromDb.timeStamp = data.timeStamp;
      console.log('data.postOpday3', data.data)
      console.log('patientFromDb.postOpday3', patientFromDb.postOpday3)
      console.log('key', key)
      this.storage.set(key, patientFromDb)
    

  }

  async addPostOpDay7(data){

    if(data.postOpday7){
        console.log('hit')
        let unitId = await this.getUnitId();
        let key = '-patient-' + unitId + '-' + data.patientId;
        this.patientsArray.forEach(patient =>{
          if(patient.admission.patientId == data.admission.patientId){
            patient.postOpday7 = data.postOpday7;
            patient.timeStamp = data.timeStamp;
            
          }
        })
        let patientFromDb = await this.getPatientByIdFromDb(data.admission.patientId);
        patientFromDb.postOpday7 = data.postOpday7;
        patientFromDb.timeStamp = data.timeStamp;
        console.log('data.postOpday7', data.postOpday7)
        // console.log('patientFromDb.admission', patientFromDb.admission)
        // console.log('key', key)
        this.storage.set(key, patientFromDb)
    } else {
        let unitId = await this.getUnitId();
        let key = '-patient-' + unitId + '-' + data.patientId;
        this.patientsArray.forEach(patient =>{
          if(patient.admission.patientId == data.patientId){
            patient.postOpday7 = data.data;
            // patient.timeStamp = data.timeStamp;
            
          }
        })
        let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
        patientFromDb.postOpday7 = data.data;
        // patientFromDb.timeStamp = data.timeStamp;
        // console.log('data.postOpday7', data.postOpday7)
        // console.log('patientFromDb.admission', patientFromDb.admission)
        // console.log('key', key)
        this.storage.set(key, patientFromDb)
    }
  }

  async updatePostOpDay7(data) {

    
      let unitId = await this.getUnitId();
      let key = '-patient-' + unitId + '-' + data.patientId;
      console.log(key);
      this.patientsArray.forEach(patient => {
        if (patient.admission.patientId == data.patientId) {
          patient.postOpday7 = data.data;
          // patient.timeStamp = data.timeStamp;

        }
      })
      let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
      patientFromDb.postOpday7 = data.data;
      // patientFromDb.timeStamp = data.timeStamp;
      console.log('data.postOpday7', data.data)
      console.log('patientFromDb.postOpday7', patientFromDb.postOpday7)
      console.log('key', key)
      this.storage.set(key, patientFromDb)
    

  }
  
  async addQol(data){

    if(data.qol){
        let unitId = await this.getUnitId();
        let key = '-patient-' + unitId + '-' + data.patientId;
        this.patientsArray.forEach(patient =>{
          if(patient.admission.patientId == data.admission.patientId){
            patient.qol = data.qol;
            patient.timeStamp = data.timeStamp;
            
          }
        })
        let patientFromDb = await this.getPatientByIdFromDb(data.admission.patientId);
        patientFromDb.qol = data.qol;
        patientFromDb.timeStamp = data.timeStamp;
        // console.log('data.admission', data.admission)
        // console.log('patientFromDb.admission', patientFromDb.admission)
        // console.log('key', key)
        this.storage.set(key, patientFromDb)
    } else {
      let unitId = await this.getUnitId();
        let key = '-patient-' + unitId + '-' + data.patientId;
        this.patientsArray.forEach(patient =>{
          if(patient.admission.patientId == data.patientId){
            

            if(patient.qol){
              patient.qol.push(data.data);
            } else {
              patient.qol = [data.data];
            }
            // patient.timeStamp = data.timeStamp;
            
          }
        })
        let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
        
        if(patientFromDb.qol){
          patientFromDb.qol.push(data.data);
        } else {
          patientFromDb.qol = [data.data];
        }
        // patientFromDb.timeStamp = data.timeStamp;
        // console.log('data.admission', data.admission)
        // console.log('patientFromDb.admission', patientFromDb.admission)
        // console.log('key', key)
        this.storage.set(key, patientFromDb)
    }
  }

  async updateQol(data){
    console.log('##########################')
    let unitId = await this.getUnitId();
    let key = '-patient-' + unitId + '-' + data.patientId;
    this.patientsArray.forEach(patient =>{
      if(patient.admission.patientId == data.patientId){
        console.log('patient.qol', patient.qol)
        if(patient.qol){

          let _qols = patient.qol.map(item=>{
            if(item.qolId == data.data.qolId){
              // console.log('##########################')
              // console.log('pre ', ob)
              item = data.data;
              // console.log('OB has changed!')
              // console.log('##########################')
              // console.log('post ', ob)
            }
            return item
          })
          
          patient.qol = _qols;
        }
        
        // patient.timeStamp = data.timeStamp;
        
      }
    })
    let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
    if(patientFromDb.qol){
      let _qols = patientFromDb.qol.map(item=>{
        if(item.qolId == data.data.qolId){
          // console.log('##########################')
          // console.log('pre ', ob)
          item = data.data;
          // console.log('OB has changed!')
          // console.log('##########################')
          // console.log('post ', ob)
        }
        return item
      })
      patientFromDb.qol = _qols;
    } 
    
    // patientFromDb.timeStamp = data.timeStamp;
    // console.log('data.admission', data.admission)
    // console.log('patientFromDb.admission', patientFromDb.admission)
    // console.log('key', key)
    this.storage.set(key, patientFromDb)
  }

  async addNotes(data){

    if(data.notes){
        let unitId = await this.getUnitId();
        let key = '-patient-' + unitId + '-' + data.patientId;
        this.patientsArray.forEach(patient =>{
          if(patient.admission.patientId == data.admission.patientId){
            patient.notes = data.notes;
            patient.timeStamp = data.timeStamp;
            
          }
        })
        let patientFromDb = await this.getPatientByIdFromDb(data.admission.patientId);
        patientFromDb.notes = data.notes;
        patientFromDb.timeStamp = data.timeStamp;
        // console.log('data.admission', data.admission)
        // console.log('patientFromDb.admission', patientFromDb.admission)
        // console.log('key', key)
        this.storage.set(key, patientFromDb)
    } else {
      let unitId = await this.getUnitId();
        let key = '-patient-' + unitId + '-' + data.patientId;
        this.patientsArray.forEach(patient =>{
          if(patient.admission.patientId == data.patientId){
            

            if(patient.notes){
              patient.notes.push(data.data);
            } else {
              patient.notes = [data.data];
            }
            // patient.timeStamp = data.timeStamp;
            
          }
        })
        let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
        
        if(patientFromDb.notes){
          patientFromDb.notes.push(data.data);
        } else {
          patientFromDb.notes = [data.data];
        }
        // patientFromDb.timeStamp = data.timeStamp;
        // console.log('data.admission', data.admission)
        // console.log('patientFromDb.admission', patientFromDb.admission)
        // console.log('key', key)
        this.storage.set(key, patientFromDb)
    }
  }

  async updateNotes(data){
    console.log('##########################')
    let unitId = await this.getUnitId();
    let key = '-patient-' + unitId + '-' + data.patientId;
    this.patientsArray.forEach(patient =>{
      if(patient.admission.patientId == data.patientId){
        console.log('patient.notes', patient.notes)
        if(patient.notes){

          let _notess = patient.notes.map(item=>{
            if(item.notesId == data.data.notesId){
              // console.log('##########################')
              // console.log('pre ', ob)
              item = data.data;
              // console.log('OB has changed!')
              // console.log('##########################')
              // console.log('post ', ob)
            }
            return item
          })
          
          patient.notes = _notess;
        }
        
        // patient.timeStamp = data.timeStamp;
        
      }
    })
    let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
    if(patientFromDb.notes){
      let _notess = patientFromDb.notes.map(item=>{
        if(item.notesId == data.data.notesId){
          // console.log('##########################')
          // console.log('pre ', ob)
          item = data.data;
          // console.log('OB has changed!')
          // console.log('##########################')
          // console.log('post ', ob)
        }
        return item
      })
      patientFromDb.notes = _notess;
    } 
    
    // patientFromDb.timeStamp = data.timeStamp;
    // console.log('data.admission', data.admission)
    // console.log('patientFromDb.admission', patientFromDb.admission)
    // console.log('key', key)
    this.storage.set(key, patientFromDb)
  }  

  async addIntraOp(data){

    if(data.intraOps){
        let unitId = await this.getUnitId();
        let key = '-patient-' + unitId + '-' + data.patientId;
        this.patientsArray.forEach(patient =>{
          if(patient.admission.patientId == data.admission.patientId){
            patient.intraOps = data.intraOps;
            patient.timeStamp = data.timeStamp;
            
          }
        })
        let patientFromDb = await this.getPatientByIdFromDb(data.admission.patientId);
        patientFromDb.intraOps = data.intraOps;
        patientFromDb.timeStamp = data.timeStamp;
        // console.log('data.admission', data.admission)
        // console.log('patientFromDb.admission', patientFromDb.admission)
        // console.log('key', key)
        this.storage.set(key, patientFromDb)
    } else {
      let unitId = await this.getUnitId();
        let key = '-patient-' + unitId + '-' + data.patientId;
        this.patientsArray.forEach(patient =>{
          if(patient.admission.patientId == data.patientId){
            
            // patient.timeStamp = data.timeStamp;
            if(patient.intraOps){
              patient.intraOps.push(data.data);
            } else {
              patient.intraOps = [data.data];
            }
            
          }
        })
        let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
        if(patientFromDb.intraOps){
          patientFromDb.intraOps.push(data.data);
        } else {
          patientFromDb.intraOps = [data.data];
        }
        
        // patientFromDb.timeStamp = data.timeStamp;
        // console.log('data.admission', data.admission)
        // console.log('patientFromDb.admission', patientFromDb.admission)
        // console.log('key', key)
        this.storage.set(key, patientFromDb)
    }
  }

  async updateIntraOp(data){
    console.log('##########################')
    let unitId = await this.getUnitId();
    let key = '-patient-' + unitId + '-' + data.patientId;
    console.log('KEY>>>>', key)
    this.patientsArray.forEach(patient =>{
      if(patient.admission.patientId == data.patientId){
        console.log('patient.intraOps', patient.intraOps)
        if(patient.intraOps){

          let _intraOps = patient.intraOps.map(item=>{
            if(item.intraOpId == data.data.intraOpId){
              console.log('##########################')
              // console.log('pre ', ob)
              item = data.data;
              // console.log('OB has changed!')
              // console.log('##########################')
              // console.log('post ', ob)
            }
            return item
          })
          
          patient.intraOps = _intraOps;
        }
        
        // patient.timeStamp = data.timeStamp;
        
      }
    })
    let patientFromDb = await this.getPatientByIdFromDb(data.patientId);
    if(patientFromDb.intraOps){
      let _intraOps = patientFromDb.intraOps.map(item=>{
        if(item.intraOpId == data.data.intraOpId){
          console.log('##########################')
          // console.log('pre ', ob)
          item = data.data;
          // console.log('OB has changed!')
          console.log('##########################')
          // console.log('post ', ob)
        }
        return item
      })
      patientFromDb.intraOps = _intraOps;
    } 
    
    // patientFromDb.timeStamp = data.timeStamp;
    // console.log('data.admission', data.admission)
    // console.log('patientFromDb.admission', patientFromDb.admission)
    // console.log('key', key)
    this.storage.set(key, patientFromDb)
  }

  

  

  getPatients(){
    return this.patientsArray;
  }

}