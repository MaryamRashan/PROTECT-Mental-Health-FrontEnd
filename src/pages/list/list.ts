import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Events } from 'ionic-angular';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DataProvider } from '../../providers/data/data';
import { SocketProvider } from '../../providers/socket/socket';
import { SyncProvider } from '../../providers/sync/sync';

import { HomePage } from '../../pages/home/home';

import * as UUID from 'uuid/v1';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  public passedPatient;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public event: Events) {
    console.log('constructuor() for list page ')
    this.passedPatient = navParams.get("first");
    console.log('passed patient is ',this.passedPatient);
    this.event.subscribe('-discharge-', ()=>{
      console.log('-discharge-')
      this.event.unsubscribe('-discharge-')
      this.navCtrl.setRoot(HomePage)
    })
  }

  openModal1() {

        let characterNum = {patient: this.passedPatient};

        let modal = this.modalCtrl.create(ModalContentPage1, characterNum);
        modal.present();
      }

  openModal2() { // Investigation List
        let characterNum = {patient: this.passedPatient};
        let modal = this.modalCtrl.create(ModalContentPage11, characterNum);
        modal.present();
      }

  openModal3() { // QOL list
      let characterNum = {patient: this.passedPatient};
        let modal = this.modalCtrl.create(ModalContentPage10, characterNum);
        modal.present();
      }

  openModal4() { // cormobiditiesandrisks

          let cormobiditiesandrisks;
          if(this.passedPatient.cormobiditiesandrisks){
            cormobiditiesandrisks = this.passedPatient.cormobiditiesandrisks
          } else {
            cormobiditiesandrisks = null;
          }
          let characterNum = {patient: this.passedPatient, cormobiditiesandrisks: cormobiditiesandrisks};

        let modal = this.modalCtrl.create(ModalContentPage4, characterNum);
        modal.present();
      }
  openModal5() { // intervention PCI
        let interventionPci;
        if(this.passedPatient.interventionpci){
          interventionPci = this.passedPatient.interventionpci
        } else {
          interventionPci = null;
        }
        let characterNum = {patient: this.passedPatient, interventionPci: interventionPci};

        let modal = this.modalCtrl.create(ModalContentPage5, characterNum);
        modal.present();
      }

  openModal6() { // thrombolysis

        let thrombolysis;
        if(this.passedPatient.thrombolysis){
          thrombolysis = this.passedPatient.thrombolysis
        } else {
          thrombolysis = null;
        }
        let characterNum = {patient: this.passedPatient, thrombolysis: thrombolysis};

        let modal = this.modalCtrl.create(ModalContentPage6, characterNum);
        modal.present();
      }

  openModal7() { // Discharge

    let characterNum = {patient: this.passedPatient};

        let modal = this.modalCtrl.create(ModalContentPage7, characterNum);
        modal.present();
      }

  openModal8() {
        let characterNum = {patient: this.passedPatient};
        let modal = this.modalCtrl.create(ModalContentPage9, characterNum);
        modal.present();
      }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}

@Component({
  templateUrl: 'admission.html',
})
export class ModalContentPage1 {

  private admissionForm : FormGroup;
  private patient;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public modalCtrl: ModalController, public navParams: NavParams, public data: DataProvider, public socket : SocketProvider, public sync : SyncProvider ) {
    this.patient = navParams.get("patient");
    console.log('patient inside the edit admission modal ', this.patient)

    this.admissionForm = this.formBuilder.group({
      patientName: [this.patient.admission.patientName],
      gender: [this.patient.admission.gender],
      age: [this.patient.admission.age],
      nic: [this.patient.admission.nic],
      contactNumber: [this.patient.admission.contactNumber],
      dateOfHospitalArrival: [this.patient.admission.dateOfHospitalArrival],
      timeOfHospitalArrival: [this.patient.admission.timeOfHospitalArrival],
      bht: [this.patient.admission.bht],
      modeOfTransportation: [this.patient.admission.modeOfTransportation],
      transferredFrom: [this.patient.admission.transferredFrom],
      pciOrThrombolysis: [this.patient.admission.pciOrThrombolysis],
      cprGiven: formBuilder.group({
        cpr     : [ this.patient.admission.cprGiven.cpr ],
        defibrillation        : [ this.patient.admission.cprGiven.defibrillation ],
        thrombolysis     : [ this.patient.admission.cprGiven.thrombolysis ],
        vasoactiveDrugs     : [ this.patient.admission.cprGiven.vasoactiveDrugs ],
        furosemide       : [ this.patient.admission.cprGiven.furosemide ],
        ventilation      : [ this.patient.admission.cprGiven.ventilation ],
        none      : [ this.patient.admission.cprGiven.none ]
     }),
      raisedJvp: [this.patient.admission.raisedJvp],
      numberOfVasoDrugs: [this.patient.admission.numberOfVasoDrugs],
      ecgReferral: [this.patient.admission.ecgReferral],
      dateOfFirstEcg: [this.patient.admission.dateOfFirstEcg],
      timeOfFirstEcg: [this.patient.admission.timeOfFirstEcg],
      analgesiaGiven: [this.patient.admission.analgesiaGiven],
      admittedFor: [this.patient.admission.admittedFor],
      // reinfarction: [this.patient.admission.reinfarction],
      weight: [this.patient.admission.weight],
      height: [this.patient.admission.height]
    });

  }

  dismiss(){
    if(this.admissionForm.dirty){
      this.viewCtrl.dismiss();
      this.saveEditAdmission();
    } else {
      this.viewCtrl.dismiss();
    }
    
  }

  saveEditAdmission(){
    let admission = {
      patientId : this.patient.patientId,
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
      // reinfarction: this.admissionForm.value.reinfarction,
      analgesiaGiven: this.admissionForm.value.analgesiaGiven,
      weight: this.admissionForm.value.weight,
      height: this.admissionForm.value.height,
      timeStamp: new Date().getTime()

    }

    this.patient.admission = admission;
    this.patient.timeStamp = new Date().getTime();
    this.data.updatePatient(this.patient, '-updateAdmission-');
    this.sync.invokeSendDataThroughSocket(admission, '-updateAdmission-', admission.patientId)
  }




}


@Component({
  templateUrl: 'investigation.html',
})
export class ModalContentPage2 { // Single Investigation

  private investigationForm : FormGroup;
  public patient;
  public investigation;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public navParams: NavParams, public data: DataProvider, public sync : SyncProvider) {

    this.patient = navParams.get("patient");
    this.investigation = navParams.get("investigation");

    

    if(this.investigation === null){
      this.investigationForm = this.formBuilder.group({
        investigationDate: [''],
        investigationTime: [''],
        wbc: [''],
        neutrophils: [''],
        lymphocytes: [''],
        platelets: [''],
        haemoglobin: [''],
        troponin: [''],
        serumCreatinine: [''],
        unitOfSerumCreatinine: ['']
  
      });
    } else {
      this.investigationForm = this.formBuilder.group({
        investigationDate: [this.investigation.investigationDate],
        investigationTime: [this.investigation.investigationTime],
        wbc: [this.investigation.wbc],
        neutrophils: [this.investigation.neutrophils],
        lymphocytes: [this.investigation.lymphocytes],
        platelets: [this.investigation.platelets],
        haemoglobin: [this.investigation.haemoglobin],
        troponin: [this.investigation.troponin],
        serumCreatinine: [this.investigation.serumCreatinine],
        unitOfSerumCreatinine: [this.investigation.unitOfSerumCreatinine],
  
      });
    }

  }

  dismiss(){
    // this.saveInvestigation().then(()=>{
    //   this.viewCtrl.dismiss();
    // })

    if(this.investigationForm.dirty){
      this.saveInvestigation().then(()=>{
        this.viewCtrl.dismiss();
      })
    } else {
      this.viewCtrl.dismiss();
    }
    
  }

  async saveInvestigation(){
    
        if ( !this.patient.investigations  && this.investigation === null){
          console.log('adding first investigation')
          let investigationTimeStamp = Date.parse((this.investigationForm.value.investigationDate + 'T'+this.investigationForm.value.investigationTime));
          let investi = {
            investigationId : UUID(),

            investigationDate: this.investigationForm.value.investigationDate,
            investigationTime: this.investigationForm.value.investigationTime,
            investigationTimeStamp : investigationTimeStamp,
            wbc: this.investigationForm.value.wbc,
            neutrophils: this.investigationForm.value.neutrophils,
            lymphocytes: this.investigationForm.value.lymphocytes,
            platelets: this.investigationForm.value.platelets,
            haemoglobin: this.investigationForm.value.haemoglobin,
            troponin: this.investigationForm.value.troponin,
            serumCreatinine: this.investigationForm.value.serumCreatinine,
            unitOfSerumCreatinine: this.investigationForm.value.unitOfSerumCreatinine,
            
            timeStamp: new Date().getTime()
          }

          console.log(investi);
          let investiArray = [];
          investiArray.push(investi);
          this.patient.investigations = investiArray;
          this.patient.timeStamp = new Date().getTime();
          this.data.updatePatient(this.patient, '-newInvesti-');
          this.sync.invokeSendDataThroughSocket(investi, '-newInvesti-', this.patient.patientId);
        }
    
        else if( this.patient.investigations.length > 0 && this.investigation === null){
          console.log('adding another investigation')
          let investigationTimeStamp = Date.parse((this.investigationForm.value.investigationDate + 'T'+this.investigationForm.value.investigationTime));
          let investi = {
            investigationId : UUID(),
            
            investigationDate: this.investigationForm.value.investigationDate,
            investigationTime: this.investigationForm.value.investigationTime,
            investigationTimeStamp : investigationTimeStamp,
            wbc: this.investigationForm.value.wbc,
            neutrophils: this.investigationForm.value.neutrophils,
            lymphocytes: this.investigationForm.value.lymphocytes,
            platelets: this.investigationForm.value.platelets,
            haemoglobin: this.investigationForm.value.haemoglobin,
            troponin: this.investigationForm.value.troponin,
            serumCreatinine: this.investigationForm.value.serumCreatinine,
            unitOfSerumCreatinine: this.investigationForm.value.unitOfSerumCreatinine,


            timeStamp: new Date().getTime()
          }
    
          this.patient.investigations.push(investi);
          this.patient.timeStamp = new Date().getTime();
          this.data.updatePatient(this.patient, '-newInvesti-');
          this.sync.invokeSendDataThroughSocket(investi, '-newInvesti-', this.patient.patientId);
        }
        else {
    
          console.log('editing investi')
          let investigationTimeStamp = Date.parse((this.investigationForm.value.investigationDate + 'T'+this.investigationForm.value.investigationTime));
    
          let investi = {
            investigationId : this.investigation.investigationId,

            investigationDate: this.investigationForm.value.investigationDate,
            investigationTime: this.investigationForm.value.investigationTime,
            investigationTimeStamp : investigationTimeStamp,
            wbc: this.investigationForm.value.wbc,
            neutrophils: this.investigationForm.value.neutrophils,
            lymphocytes: this.investigationForm.value.lymphocytes,
            platelets: this.investigationForm.value.platelets,
            haemoglobin: this.investigationForm.value.haemoglobin,
            troponin: this.investigationForm.value.troponin,
            serumCreatinine: this.investigationForm.value.serumCreatinine,
            unitOfSerumCreatinine: this.investigationForm.value.unitOfSerumCreatinine,
            
            timeStamp: new Date().getTime()
          }
    
          let filteredIndex;
    
          this.patient.investigations.forEach((element, index) => {
    
            if (element.investigationId == this.investigation.investigationId){
              filteredIndex = index;
              // console.log('save called for edit obs', element)
              // element = observation;
              // console.log('save called for edit obs')
    
              // console.log('save called for edit obs', element)
            }
    
          });
          console.log('save called for edit investigation', filteredIndex)
          // this.patient.oservations = editedObs;
          this.patient.investigations[filteredIndex] = investi;
          this.patient.timeStamp = new Date().getTime();
          this.data.updatePatient(this.patient, '-newInvesti-')
          this.sync.invokeSendDataThroughSocket(investi, '-updateInvesti-', this.patient.patientId);
        }
    
  }

}


@Component({
  templateUrl: 'qol.html',
})
export class ModalContentPage3 { //  single QOL

  private qolForm : FormGroup;
  public patient;
  public qol;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public navParams: NavParams, public data: DataProvider, public sync : SyncProvider) {

    this.patient = navParams.get("patient");
    this.qol = navParams.get("qol");

   

    if(this.qol === null){
      this.qolForm = this.formBuilder.group({
        mobilityEq1: [''],
        selfCareEq2: [''],
        usualActivities: [''],
        painDiscomfortEq4: [''],
        anxietyDepressionEq5: [''],
        howAboutYourHealthToday: [''],
        dressingYourself: [''],
        walkingIndoorsOnLevelGround: [''],
        showering: [''],
        climbingAHillOrAFligh: [''],
        gardeningVacuumingOrCar: [''],
        walkingMoreThanABlock: [''],
        runningOrJogging: [''],
        liftingOrMovingHeavyOb: [''],
        participatingInStrenuous: ['']
  
      });
    } else {
      this.qolForm = this.formBuilder.group({
        mobilityEq1: [this.qol.mobilityEq1],
        selfCareEq2: [this.qol.selfCareEq2],
        usualActivities: [this.qol.usualActivities],
        painDiscomfortEq4: [this.qol.painDiscomfortEq4],
        anxietyDepressionEq5: [this.qol.anxietyDepressionEq5],
        howAboutYourHealthToday: [this.qol.howAboutYourHealthToday],
        dressingYourself: [this.qol.dressingYourself],
        walkingIndoorsOnLevelGround: [this.qol.walkingIndoorsOnLevelGround],
        showering: [this.qol.showering],
        climbingAHillOrAFligh: [this.qol.climbingAHillOrAFligh],
        gardeningVacuumingOrCar: [this.qol.gardeningVacuumingOrCar],
        walkingMoreThanABlock: [this.qol.walkingMoreThanABlock],
        runningOrJogging: [this.qol.runningOrJogging],
        liftingOrMovingHeavyOb: [this.qol.liftingOrMovingHeavyOb],
        participatingInStrenuous: [this.qol.participatingInStrenuous]
  
      });
    }

  }

  dismiss(){
    // this.saveQol().then(()=>{
    //   this.viewCtrl.dismiss();
    // })

    if(this.qolForm.dirty){
      this.saveQol().then(()=>{
        this.viewCtrl.dismiss();
      })
    } else {
      this.viewCtrl.dismiss();
    }
    
  }

  async saveQol(){
    
        if ( !this.patient.qol  && this.qol === null){
          console.log('adding first qol')
          let qualityOfLife = {
            qolId : UUID(),

            mobilityEq1: this.qolForm.value.mobilityEq1,
            selfCareEq2: this.qolForm.value.selfCareEq2,
            usualActivities: this.qolForm.value.usualActivities,
            painDiscomfortEq4: this.qolForm.value.painDiscomfortEq4,
            anxietyDepressionEq5: this.qolForm.value.anxietyDepressionEq5,
            howAboutYourHealthToday: this.qolForm.value.howAboutYourHealthToday,
            dressingYourself: this.qolForm.value.dressingYourself,
            walkingIndoorsOnLevelGround: this.qolForm.value.walkingIndoorsOnLevelGround,
            showering: this.qolForm.value.showering,
            climbingAHillOrAFligh: this.qolForm.value.climbingAHillOrAFligh,
            gardeningVacuumingOrCar: this.qolForm.value.gardeningVacuumingOrCar,
            walkingMoreThanABlock: this.qolForm.value.walkingMoreThanABlock,
            runningOrJogging: this.qolForm.value.runningOrJogging,
            liftingOrMovingHeavyOb: this.qolForm.value.liftingOrMovingHeavyOb,
            participatingInStrenuous: this.qolForm.value.participatingInStrenuous,
            
            timeStamp: new Date().getTime()
          }

          console.log(qualityOfLife);
          let qolArray = [];
          qolArray.push(qualityOfLife);
          this.patient.qol = qolArray;
          this.patient.timeStamp = new Date().getTime();
          this.data.updatePatient(this.patient, '-newQualityOfLife-');
          this.sync.invokeSendDataThroughSocket(qualityOfLife, '-newQualityOfLife-', this.patient.patientId);
        }
    
        else if( this.patient.qol.length > 0 && this.qol === null){
          console.log('adding another qol')
          let qualityOfLife = {
            qolId : UUID(),
            mobilityEq1: this.qolForm.value.mobilityEq1,
            selfCareEq2: this.qolForm.value.selfCareEq2,
            usualActivities: this.qolForm.value.usualActivities,
            painDiscomfortEq4: this.qolForm.value.painDiscomfortEq4,
            anxietyDepressionEq5: this.qolForm.value.anxietyDepressionEq5,
            howAboutYourHealthToday: this.qolForm.value.howAboutYourHealthToday,
            dressingYourself: this.qolForm.value.dressingYourself,
            walkingIndoorsOnLevelGround: this.qolForm.value.walkingIndoorsOnLevelGround,
            showering: this.qolForm.value.showering,
            climbingAHillOrAFligh: this.qolForm.value.climbingAHillOrAFligh,
            gardeningVacuumingOrCar: this.qolForm.value.gardeningVacuumingOrCar,
            walkingMoreThanABlock: this.qolForm.value.walkingMoreThanABlock,
            runningOrJogging: this.qolForm.value.runningOrJogging,
            liftingOrMovingHeavyOb: this.qolForm.value.liftingOrMovingHeavyOb,
            participatingInStrenuous: this.qolForm.value.participatingInStrenuous,
            timeStamp: new Date().getTime()
          }
    
          this.patient.qol.push(qualityOfLife);
          this.patient.timeStamp = new Date().getTime();
          this.data.updatePatient(this.patient, '-newQualityOfLife-');
          this.sync.invokeSendDataThroughSocket(qualityOfLife, '-newQualityOfLife-', this.patient.patientId);
        }
        else {
    
          console.log('editing qol')
    
          let qualityOfLife = {
            qolId : this.qol.qolId,
            mobilityEq1: this.qolForm.value.mobilityEq1,
            selfCareEq2: this.qolForm.value.selfCareEq2,
            usualActivities: this.qolForm.value.usualActivities,
            painDiscomfortEq4: this.qolForm.value.painDiscomfortEq4,
            anxietyDepressionEq5: this.qolForm.value.anxietyDepressionEq5,
            howAboutYourHealthToday: this.qolForm.value.howAboutYourHealthToday,
            dressingYourself: this.qolForm.value.dressingYourself,
            walkingIndoorsOnLevelGround: this.qolForm.value.walkingIndoorsOnLevelGround,
            showering: this.qolForm.value.showering,
            climbingAHillOrAFligh: this.qolForm.value.climbingAHillOrAFligh,
            gardeningVacuumingOrCar: this.qolForm.value.gardeningVacuumingOrCar,
            walkingMoreThanABlock: this.qolForm.value.walkingMoreThanABlock,
            runningOrJogging: this.qolForm.value.runningOrJogging,
            liftingOrMovingHeavyOb: this.qolForm.value.liftingOrMovingHeavyOb,
            participatingInStrenuous: this.qolForm.value.participatingInStrenuous,
            timeStamp: new Date().getTime()
          }
    
          let filteredIndex;
    
          this.patient.qol.forEach((element, index) => {
    
            if (element.qolId == this.qol.qolId){
              filteredIndex = index;
              // console.log('save called for edit obs', element)
              // element = observation;
              // console.log('save called for edit obs')
    
              // console.log('save called for edit obs', element)
            }
    
          });
          console.log('save called for edit qol', filteredIndex)
          // this.patient.oservations = editedObs;
          this.patient.qol[filteredIndex] = qualityOfLife;
          this.patient.timeStamp = new Date().getTime();
          this.data.updatePatient(this.patient, '-newQualityOfLife-')
          this.sync.invokeSendDataThroughSocket(qualityOfLife, '-updateQualityOfLife-', this.patient.patientId);
        }
    
  }

}


@Component({
  templateUrl: 'cormobiditiesandriskfactors.html',
})
export class ModalContentPage4 { // cormobidities and risks

  private cormobiditiesAndRiskForm : FormGroup;
  public patient;
  public cormobiditiesandrisks;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public navParams: NavParams, public data: DataProvider, public sync : SyncProvider) {

    this.patient = navParams.get("patient");
    this.cormobiditiesandrisks = navParams.get("cormobiditiesandrisks");
    console.log(this.cormobiditiesandrisks)

    if (this.cormobiditiesandrisks == null){

      this.cormobiditiesAndRiskForm = this.formBuilder.group({

        corMobiditiesAndRiskFactors: formBuilder.group({
          angina     : [ false ],
          previousMi        : [ false ],
          previousCardiacSurgery     : [ false ],
          ckd     : [ false ],
          dialysisBefore       : [ false ],
          hypertention      : [ false ],
          stroke      : [ false ],
          diabetics      : [ false ],
          smoking      : [ false ],
          beetleChewing      : [ false ],
          dyslipidemia      : [ false ],
          noCormorbidities      : [ false ],
            }),
        familyHistory: formBuilder.group({
              cad     : [ false ],
              cvd        : [ false ],
              dm     : [ false ],
              ht     : [ false ],
              dvt       : [ false ],
              none      : [ false ]
            })


      });
    } else {
      this.cormobiditiesAndRiskForm = this.formBuilder.group({

        corMobiditiesAndRiskFactors: formBuilder.group({
          angina     : [ this.cormobiditiesandrisks.angina ],
          previousMi        : [ this.cormobiditiesandrisks.previousMi ],
          previousCardiacSurgery     : [ this.cormobiditiesandrisks.previousCardiacSurgery ],
          ckd     : [ this.cormobiditiesandrisks.ckd ],
          dialysisBefore       : [ this.cormobiditiesandrisks.dialysisBefore ],
          hypertention      : [ this.cormobiditiesandrisks.hypertention ],
          stroke      : [ this.cormobiditiesandrisks.stroke ],
          diabetics      : [ this.cormobiditiesandrisks.diabetics ],
          smoking      : [ this.cormobiditiesandrisks.smoking ],
          beetleChewing      : [ this.cormobiditiesandrisks.beetleChewing ],
          dyslipidemia      : [ this.cormobiditiesandrisks.dyslipidemia ],
          noCormorbidities      : [ this.cormobiditiesandrisks.noCormorbidities ],
            }),
        familyHistory: formBuilder.group({
              cad     : [ this.cormobiditiesandrisks.cad ],
              cvd        : [ this.cormobiditiesandrisks.cvd ],
              dm     : [ this.cormobiditiesandrisks.dm ],
              ht     : [ this.cormobiditiesandrisks.ht ],
              dvt       : [ this.cormobiditiesandrisks.dvt ],
              none      : [ this.cormobiditiesandrisks.none ]
            })


      });
    }



  }

  dismiss(){
    // this.saveCormobiditesAndRisks().then(()=>{
    //   this.viewCtrl.dismiss();
    // })

    if(this.cormobiditiesAndRiskForm.dirty){
      this.saveCormobiditesAndRisks().then(()=>{
        this.viewCtrl.dismiss();
      })
    } else {
      this.viewCtrl.dismiss();
    }
    
  }

  async saveCormobiditesAndRisks(){
    if(this.cormobiditiesandrisks == null){

              let cormboRisks = {
                cormobiditiesandrisksId: UUID(),

                angina     :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.angina ,
                previousMi        :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.previousMi ,
                previousCardiacSurgery     :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.previousCardiacSurgery ,
                ckd     :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.ckd ,
                dialysisBefore       :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.dialysisBefore ,
                hypertention      :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.hypertention ,
                stroke      :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.stroke ,
                diabetics      :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.diabetics ,
                smoking      :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.smoking ,
                beetleChewing      :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.beetleChewing ,
                dyslipidemia      :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.dyslipidemia ,
                noCormorbidities      :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.noCormorbidities ,


                    cad     :  this.cormobiditiesAndRiskForm.value.familyHistory.cad ,
                    cvd        :  this.cormobiditiesAndRiskForm.value.familyHistory.cvd ,
                    dm     :  this.cormobiditiesAndRiskForm.value.familyHistory.dm ,
                    ht     :  this.cormobiditiesAndRiskForm.value.familyHistory.ht ,
                    dvt       :  this.cormobiditiesAndRiskForm.value.familyHistory.dvt ,
                    none      :  this.cormobiditiesAndRiskForm.value.familyHistory.none,


                timeStamp: new Date().getTime()


              }
            this.patient.cormobiditiesandrisks = cormboRisks;
            this.patient.timeStamp = new Date().getTime();
            this.data.updatePatient(this.patient, '-newCormobiditiesAndRisks-');
            this.sync.invokeSendDataThroughSocket(cormboRisks, '-newCormobiditiesAndRisks-', this.patient.patientId);

          } else {

            let cormboRisks = {
              cormobiditiesandrisksId: this.cormobiditiesandrisks.cormobiditiesandrisksId,
              angina     :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.angina ,
              previousMi        :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.previousMi ,
              previousCardiacSurgery     :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.previousCardiacSurgery ,
              ckd     :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.ckd ,
              dialysisBefore       :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.dialysisBefore ,
              hypertention      :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.hypertention ,
              stroke      :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.stroke ,
              diabetics      :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.diabetics ,
              smoking      :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.smoking ,
              beetleChewing      :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.beetleChewing ,
              dyslipidemia      :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.dyslipidemia ,
              noCormorbidities      :  this.cormobiditiesAndRiskForm.value.corMobiditiesAndRiskFactors.noCormorbidities ,


                  cad     :  this.cormobiditiesAndRiskForm.value.familyHistory.cad ,
                  cvd        :  this.cormobiditiesAndRiskForm.value.familyHistory.cvd ,
                  dm     :  this.cormobiditiesAndRiskForm.value.familyHistory.dm ,
                  ht     :  this.cormobiditiesAndRiskForm.value.familyHistory.ht ,
                  dvt       :  this.cormobiditiesAndRiskForm.value.familyHistory.dvt ,
                  none      :  this.cormobiditiesAndRiskForm.value.familyHistory.none,

              timeStamp: new Date().getTime()


            }

            this.patient.cormobiditiesandrisks = cormboRisks;
            this.patient.timeStamp = new Date().getTime();
            this.data.updatePatient(this.patient, '-newCormobiditiesAndRisks-')
            this.sync.invokeSendDataThroughSocket(cormboRisks, '-updateCormobiditiesAndRisks-', this.patient.patientId);

          }

        }
  

}

@Component({
  templateUrl: 'interventionpci.html',
})
export class ModalContentPage5 { //intervention PCI

  private interventionPciForm : FormGroup;
  public patient;
  public interventionPci;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public navParams: NavParams, public data: DataProvider, public sync : SyncProvider) {

    this.patient = navParams.get("patient");
    this.interventionPci = navParams.get("interventionPci");
    console.log(this.interventionPci);

    if(this.interventionPci === null){
      this.interventionPciForm = this.formBuilder.group({

        dateOfPci: [''],
        timeOfPci: [''],
        dateOfCa: [''],
        timeOfCa: [''],
        coronaryAngiogramFindings: [''],
        numberOfStents: [''],
        typeOfStentOne: [''],
        sizeOfStentOne: [''],
        typeOfStentTwo: [''],
        sizeOfStentTwo: [''],
        typeOfStentThree: [''],
        sizeOfStentThree: [''],
       complications: formBuilder.group({
        noReflow     : [ false ],
        cva        : [ false ],
        tamponade     : [ false ],
        ventilation     : [ false ],
        pacemaker       : [ false ],
        cpr      : [ false ],
        defibrillation       : [ false ],
        vasopressors       : [ false ],
        bleeding       : [ false ]
      }),
        bleedingSite: [''],
        destinationFollowingPci: ['']

      });
    } else {

      this.interventionPciForm = this.formBuilder.group({

        dateOfPci: [this.interventionPci.dateOfPci],
        timeOfPci: [this.interventionPci.timeOfPci],
        dateOfCa: [this.interventionPci.dateOfCa],
        timeOfCa: [this.interventionPci.timeOfCa],
        coronaryAngiogramFindings: [this.interventionPci.coronaryAngiogramFindings],
        numberOfStents: [this.interventionPci.numberOfStents],
        typeOfStentOne: [this.interventionPci.typeOfStentOne],
        sizeOfStentOne: [this.interventionPci.sizeOfStentOne],
        typeOfStentTwo: [this.interventionPci.typeOfStentTwo],
        sizeOfStentTwo: [this.interventionPci.sizeOfStentTwo],
        typeOfStentThree: [this.interventionPci.typeOfStentThree],
        sizeOfStentThree: [this.interventionPci.sizeOfStentThree],
       complications: formBuilder.group({
        noReflow     : [ this.interventionPci.noReflow ],
        cva        : [ this.interventionPci.cva ],
        tamponade     : [ this.interventionPci.tamponade ],
        ventilation     : [ this.interventionPci.ventilation ],
        pacemaker       : [ this.interventionPci.pacemaker ],
        cpr      : [ this.interventionPci.cpr ],
        defibrillation       : [ this.interventionPci.defibrillation ],
        vasopressors       : [ this.interventionPci.vasopressors ],
        bleeding       : [ this.interventionPci.bleeding ]
      }),
        bleedingSite: [this.interventionPci.bleedingSite],
        destinationFollowingPci: [this.interventionPci.destinationFollowingPci]

      });

    }



  }

  dismiss(){
    // this.saveInterventionPci();
    // this.viewCtrl.dismiss();

    if(this.interventionPciForm.dirty){
      this.saveInterventionPci().then(()=>{
        this.viewCtrl.dismiss();
      })
    } else {
      this.viewCtrl.dismiss();
    }
  }

  async saveInterventionPci(){
    if(this.interventionPci === null){

        let interventionPci = {
          interventionPciId: UUID(),
          dateOfPci: this.interventionPciForm.value.dateOfPci,
          timeOfPci: this.interventionPciForm.value.timeOfPci,
          dateOfCa: this.interventionPciForm.value.dateOfCa,
          timeOfCa: this.interventionPciForm.value.timeOfCa,
          coronaryAngiogramFindings: this.interventionPciForm.value.coronaryAngiogramFindings,
          numberOfStents: this.interventionPciForm.value.numberOfStents,
          typeOfStentOne: this.interventionPciForm.value.typeOfStentOne,
          sizeOfStentOne: this.interventionPciForm.value.sizeOfStentOne,
          typeOfStentTwo: this.interventionPciForm.value.typeOfStentTwo,
          sizeOfStentTwo: this.interventionPciForm.value.sizeOfStentTwo,
          typeOfStentThree: this.interventionPciForm.value.typeOfStentThree,
          sizeOfStentThree: this.interventionPciForm.value.sizeOfStentThree,

          noReflow     : this.interventionPciForm.value.complications.noReflow ,
          cva        : this.interventionPciForm.value.complications.cva ,
          tamponade     : this.interventionPciForm.value.complications.tamponade ,
          ventilation     : this.interventionPciForm.value.complications.ventilation ,
          pacemaker       : this.interventionPciForm.value.complications.pacemaker ,
          cpr      : this.interventionPciForm.value.complications.cpr ,
          defibrillation       : this.interventionPciForm.value.complications.defibrillation ,
          vasopressors       : this.interventionPciForm.value.complications.vasopressors ,
          bleeding       :  this.interventionPciForm.value.complications.bleeding ,

          bleedingSite: this.interventionPciForm.value.bleedingSite,
          destinationFollowingPci: this.interventionPciForm.value.destinationFollowingPci,
          timeStamp: new Date().getTime()


        }
      this.patient.interventionpci = interventionPci;
      this.patient.timeStamp = new Date().getTime();
      this.data.updatePatient(this.patient, '-newInterventionPci-');
      this.sync.invokeSendDataThroughSocket(interventionPci, '-newInterventionPci-', this.patient.patientId);

    } else {

      let interventionPci = {
        interventionPciId: this.interventionPci.interventionPciId,
        dateOfPci: this.interventionPciForm.value.dateOfPci,
        timeOfPci: this.interventionPciForm.value.timeOfPci,
        dateOfCa: this.interventionPciForm.value.dateOfCa,
        timeOfCa: this.interventionPciForm.value.timeOfCa,
        coronaryAngiogramFindings: this.interventionPciForm.value.coronaryAngiogramFindings,
        numberOfStents: this.interventionPciForm.value.numberOfStents,
        typeOfStentOne: this.interventionPciForm.value.typeOfStentOne,
        sizeOfStentOne: this.interventionPciForm.value.sizeOfStentOne,
        typeOfStentTwo: this.interventionPciForm.value.typeOfStentTwo,
        sizeOfStentTwo: this.interventionPciForm.value.sizeOfStentTwo,
        typeOfStentThree: this.interventionPciForm.value.typeOfStentThree,
        sizeOfStentThree: this.interventionPciForm.value.sizeOfStentThree,

        noReflow     : this.interventionPciForm.value.complications.noReflow ,
        cva        : this.interventionPciForm.value.complications.cva ,
        tamponade     : this.interventionPciForm.value.complications.tamponade ,
        ventilation     : this.interventionPciForm.value.complications.ventilation ,
        pacemaker       : this.interventionPciForm.value.complications.pacemaker ,
        cpr      : this.interventionPciForm.value.complications.cpr ,
        defibrillation       : this.interventionPciForm.value.complications.defibrillation ,
        vasopressors       : this.interventionPciForm.value.complications.vasopressors ,
        bleeding       :  this.interventionPciForm.value.complications.bleeding ,

        bleedingSite: this.interventionPciForm.value.bleedingSite,
        destinationFollowingPci: this.interventionPciForm.value.destinationFollowingPci,
        timeStamp: new Date().getTime()


      }

      this.patient.interventionpci = interventionPci;
      this.patient.timeStamp = new Date().getTime();
      this.data.updatePatient(this.patient, '-newInterventionPci-')
      this.sync.invokeSendDataThroughSocket(interventionPci, '-updateInterventionPci-', this.patient.patientId);

    }

  }

}

@Component({
  templateUrl: 'thrombolysis.html',
})
export class ModalContentPage6 { // thrombolysis

  private thrombolysisForm : FormGroup;
  public patient;
  public thrombolysis;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public navParams: NavParams, public data: DataProvider, public sync : SyncProvider) {

    this.patient = navParams.get("patient");
    this.thrombolysis = navParams.get("thrombolysis");

    if (this.thrombolysis == null){
      this.thrombolysisForm = this.formBuilder.group({

        dateOfthrombolysis: [''],
        timeOfthrombolysis: [''],
        drugs: formBuilder.group({
          streptokinase     : [ false ],
          rTpa        : [ false ]
        }),
        ecgChanges: [''],
        complications: formBuilder.group({
        noReflow     : [ false ],
        cva        : [ false ],
        tamponade     : [ false ],
        ventilation     : [ false ],
        pacemaker       : [ false ],
        cpr      : [ false ],
        defibrillation       : [ false ],
        vasopressors       : [ false ],
        bleeding       : [ false ]
        }),
        bleedingType: ['']

      });
    } else {
      this.thrombolysisForm = this.formBuilder.group({

        dateOfthrombolysis: [this.thrombolysis.dateOfthrombolysis],
        timeOfthrombolysis: [this.thrombolysis.timeOfthrombolysis],
        drugs: formBuilder.group({
          streptokinase     : [ this.thrombolysis.streptokinase ],
          rTpa        : [ this.thrombolysis.rTpa ]
        }),
        ecgChanges: [this.thrombolysis.ecgChanges],
        complications: formBuilder.group({
        noReflow     : [ this.thrombolysis.noReflow ],
        cva        : [ this.thrombolysis.cva ],
        tamponade     : [ this.thrombolysis.tamponade ],
        ventilation     : [ this.thrombolysis.ventilation ],
        pacemaker       : [ this.thrombolysis.pacemaker ],
        cpr      : [ this.thrombolysis.cpr ],
        defibrillation       : [ this.thrombolysis.defibrillation ],
        vasopressors       : [ this.thrombolysis.vasopressors ],
        bleeding       : [ this.thrombolysis.bleeding ]
        }),
        bleedingType: [this.thrombolysis.bleedingType]
    })

  }



  }

  dismiss(){
    // this.saveThrombolysis().then(()=>{
    //   this.viewCtrl.dismiss();
    // })

    if(this.thrombolysisForm.dirty){
      this.saveThrombolysis().then(()=>{
        this.viewCtrl.dismiss();
      })
    } else {
      this.viewCtrl.dismiss();
    }

  }

  async saveThrombolysis(){
    if(this.thrombolysis === null){

              let thrombo = {
                thrombolysisId: UUID(),
                dateOfthrombolysis: this.thrombolysisForm.value.dateOfthrombolysis,
                timeOfthrombolysis: this.thrombolysisForm.value.timeOfthrombolysis,
                streptokinase     :  this.thrombolysisForm.value.drugs.streptokinase ,
                rTpa        : this.thrombolysisForm.value.drugs.rTpa,
                ecgChanges: this.thrombolysisForm.value.ecgChanges,
                noReflow     :  this.thrombolysisForm.value.complications.noReflow ,
                cva        :  this.thrombolysisForm.value.complications.cva ,
                tamponade     :  this.thrombolysisForm.value.complications.tamponade ,
                ventilation     :  this.thrombolysisForm.value.complications.ventilation ,
                pacemaker       :  this.thrombolysisForm.value.complications.pacemaker ,
                cpr      :  this.thrombolysisForm.value.complications.cpr ,
                defibrillation       :  this.thrombolysisForm.value.complications.defibrillation ,
                vasopressors       :  this.thrombolysisForm.value.complications.vasopressors ,
                bleeding       :  this.thrombolysisForm.value.complications.bleeding,
                bleedingType: this.thrombolysisForm.value.bleedingType,
                timeStamp: new Date().getTime()


              }
            this.patient.thrombolysis = thrombo;
            this.patient.timeStamp = new Date().getTime();
            this.data.updatePatient(this.patient, '-newThrombolysis-');
            this.sync.invokeSendDataThroughSocket(thrombo, '-newThrombolysis-', this.patient.patientId);

          } else {

            let thrombo = {
              thrombolysisId: this.thrombolysis.thrombolysisId,
              dateOfthrombolysis: this.thrombolysisForm.value.dateOfthrombolysis,
              timeOfthrombolysis: this.thrombolysisForm.value.timeOfthrombolysis,
              streptokinase     :  this.thrombolysisForm.value.drugs.streptokinase ,
              rTpa        : this.thrombolysisForm.value.drugs.rTpa,
              ecgChanges: this.thrombolysisForm.value.ecgChanges,
              noReflow     :  this.thrombolysisForm.value.complications.noReflow ,
              cva        :  this.thrombolysisForm.value.complications.cva ,
              tamponade     :  this.thrombolysisForm.value.complications.tamponade ,
              ventilation     :  this.thrombolysisForm.value.complications.ventilation ,
              pacemaker       :  this.thrombolysisForm.value.complications.pacemaker ,
              cpr      :  this.thrombolysisForm.value.complications.cpr ,
              defibrillation       :  this.thrombolysisForm.value.complications.defibrillation ,
              vasopressors       :  this.thrombolysisForm.value.complications.vasopressors ,
              bleeding       :  this.thrombolysisForm.value.complications.bleeding,
              bleedingType: this.thrombolysisForm.value.bleedingType,
              timeStamp: new Date().getTime()


            }

            this.patient.thrombolysis = thrombo;
            this.patient.timeStamp = new Date().getTime();
            this.data.updatePatient(this.patient, '-newThrombolysis-');
            this.sync.invokeSendDataThroughSocket(thrombo, '-updateThrombolysis-', this.patient.patientId);
            

          }
  }

}

@Component({
  templateUrl: 'discharge.html',
})
export class ModalContentPage7 { // Discharge

  private dischargeForm : FormGroup;
  public patient;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public navParams: NavParams, public data: DataProvider, public navCtrl: NavController, public event: Events, public sync : SyncProvider) {

    this.patient = navParams.get("patient");
    console.log('discharge', this.patient)

    this.dischargeForm = this.formBuilder.group({
      dischargeDate: [''],
      dischargeTime: [''],
      survivalStatus: [''],
      dischargeDestination: [''],
      // otherHospitalName: [''],
      // patientExperience: [''],
      // vasopressorsGiven: [''],
      lastReportedTropanin: [''],
      drugsOnDischarge: formBuilder.group({
        aspirin     : [ false ],
        clopidogrel        : [ false ],
        prasugrel     : [ false ],
        ticagrelor     : [ false ],
        unfractionatedHeparin       : [ false ],
        lowMolecularWeightHeparin      : [ false ],
        glycoproteinIIbInhibitors     : [ false ],
        glycoproteinIIIbInhibitors      : [ false ],
        bivalirudin      : [ false ],
        fondaparinux      : [ false ],
        warfarin      : [ false ],
        none      : [ false ]
     }),
     patientExperience: formBuilder.group({
      cpr     : [ false ],
      defibrillation        : [ false ],
      stentThrombosis     : [ false ],
      unplannedCriticalCareAdmission     : [ false ],
      vasopressors       : [ false ],
      none      : [ false ]
   })

    });

  }

  dismiss(){
    if(this.dischargeForm.dirty){
      this.saveDischarge().then(()=>{
        // this.navCtrl.setRoot(HomePage)
        // this.navCtrl.popToRoot()
        this.viewCtrl.dismiss().then(()=>{
          this.event.publish('-discharge-', {data:'patient discharged'})
          // this.navCtrl.setRoot(HomePage)
          // this.navCtrl.pop()
          
              });
      })
    } else {
      this.viewCtrl.dismiss()
    }
    
    
  }

  async saveDischarge(){
    let dischargeData = {
      disId : UUID(),
      dischargeDate : this.dischargeForm.value.dischargeDate,
      dischargeTime : this.dischargeForm.value.dischargeTime,
      survivalStatus : this.dischargeForm.value.survivalStatus,
      dischargeDestination : this.dischargeForm.value.dischargeDestination,
      lastReportedTropanin : this.dischargeForm.value.lastReportedTropanin,
      aspirin : this.dischargeForm.value.drugsOnDischarge.aspirin,
      clopidogrel        : this.dischargeForm.value.drugsOnDischarge.clopidogrel,
      prasugrel     : this.dischargeForm.value.drugsOnDischarge.prasugrel,
      ticagrelor     : this.dischargeForm.value.drugsOnDischarge.ticagrelor,
      unfractionatedHeparin       : this.dischargeForm.value.drugsOnDischarge.unfractionatedHeparin,
      lowMolecularWeightHeparin      : this.dischargeForm.value.drugsOnDischarge.lowMolecularWeightHeparin,
      glycoproteinIIbInhibitors     : this.dischargeForm.value.drugsOnDischarge.glycoproteinIIbInhibitors,
      glycoproteinIIIbInhibitors      : this.dischargeForm.value.drugsOnDischarge.glycoproteinIIIbInhibitors,
      bivalirudin      : this.dischargeForm.value.drugsOnDischarge.bivalirudin,
      fondaparinux      : this.dischargeForm.value.drugsOnDischarge.fondaparinux,
      warfarin      : this.dischargeForm.value.drugsOnDischarge.warfarin,
      none1      : this.dischargeForm.value.drugsOnDischarge.none,
      cpr     : this.dischargeForm.value.patientExperience.cpr,
      defibrillation        : this.dischargeForm.value.patientExperience.defibrillation,
      stentThrombosis     : this.dischargeForm.value.patientExperience.stentThrombosis,
      unplannedCriticalCareAdmission     : this.dischargeForm.value.patientExperience.unplannedCriticalCareAdmission,
      vasopressors       : this.dischargeForm.value.patientExperience.vasopressors,
      none2      : this.dischargeForm.value.patientExperience.none,


      timeStamp: new Date().getTime()
    }
    this.data.removePatient(this.patient.patientId);
    this.sync.invokeSendDataThroughSocket(dischargeData, '-discharge-', this.patient.patientId);
  }

}

@Component({
  templateUrl: 'observation.html',
})
export class ModalContentPage8 { // single observation

  private observationForm : FormGroup;
  public patient;
  public ob;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public modalCtrl: ModalController, public navParams: NavParams, public data: DataProvider, public sync : SyncProvider ) {

    this.patient = navParams.get("patient");
    this.ob = navParams.get("ob");
    console.log('patient inside the observation modal ', this.patient)
    console.log('ob inside the observation modal ', this.ob)

    if(this.ob === null){
      this.observationForm = this.formBuilder.group({
        obsDate: [''],
        obsTime: [''],
        bed: [''],
        sbp: [''],
        dbp: [''],
        saturation: [''],
        urineOutput: [''],
        urineOutputDuration: [''],
        fluidInput: [''],
        eye: [''],
        verbal: [''],
        motor: [''],
        pain: [''],
        wbc: [''],
        pcv: [''],
        crft: [''],
        hemoglobin: [''],
        sugar: [''],
        platelets: [''],
        respiratoryRate: [''],
        heartRate: [''],
        temperature: ['']

      });
    } else {
      this.observationForm = this.formBuilder.group({
        obsDate: [this.ob.obsDate],
        obsTime: [this.ob.obsTime],
        bed: [this.ob.bed],
        sbp: [this.ob.sbp],
        dbp: [this.ob.dbp],
        saturation: [this.ob.saturation],
        urineOutput: [this.ob.urineOutput],
        urineOutputDuration: [this.ob.urineOutputDuration],
        fluidInput: [this.ob.fluidInput],
        eye: [this.ob.eye],
        verbal: [this.ob.verbal],
        motor: [this.ob.motor],
        pain: [this.ob.pain],
        wbc: [this.ob.wbc],
        pcv: [this.ob.pcv],
        crft: [this.ob.crft],
        hemoglobin: [this.ob.hemoglobin],
        sugar: [this.ob.sugar],
        platelets: [this.ob.platelets],
        respiratoryRate: [this.ob.respiratoryRate],
        heartRate: [this.ob.heartRate],
        temperature: [this.ob.temperature]

      });
    }



  }

  dismiss(){
    // this.saveObservation().then(()=>{
    //   this.viewCtrl.dismiss();
    // });

    if(this.observationForm.dirty){
      this.saveObservation().then(()=>{
        this.viewCtrl.dismiss();
      })
    } else {
      this.viewCtrl.dismiss();
    }

  }

  async saveObservation(){

    if ( !this.patient.observations  && this.ob === null){
      console.log('adding first observation');
      let obsTimeStamp = Date.parse((this.observationForm.value.obsDate + 'T'+this.observationForm.value.obsTime));
      // console.log(Date.parse(obsTimeStamp));
      let observation = {
        obsId : UUID(),
        obsDate : this.observationForm.value.obsDate,
        obsTime : this.observationForm.value.obsTime,
        obsTimeStamp : obsTimeStamp,
        respiratoryRate : this.observationForm.value.respiratoryRate,
        heartRate :this.observationForm.value.heartRate,
        temperature : this.observationForm.value.temperature,
        bed : this.observationForm.value.bed,
        sbp : this.observationForm.value.sbp,
        dbp : this.observationForm.value.dbp,
        saturation : this.observationForm.value.saturation,
        urineOutput : this.observationForm.value.urineOutput,
        fluidInput : this.observationForm.value.fluidInput,
        urineOutputDuration : this.observationForm.value.urineOutputDuration,
        eye : this.observationForm.value.eye,
        verbal : this.observationForm.value.verbal,
        motor : this.observationForm.value.motor,
        pain : this.observationForm.value.pain,
        wbc : this.observationForm.value.wbc,
        hemoglobin : this.observationForm.value.hemoglobin,
        pcv : this.observationForm.value.pcv,
        crft : this.observationForm.value.crft,
        sugar : this.observationForm.value.sugar,
        platelets : this.observationForm.value.platelets,
        timeStamp: new Date().getTime()
      }
      let obsArray = [];
      obsArray.push(observation);
      this.patient.observations = obsArray;
      this.patient.timeStamp = new Date().getTime();
      this.data.updatePatient(this.patient, '-newObservation-');

      

      this.sync.invokeSendDataThroughSocket(observation, '-newObservation-', this.patient.patientId)

    }

    else if( this.patient.observations.length > 0 && this.ob === null){
      console.log('adding another observation')
      let obsTimeStamp = Date.parse((this.observationForm.value.obsDate + 'T'+this.observationForm.value.obsTime));
      let observation = {
        obsId : UUID(),
        obsDate : this.observationForm.value.obsDate,
        obsTime : this.observationForm.value.obsTime,
        obsTimeStamp : obsTimeStamp,
        respiratoryRate : this.observationForm.value.respiratoryRate,
        heartRate :this.observationForm.value.heartRate,
        temperature : this.observationForm.value.temperature,
        bed : this.observationForm.value.bed,
        sbp : this.observationForm.value.sbp,
        dbp : this.observationForm.value.dbp,
        saturation : this.observationForm.value.saturation,
        urineOutput : this.observationForm.value.urineOutput,
        fluidInput : this.observationForm.value.fluidInput,
        urineOutputDuration : this.observationForm.value.urineOutputDuration,
        eye : this.observationForm.value.eye,
        verbal : this.observationForm.value.verbal,
        motor : this.observationForm.value.motor,
        pain : this.observationForm.value.pain,
        wbc : this.observationForm.value.wbc,
        hemoglobin : this.observationForm.value.hemoglobin,
        pcv : this.observationForm.value.pcv,
        crft : this.observationForm.value.crft,
        sugar : this.observationForm.value.sugar,
        platelets : this.observationForm.value.platelets,
        timeStamp: new Date().getTime()
      }

      this.patient.observations.push(observation);
      this.patient.timeStamp = new Date().getTime();
      this.data.updatePatient(this.patient, '-newObservation-')
      this.sync.invokeSendDataThroughSocket(observation, '-newObservation-', this.patient.patientId)
    }
    else {

      console.log('editing observation')
      let obsTimeStamp = Date.parse((this.observationForm.value.obsDate + 'T'+this.observationForm.value.obsTime));

      let observation = {
        obsId : this.ob.obsId,
        obsDate : this.observationForm.value.obsDate,
        obsTime : this.observationForm.value.obsTime,
        obsTimeStamp : obsTimeStamp,
        respiratoryRate : this.observationForm.value.respiratoryRate,
        heartRate :this.observationForm.value.heartRate,
        temperature : this.observationForm.value.temperature,
        bed : this.observationForm.value.bed,
        sbp : this.observationForm.value.sbp,
        dbp : this.observationForm.value.dbp,
        saturation : this.observationForm.value.saturation,
        urineOutput : this.observationForm.value.urineOutput,
        fluidInput : this.observationForm.value.fluidInput,
        urineOutputDuration : this.observationForm.value.urineOutputDuration,
        eye : this.observationForm.value.eye,
        verbal : this.observationForm.value.verbal,
        motor : this.observationForm.value.motor,
        pain : this.observationForm.value.pain,
        wbc : this.observationForm.value.wbc,
        hemoglobin : this.observationForm.value.hemoglobin,
        pcv : this.observationForm.value.pcv,
        crft : this.observationForm.value.crft,
        sugar : this.observationForm.value.sugar,
        platelets : this.observationForm.value.platelets,
        timeStamp: new Date().getTime()
      }

      let filteredIndex;

      this.patient.observations.forEach((element, index) => {

        if (element.obsId == this.ob.obsId){
          filteredIndex = index;
          // console.log('save called for edit obs', element)
          // element = observation;
          // console.log('save called for edit obs')

          // console.log('save called for edit obs', element)
        }

      });
      console.log('save called for edit obs', filteredIndex)
      // this.patient.oservations = editedObs;
      this.patient.observations[filteredIndex] = observation;
      this.patient.timeStamp = new Date().getTime();
      this.data.updatePatient(this.patient, '-newObservation-')
      this.sync.invokeSendDataThroughSocket(observation, '-updateObservation-', this.patient.patientId)
    }

  }

  // openModal8(characterNum) {

  //   let modal = this.modalCtrl.create(ModalContentPage9, characterNum);
  //   modal.present();
  // }

}

@Component({
  templateUrl: 'observationlist.html',
})
export class ModalContentPage9 { // observation list

  private observationForm : FormGroup;
  public patient;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public modalCtrl: ModalController, public navParams: NavParams, public data: DataProvider ) {
    this.patient = navParams.get("patient");
    console.log('patient inside the observation list modal ', this.patient)

    // this.observationForm = this.formBuilder.group({
    //   dischargeDate: [''],
    //   dischargeTime: [''],
    //   survivalStatus: [''],
    //   dischargeDestination: [''],
    //   otherHospitalName: [''],
    //   patientExperience: [''],
    //   vasopressorsGiven: [''],
    //   lastReportedTropanin: [''],
    //   drugsOnDischarge: formBuilder.group({
    //     aspirin     : [ false ],
    //     clopidogrel        : [ false ],
    //     prasugrel     : [ false ],
    //     ticagrelor     : [ false ],
    //     unfractionatedHeparin       : [ false ],
    //     lowMolecularWeightHeparin      : [ false ],
    //     glycoproteinIIbInhibitors     : [ false ],
    //     glycoproteinIIIbInhibitors      : [ false ],
    //     bivalirudin      : [ false ],
    //     fondaparinux      : [ false ],
    //     warfarin      : [ false ],
    //     none      : [ false ]
    //  })

    // });

  }

  ionViewDidLoad() {
    this.sortObservations();
  }

  sortObservations(){
    if (this.patient.observations) {
      this.patient.observations.sort((a: any, b: any) => {
        if (a.obsTimeStamp < b.obsTimeStamp) {
          return -1;
        } else if (a.obsTimeStamp > b.obsTimeStamp) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  addObservation(){
    let obs = {patient: this.patient, ob: null};
    let modal = this.modalCtrl.create(ModalContentPage8, obs);
    modal.present();
  }

  editObservation(observation){
    let obs = {patient: this.patient, ob: observation};
    let modal = this.modalCtrl.create(ModalContentPage8, obs);
    modal.present();
  }
}

@Component({
  templateUrl: 'qollist.html',
})
export class ModalContentPage10 { // QOL list

  
  public patient;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public modalCtrl: ModalController, public navParams: NavParams, public data: DataProvider ) {
    this.patient = navParams.get("patient");
    console.log('patient inside the qol list modal ', this.patient)



  }

  ionViewDidLoad() {
    this.sortQol();
  }

  sortQol(){
    if (this.patient.qol) {
      this.patient.qol.sort((a: any, b: any) => {
        if (a.qolTimeStamp < b.qolTimeStamp) {
          return -1;
        } else if (a.qolTimeStamp > b.qolTimeStamp) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  addQol(){
    let qol = {patient: this.patient, qol: null};
    let modal = this.modalCtrl.create(ModalContentPage3, qol);
    modal.present();
  }

  editQol(qol){
    let data = {patient: this.patient, qol: qol};
    let modal = this.modalCtrl.create(ModalContentPage3, data);
    modal.present();
  }
}


@Component({
  templateUrl: 'investigationlist.html',
})
export class ModalContentPage11 { // Investigation list

  
  public patient;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public modalCtrl: ModalController, public navParams: NavParams, public data: DataProvider ) {
    this.patient = navParams.get("patient")
    console.log('patient inside the investigation list modal ', this.patient)
    
  }

  ionViewDidLoad() {
    this.sortInvestigations();
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  sortInvestigations(){
    if (this.patient.investigations) {
      this.patient.investigations.sort((a: any, b: any) => {
        if (a.investigationTimeStamp < b.investigationTimeStamp) {
          return -1;
        } else if (a.investigationTimeStamp > b.investigationTimeStamp) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  addInvestigation(){
    let investigation = {patient: this.patient, investigation: null};
    let modal = this.modalCtrl.create(ModalContentPage2, investigation);
    modal.present();
  }

  editInvestigation(investigation){
    let data = {patient: this.patient, investigation: investigation};
    let modal = this.modalCtrl.create(ModalContentPage2, data);
    modal.present();
  }
}