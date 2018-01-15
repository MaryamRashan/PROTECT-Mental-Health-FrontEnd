import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Content } from 'ionic-angular';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


import * as UUID from 'uuid/v1';

import { SocketProvider } from './../../providers/socket/socket';
import { DataProvider } from './../../providers/data/data';
import { SyncProvider } from '../../providers/sync/sync';

import { ListPage } from '../../pages/list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;

  public patients;

  constructor(public socket: SocketProvider, public data: DataProvider, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public sync : SyncProvider ) {
    window.setTimeout(()=>{
      // this.loadTestData()
      // this.removeTestData()
    }, 5000)
    
  }

  async removeTestData(){
    let testData = await this.data.getPatients()
    console.log(testData.length)
    if(testData.length > 0){
      testData.forEach((_item, _index)=>{
        // console.log(item)
        let item = _item;
        let index = _index;

        window.setTimeout(()=>{
          let dischargeData = {
            disId : UUID(),
            dischargeDate : '',
            dischargeTime : '',
            survivalStatus : '',
            dischargeDestination : '',
            lastReportedTropanin : '',
            aspirin : '',
            clopidogrel        : '',
            prasugrel     : '',
            ticagrelor     : '',
            unfractionatedHeparin       : '',
            lowMolecularWeightHeparin      : '',
            glycoproteinIIbInhibitors     : '',
            glycoproteinIIIbInhibitors      : '',
            bivalirudin      : '',
            fondaparinux      : '',
            warfarin      : '',
            none1      : '',
            cpr     : '',
            defibrillation        : '',
            stentThrombosis     : '',
            unplannedCriticalCareAdmission     : '',
            vasopressors       : '',
            none2      : '',
      
      
            timeStamp: new Date().getTime()
          }
          this.data.removePatient(item.patientId);
          this.sync.invokeSendDataThroughSocket(dischargeData, '-discharge-', item.patientId);
        }, 100 * index)

        
      }) 
    }
    
   }

  loadTestData(){
    for (let index = 1; index < 100; index++) {
      let admissionData = {
        patientId : UUID(),
        patientName: `test${index}`,
        cprGiven: {
          cpr : '',
          defibrillation : '',
          thrombolysis : '',
          vasoactiveDrugs : '',
          furosemide : '',
          ventilation : '',
          none : '',
        },
        gender: '',
        age: '',
        nic: '',
        contactNumber: '',
        dateOfHospitalArrival: '',
        timeOfHospitalArrival: '',
        bht: index,
        modeOfTransportation: '',
        transferredFrom: '',
        pciOrThrombolysis: '',
        raisedJvp: '',
        numberOfVasoDrugs: '',
        ecgReferral: '',
        dateOfFirstEcg: '',
        timeOfFirstEcg: '',
        admittedFor: '',
        analgesiaGiven: '',
        weight: '50',
        height: '100',
        timeStamp: new Date().getTime()
  
      }
      console.log(admissionData);
      this.data.saveNewPatient(admissionData);
      this.sync.invokeSendDataThroughSocket(admissionData, '-newAdmission-', admissionData.patientId)
      
    }
  }

  openModal1(characterNum) {
    
        let modal = this.modalCtrl.create(AddAdmissionModal, characterNum);
        modal.present();
      }

  connect(){
    // setInterval(()=>{
    //   this.socket.testRabbitmq()
    // },50000)
    
  }

  ionViewDidEnter()
  {
    console.log('ionViewDidEnter');
    this.content.resize();
  }

  ionViewDidLoad() {
    this.patients = this.data.getPatients();
  }

  addAdmission(){
    let obs = {charNum: 0};
    let modal = this.modalCtrl.create(AddAdmissionModal, obs);
    modal.present();
  
  }

  gotoIndividual(patient){
    this.navCtrl.push(ListPage, {
      first: patient
    })
  }

}

@Component({
  templateUrl: 'admission.html',
})
export class AddAdmissionModal {
  
  private admissionForm : FormGroup;
  

  constructor(public data: DataProvider ,public viewCtrl: ViewController, public formBuilder: FormBuilder, public modalCtrl: ModalController, public sync : SyncProvider  ) {
    
    this.admissionForm = this.formBuilder.group({
      patientName: [''],
      gender: [''],
      age: [''],
      nic: [''],
      contactNumber: [''],
      dateOfHospitalArrival: [''],
      timeOfHospitalArrival: [''],
      bht: [''],
      modeOfTransportation: [''],
      transferredFrom: [''],
      pciOrThrombolysis: [''],
      cprGiven: formBuilder.group({
        cpr     : [ false ],
        defibrillation        : [ false ],
        thrombolysis     : [ false ],
        vasoactiveDrugs     : [ false ],
        furosemide       : [ false ],
        ventilation      : [ false ],
        none      : [ false ]
     }),
      raisedJvp: [''],
      numberOfVasoDrugs: [''],
      ecgReferral: [''],
      dateOfFirstEcg: [''],
      timeOfFirstEcg: [''],
      analgesiaGiven: [''],
      admittedFor: [''],
    //   reinfarction: formBuilder.group({
    //     thrombosis     : [ false ],
    //     stentThrombosis      : [ false ]
    //  }),
      weight: [''],
      height: ['']
    });
    
  }

  dismiss(){
    if(this.admissionForm.dirty){
      this.saveAdmission();
      this.viewCtrl.dismiss();
    } else {
      this.viewCtrl.dismiss();
    }
    
  }

  saveAdmission(){
    let admissionData = {
      patientId : UUID(),
      patientName: this.admissionForm.value.patientName,
      cprGiven: {
        cpr : this.admissionForm.value.cprGiven.cpr,
        defibrillation : this.admissionForm.value.cprGiven.defibrillation,
        thrombolysis : this.admissionForm.value.cprGiven.thrombolysis,
        vasoactiveDrugs : this.admissionForm.value.cprGiven.vasoactiveDrugs,
        furosemide : this.admissionForm.value.cprGiven.furosemide,
        ventilation : this.admissionForm.value.cprGiven.ventilation,
        none : this.admissionForm.value.cprGiven.none,
      },
      gender: this.admissionForm.value.gender,
      age: this.admissionForm.value.age,
      nic: this.admissionForm.value.nic,
      contactNumber: this.admissionForm.value.contactNumber,
      dateOfHospitalArrival: this.admissionForm.value.dateOfHospitalArrival,
      timeOfHospitalArrival: this.admissionForm.value.timeOfHospitalArrival,
      bht: this.admissionForm.value.bht,
      modeOfTransportation: this.admissionForm.value.modeOfTransportation,
      transferredFrom: this.admissionForm.value.transferredFrom,
      pciOrThrombolysis: this.admissionForm.value.pciOrThrombolysis,
      raisedJvp: this.admissionForm.value.raisedJvp,
      numberOfVasoDrugs: this.admissionForm.value.numberOfVasoDrugs,
      ecgReferral: this.admissionForm.value.ecgReferral,
      dateOfFirstEcg: this.admissionForm.value.dateOfFirstEcg,
      timeOfFirstEcg: this.admissionForm.value.timeOfFirstEcg,
      admittedFor: this.admissionForm.value.admittedFor,
      analgesiaGiven: this.admissionForm.value.analgesiaGiven,
      weight: this.admissionForm.value.weight,
      height: this.admissionForm.value.height,
      timeStamp: new Date().getTime()

    }
    // console.log(admissionData);
    this.data.saveNewPatient(admissionData);
    this.sync.invokeSendDataThroughSocket(admissionData, '-newAdmission-', admissionData.patientId)
  }

  


}
