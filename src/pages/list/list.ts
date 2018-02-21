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
    console.log('passed patient is ', this.passedPatient);
    this.event.subscribe('-discharge-', () => {
      console.log('-discharge-')
      this.event.unsubscribe('-discharge-')
      this.navCtrl.setRoot(HomePage)
    })
  }

  openModal1() {

    let characterNum = { patient: this.passedPatient };

    let modal = this.modalCtrl.create(ModalContentPage1, characterNum);
    modal.present();
  }

  openModal2() { // intraOp List
    let characterNum = { patient: this.passedPatient };
    let modal = this.modalCtrl.create(ModalContentPage11, characterNum);
    modal.present();
  }

  openModal3() { // QOL list
    let characterNum = { patient: this.passedPatient };
    let modal = this.modalCtrl.create(ModalContentPage10, characterNum);
    modal.present();
  }

  openModal4() { // postopday1
    let postopday1;
    if (this.passedPatient.postopday1) {
      postopday1 = this.passedPatient.postopday1
    } else {
      postopday1 = null;
    }
    let characterNum = { patient: this.passedPatient, postopday1: postopday1 };

    let modal = this.modalCtrl.create(ModalContentPage4, characterNum);
    modal.present();
  }
  openModal5() { // intervention PCI
    let interventionPci;
    if (this.passedPatient.interventionpci) {
      interventionPci = this.passedPatient.interventionpci
    } else {
      interventionPci = null;
    }
    let characterNum = { patient: this.passedPatient, interventionPci: interventionPci };

    let modal = this.modalCtrl.create(ModalContentPage5, characterNum);
    modal.present();
  }

  openModal6() { // thrombolysis

    let thrombolysis;
    if (this.passedPatient.thrombolysis) {
      thrombolysis = this.passedPatient.thrombolysis
    } else {
      thrombolysis = null;
    }
    let characterNum = { patient: this.passedPatient, thrombolysis: thrombolysis };

    let modal = this.modalCtrl.create(ModalContentPage6, characterNum);
    modal.present();
  }

  openModal7() { // Discharge

    let characterNum = { patient: this.passedPatient };

    let modal = this.modalCtrl.create(ModalContentPage7, characterNum);
    modal.present();
  }

  openModal8() {
    let characterNum = { patient: this.passedPatient };
    let modal = this.modalCtrl.create(ModalContentPage9, characterNum);
    modal.present();
  }

   openModal9() { // postopday3
     let postopday3;
     if (this.passedPatient.postopday3) {
       postopday3 = this.passedPatient.postopday3
     } else {
       postopday3 = null;
     }
     let characterNum = { patient: this.passedPatient, postopday3: postopday3 };

     let modal = this.modalCtrl.create(ModalContentPage13, characterNum);
     modal.present();
} 

   openModal10() { // postopday7
     let postopday7;
     if (this.passedPatient.postopday7) {
       postopday7 = this.passedPatient.postopday7
     } else {
       postopday7 = null;
     }
     let characterNum = { patient: this.passedPatient, postopday7: postopday7 };

     let modal = this.modalCtrl.create(ModalContentPage14, characterNum);
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

  private admissionForm: FormGroup;
  private patient;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public modalCtrl: ModalController, public navParams: NavParams, public data: DataProvider, public socket: SocketProvider, public sync: SyncProvider) {
    this.patient = navParams.get("patient");
    console.log('patient inside the edit admission modal ', this.patient)

    this.admissionForm = this.formBuilder.group({
      patientName: [this.patient.admission.patientName],
      gender: [this.patient.admission.gender],
      admission_type: [this.patient.admission.admission_type],
      age: [this.patient.admission.age],
      pre_operative_hb: [this.patient.admission.pre_operative_hb],
      contactNumber: [this.patient.admission.contactNumber],
      admission_date: [this.patient.admission.admission_date],
      admission_report_date: [this.patient.admission.admission_report_date],
      bht: [this.patient.admission.bht],
      ward_number: [this.patient.admission.ward_number],
      transferredFrom: [this.patient.admission.transferredFrom],
      pciOrThrombolysis: [this.patient.admission.pciOrThrombolysis],
      cprGiven: formBuilder.group({
        cpr: [this.patient.admission.cprGiven.cpr],
        defibrillation: [this.patient.admission.cprGiven.defibrillation],
        thrombolysis: [this.patient.admission.cprGiven.thrombolysis],
        vasoactiveDrugs: [this.patient.admission.cprGiven.vasoactiveDrugs],
        furosemide: [this.patient.admission.cprGiven.furosemide],
        ventilation: [this.patient.admission.cprGiven.ventilation],
        none: [this.patient.admission.cprGiven.none]
      }),
      comorbidities: formBuilder.group({
        hiv: [this.patient.admission.comorbidities.hiv],
        none: [this.patient.admission.comorbidities.none],
        other: [this.patient.admission.comorbidities.other]
      }),  
      pre_operative_hb_avl: formBuilder.group({
        not_available: [this.patient.admission.comorbidities.not_available],
      }),  
      if_other_please_specify_comorbi: [this.patient.admission.if_other_please_specify_comorbi], 
      cd4: [this.patient.admission.cd4],
      feverad: [this.patient.admission.feverad],
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

  dismiss() {
    if (this.admissionForm.dirty) {
      this.viewCtrl.dismiss();
      this.saveEditAdmission();
    } else {
      this.viewCtrl.dismiss();
    }

  }

  saveEditAdmission() {
    let admission = {
      patientId: this.patient.patientId,
      patientName: this.admissionForm.value.patientName,
      cprGiven: {
        cpr: this.admissionForm.value.cprGiven.cpr,
        defibrillation: this.admissionForm.value.cprGiven.defibrillation,
        thrombolysis: this.admissionForm.value.cprGiven.thrombolysis,
        vasoactiveDrugs: this.admissionForm.value.cprGiven.vasoactiveDrugs,
        furosemide: this.admissionForm.value.cprGiven.furosemide,
        ventilation: this.admissionForm.value.cprGiven.ventilation,
        none: this.admissionForm.value.cprGiven.none,
      },
      pre_operative_hb_avl: {
        not_available: this.admissionForm.value.comorbidities.not_available,
      },
      comorbidities: {
        hiv: this.admissionForm.value.comorbidities.hiv,
        none: this.admissionForm.value.comorbidities.none,
        other: this.admissionForm.value.comorbidities.other,
      },
      if_other_please_specify_comorbi: this.admissionForm.value.if_other_please_specify_comorbi, 
      cd4: this.admissionForm.value.cd4,
      feverad: this.admissionForm.value.feverad,
      gender: this.admissionForm.value.gender,
      age: this.admissionForm.value.age,
      nic: this.admissionForm.value.nic,
      pre_operative_hb: this.admissionForm.value.pre_operative_hb,
      admission_type: this.admissionForm.value.admission_type,
      contactNumber: this.admissionForm.value.contactNumber,
      admission_date: this.admissionForm.value.admission_date,
      admission_report_date: this.admissionForm.value.admission_report_date,
      dateOfHospitalArrival: this.admissionForm.value.dateOfHospitalArrival,
      timeOfHospitalArrival: this.admissionForm.value.timeOfHospitalArrival,
      bht: this.admissionForm.value.bht,
      modeOfTransportation: this.admissionForm.value.modeOfTransportation,
      ward_number: this.admissionForm.value.ward_number,
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
  templateUrl: 'intraOp.html',
})
export class ModalContentPage2 { // Single IntraOp
  private intraOpForm : FormGroup;
  public patient;
  public intraOp;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public navParams: NavParams, public data: DataProvider, public sync : SyncProvider) {

    this.patient = navParams.get("patient");
    this.intraOp = navParams.get("intraOp");

    

    if(this.intraOp === null){
      this.intraOpForm = this.formBuilder.group({
        intraOpDate: [''],
        intraOpTime: [''],
        date_of_surgery: [''],
        surgical_details: [''],
        indication_for_surgery: [''],
        operative_findings: [''],
        the_perit_contam: [''],
        operative_approach: [''],
        specify_findings: [''],
        if_other_details: [''],
        operative_duration: [''],
        name_of_consultant: [''],
        name_of_registrar: [''],
        name_of_junior_doctor: [''],
        location_of_surgery: [''],
        gen_ana: [''],
        notes_intop: [''],
        blood_prod_transf: [''],
        type_blood_product: [''],
        units_transfused: [''],
        lowest_perioperative_hb: [''],
        complications_intraop: [''],
        intraOp_antibiotic_use: [''],
        name_intraOp_antibiotic: [''],
        if_other_please_specify: [''],
        name2_intraOp_antibiotic: [''],
        if_other_please_specify2: [''],
        name3_intraOp_antibiotic: [''],
        if_other_please_specify3: [''],
        complications_intraOp: formBuilder.group({
          icu_admission     : [ false ],
          conversion_laparotomy_from_laparoscopy        : [ false ],
          redo_laparoscopy_laparotomy     : [ false ],
          ct_scan_abdomen     : [ false ],
          abdominal_drain_insertion     : [ false ],
          no_complications     : [ false ],
            }),  
      });
    } else {
      this.intraOpForm = this.formBuilder.group({
        intraOpDate: [this.intraOp.intraOpDate],
        intraOpTime: [this.intraOp.intraOpTime],
        date_of_surgery: [this.intraOp.date_of_surgery],
        surgical_details: [this.intraOp.surgical_details],
        notes_intop: [this.intraOp.notes_intop],
        indication_for_surgery: [this.intraOp.indication_for_surgery],
        operative_findings: [this.intraOp.operative_findings],
        specify_findings: [this.intraOp.specify_findings],
        operative_approach: [this.intraOp.operative_approach],
        the_perit_contam: [this.intraOp.the_perit_contam],
        if_other_details: [this.intraOp.if_other_details],
        operative_duration: [this.intraOp.operative_duration],
        name_of_consultant: [this.intraOp.name_of_consultant],
        name_of_registrar: [this.intraOp.name_of_registrar],
        name_of_junior_doctor: [this.intraOp.name_of_junior_doctor],
        location_of_surgery: [this.intraOp.location_of_surgery],
        blood_prod_transf: [this.intraOp.blood_prod_transf],
        type_blood_product: [this.intraOp.type_blood_product],
        units_transfused: [this.intraOp.units_transfused],
        lowest_perioperative_hb: [this.intraOp.lowest_perioperative_hb],
        complications_intraop: [this.intraOp.complications_intraop],
        intraOp_antibiotic_use: [this.intraOp.intraOp_antibiotic_use],
        name_intraOp_antibiotic: [this.intraOp.name_intraOp_antibiotic],
        if_other_please_specify: [this.intraOp.if_other_please_specify],
        name2_intraOp_antibiotic: [this.intraOp.name2_intraOp_antibiotic],
        if_other_please_specify2: [this.intraOp.if_other_please_specify2],
        name3_intraOp_antibiotic: [this.intraOp.name3_intraOp_antibiotic],
        if_other_please_specify3: [this.intraOp.if_other_please_specify3],
        complications_intraOp: formBuilder.group({
          icu_admission     : [ this.intraOp.icu_admission ],
          conversion_laparotomy_from_laparoscopy        : [ this.intraOp.conversion_laparotomy_from_laparoscopy ],
          redo_laparoscopy_laparotomy     : [ this.intraOp.redo_laparoscopy_laparotomy ],
          ct_scan_abdomen     : [ this.intraOp.ct_scan_abdomen ],
          abdominal_drain_insertion     : [ this.intraOp.abdominal_drain_insertion ],
          no_complications     : [ this.intraOp.no_complications ],
        }),  
      });
    }

  }

  dismiss(){
    // this.saveIntraOp().then(()=>{
    //   this.viewCtrl.dismiss();
    // })
    if(this.intraOpForm.dirty){
      this.saveIntraOp().then(()=>{
        this.viewCtrl.dismiss();
      })
    } else {
      this.viewCtrl.dismiss();
    }
    
  }

  async saveIntraOp(){
    
        if ( !this.patient.intraOps  && this.intraOp === null){
          console.log('adding first intraOp')
          let intraOpTimeStamp = Date.parse((this.intraOpForm.value.intraOpDate + 'T'+this.intraOpForm.value.intraOpTime));
          let intOp = {
            intraOpId : UUID(),

        intraOpDate: this.intraOpForm.value.intraOpDate,
        intraOpTime: this.intraOpForm.value.intraOpTime,
        date_of_surgery: this.intraOpForm.value.date_of_surgery,
        surgical_details: this.intraOpForm.value.surgical_details,
        notes_intop: this.intraOpForm.value.notes_intop,
        indication_for_surgery: this.intraOpForm.value.indication_for_surgery,
        if_other_details: this.intraOpForm.value.if_other_details,
        operative_findings: this.intraOpForm.value.operative_findings,
        operative_approach: this.intraOpForm.value.operative_approach,
        specify_findings: this.intraOpForm.value.specify_findings,
        the_perit_contam: this.intraOpForm.value.the_perit_contam,
        intraOpTimeStamp: intraOpTimeStamp,
        operative_duration: this.intraOpForm.value.operative_duration,
        name_of_consultant: this.intraOpForm.value.name_of_consultant,
        name_of_registrar: this.intraOpForm.value.name_of_registrar,
        name_of_junior_doctor: this.intraOpForm.value.name_of_junior_doctor,
        location_of_surgery: this.intraOpForm.value.location_of_surgery,
        gen_ana: this.intraOpForm.value.operative_duration,
        blood_prod_transf: this.intraOpForm.value.blood_prod_transf,
        type_blood_product: this.intraOpForm.value.type_blood_product,
        units_transfused: this.intraOpForm.value.units_transfused,
        lowest_perioperative_hb: this.intraOpForm.value.lowest_perioperative_hb,
        complications_intraop: this.intraOpForm.value.complications_intraop,
        intraOp_antibiotic_use: this.intraOpForm.value.intraOp_antibiotic_use,
        name_intraOp_antibiotic: this.intraOpForm.value.name_intraOp_antibiotic,
        if_other_please_specify: this.intraOpForm.value.if_other_please_specify,
        name2_intraOp_antibiotic: this.intraOpForm.value.name2_intraOp_antibiotic,
        if_other_please_specify2: this.intraOpForm.value.if_other_please_specify2,
        icu_admission     :  this.intraOpForm.value.complications_intraOp.icu_admission ,
        conversion_laparotomy_from_laparoscopy        :  this.intraOpForm.value.complications_intraOp.conversion_laparotomy_from_laparoscopy ,
        redo_laparoscopy_laparotomy     :  this.intraOpForm.value.complications_intraOp.redo_laparoscopy_laparotomy ,
        ct_scan_abdomen     :  this.intraOpForm.value.complications_intraOp.ct_scan_abdomen ,            
        abdominal_drain_insertion     :  this.intraOpForm.value.complications_intraOp.abdominal_drain_insertion ,            
        no_complications     :  this.intraOpForm.value.complications_intraOp.no_complications ,                    
            timeStamp: new Date().getTime()
          }

          console.log(intOp);
          let intOpArray = [];
          intOpArray.push(intOp);
          this.patient.intraOps = intOpArray;
          this.patient.timeStamp = new Date().getTime();
          this.data.updatePatient(this.patient, '-newIntOp-');
          this.sync.invokeSendDataThroughSocket(intOp, '-newIntOp-', this.patient.patientId);
        }
    
        else if( this.patient.intraOps.length > 0 && this.intraOp === null){
          console.log('adding another intraOp')
          let intraOpTimeStamp = Date.parse((this.intraOpForm.value.intraOpDate + 'T'+this.intraOpForm.value.intraOpTime));
          let intOp = {
            intraOpId : UUID(),
            
        intraOpDate: this.intraOpForm.value.intraOpDate,
        intraOpTime: this.intraOpForm.value.intraOpTime,
        date_of_surgery: this.intraOpForm.value.date_of_surgery,
        surgical_details: this.intraOpForm.value.surgical_details,
        notes_intop: this.intraOpForm.value.notes_intop,
        indication_for_surgery: this.intraOpForm.value.indication_for_surgery,
        if_other_details: this.intraOpForm.value.if_other_details,
        operative_findings: this.intraOpForm.value.operative_findings,
        operative_approach: this.intraOpForm.value.operative_approach,
        the_perit_contam: this.intraOpForm.value.the_perit_contam,
        specify_findings: this.intraOpForm.value.specify_findings,
        intraOpTimeStamp: intraOpTimeStamp,
        operative_duration: this.intraOpForm.value.operative_duration,
        name_of_consultant: this.intraOpForm.value.name_of_consultant,
        name_of_registrar: this.intraOpForm.value.name_of_registrar,
        name_of_junior_doctor: this.intraOpForm.value.name_of_junior_doctor,
        location_of_surgery: this.intraOpForm.value.location_of_surgery,
        gen_ana: this.intraOpForm.value.gen_ana,
        blood_prod_transf: this.intraOpForm.value.blood_prod_transf,
        type_blood_product: this.intraOpForm.value.type_blood_product,
        units_transfused: this.intraOpForm.value.units_transfused,
        lowest_perioperative_hb: this.intraOpForm.value.lowest_perioperative_hb,
        complications_intraop: this.intraOpForm.value.complications_intraop,
        intraOp_antibiotic_use: this.intraOpForm.value.intraOp_antibiotic_use,
        name_intraOp_antibiotic: this.intraOpForm.value.name_intraOp_antibiotic,
        if_other_please_specify: this.intraOpForm.value.if_other_please_specify,
        name2_intraOp_antibiotic: this.intraOpForm.value.name2_intraOp_antibiotic,
        if_other_please_specify2: this.intraOpForm.value.if_other_please_specify2,
        name3_intraOp_antibiotic: this.intraOpForm.value.name3_intraOp_antibiotic,
        if_other_please_specify3: this.intraOpForm.value.if_other_please_specify3,
        icu_admission     :  this.intraOpForm.value.complications_intraOp.icu_admission ,
        conversion_laparotomy_from_laparoscopy        :  this.intraOpForm.value.complications_intraOp.conversion_laparotomy_from_laparoscopy ,
        redo_laparoscopy_laparotomy     :  this.intraOpForm.value.complications_intraOp.redo_laparoscopy_laparotomy ,
        ct_scan_abdomen     :  this.intraOpForm.value.complications_intraOp.ct_scan_abdomen ,
        abdominal_drain_insertion     :  this.intraOpForm.value.complications_intraOp.abdominal_drain_insertion ,
        no_complications     :  this.intraOpForm.value.complications_intraOp.no_complications ,

            timeStamp: new Date().getTime()
          }
    
          this.patient.intraOps.push(intOp);
          this.patient.timeStamp = new Date().getTime();
          this.data.updatePatient(this.patient, '-newIntOp-');
          this.sync.invokeSendDataThroughSocket(intOp, '-newIntOp-', this.patient.patientId);
        }
        else {
    
          console.log('editing intOp')
          let intraOpTimeStamp = Date.parse((this.intraOpForm.value.intraOpDate + 'T'+this.intraOpForm.value.intraOpTime));
    
          let intOp = {
            intraOpId : this.intraOp.intraOpId,

        intraOpDate: this.intraOpForm.value.intraOpDate,
        intraOpTime: this.intraOpForm.value.intraOpTime,
        date_of_surgery: this.intraOpForm.value.date_of_surgery,
        surgical_details: this.intraOpForm.value.surgical_details,
        notes_intop: this.intraOpForm.value.notes_intop,
        indication_for_surgery: this.intraOpForm.value.indication_for_surgery,
        if_other_details: this.intraOpForm.value.if_other_details,
        operative_findings: this.intraOpForm.value.operative_findings,
        operative_approach: this.intraOpForm.value.operative_approach,
        the_perit_contam: this.intraOpForm.value.the_perit_contam,
        specify_findings: this.intraOpForm.value.specify_findings,
        intraOpTimeStamp: intraOpTimeStamp,
        operative_duration: this.intraOpForm.value.operative_duration,
        name_of_consultant: this.intraOpForm.value.name_of_consultant,
        name_of_registrar: this.intraOpForm.value.name_of_registrar,
        name_of_junior_doctor: this.intraOpForm.value.name_of_junior_doctor,
        location_of_surgery: this.intraOpForm.value.location_of_surgery,
        gen_ana: this.intraOpForm.value.gen_ana,
        blood_prod_transf: this.intraOpForm.value.blood_prod_transf,
        type_blood_product: this.intraOpForm.value.type_blood_product,
        units_transfused: this.intraOpForm.value.units_transfused,
        lowest_perioperative_hb: this.intraOpForm.value.lowest_perioperative_hb,
        intraOp_antibiotic_use: this.intraOpForm.value.intraOp_antibiotic_use,
        name_intraOp_antibiotic: this.intraOpForm.value.name_intraOp_antibiotic,
        if_other_please_specify: this.intraOpForm.value.if_other_please_specify,
        name2_intraOp_antibiotic: this.intraOpForm.value.name2_intraOp_antibiotic,
        if_other_please_specify2: this.intraOpForm.value.if_other_please_specify2,
        name3_intraOp_antibiotic: this.intraOpForm.value.name3_intraOp_antibiotic,
        if_other_please_specify3: this.intraOpForm.value.if_other_please_specify3,
        icu_admission     :  this.intraOpForm.value.complications_intraOp.icu_admission ,
        conversion_laparotomy_from_laparoscopy        :  this.intraOpForm.value.complications_intraOp.conversion_laparotomy_from_laparoscopy ,
        redo_laparoscopy_laparotomy     :  this.intraOpForm.value.complications_intraOp.redo_laparoscopy_laparotomy ,
        ct_scan_abdomen     :  this.intraOpForm.value.complications_intraOp.ct_scan_abdomen ,
        abdominal_drain_insertion     :  this.intraOpForm.value.complications_intraOp.abdominal_drain_insertion ,
        no_complications     :  this.intraOpForm.value.complications_intraOp.no_complications ,   
            timeStamp: new Date().getTime()
          }
    
          let filteredIndex;
    
          this.patient.intraOps.forEach((element, index) => {
    
            if (element.intraOpId == this.intraOp.intraOpId){
              filteredIndex = index;
              // console.log('save called for edit obs', element)
              // element = observation;
              // console.log('save called for edit obs')
    
              // console.log('save called for edit obs', element)
            }
    
          });
          console.log('save called for edit intraOp', filteredIndex)
          // this.patient.oservations = editedObs;
          this.patient.intraOps[filteredIndex] = intOp;
          this.patient.timeStamp = new Date().getTime();
          this.data.updatePatient(this.patient, '-newIntOp-')
          this.sync.invokeSendDataThroughSocket(intOp, '-updateintOp-', this.patient.patientId);
        }
    
  }

}


@Component({
  templateUrl: 'qol.html',
})
export class ModalContentPage3 { //  single QOL

  private qolForm: FormGroup;
  public patient;
  public qol;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public navParams: NavParams, public data: DataProvider, public sync: SyncProvider) {

    this.patient = navParams.get("patient");
    this.qol = navParams.get("qol");



    if (this.qol === null) {
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

  dismiss() {
    // this.saveQol().then(()=>{
    //   this.viewCtrl.dismiss();
    // })

    if (this.qolForm.dirty) {
      this.saveQol().then(() => {
        this.viewCtrl.dismiss();
      })
    } else {
      this.viewCtrl.dismiss();
    }

  }

  async saveQol() {

    if (!this.patient.qol && this.qol === null) {
      console.log('adding first qol')
      let qualityOfLife = {
        qolId: UUID(),

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

    else if (this.patient.qol.length > 0 && this.qol === null) {
      console.log('adding another qol')
      let qualityOfLife = {
        qolId: UUID(),
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
        qolId: this.qol.qolId,
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

        if (element.qolId == this.qol.qolId) {
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
  templateUrl: 'postOpDay1.html',
})
export class ModalContentPage4 { // cormobidities and risks
  private postOpDay1Form : FormGroup;
  public patient;
  public postopday1;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public navParams: NavParams, public data: DataProvider, public sync : SyncProvider) {

    this.patient = navParams.get("patient");
    this.postopday1 = navParams.get("postopday1");
    console.log(this.postopday1)

    if (this.postopday1 == null){

      this.postOpDay1Form = this.formBuilder.group({
        postop_day1_report_date: [''],
        postop_day1_report_time: [''],
        icu_admission: [''],
        notes_pod1: [''],
        cprExperienced: [''],
        hb_level: [''],
        wound_infection: [''],
        feeding: [''],
        bowels: [''],
        hb_avl: formBuilder.group({
          not_available     : [ false ],
            }),
        poms_score_day1: formBuilder.group({
          pulmonary     : [ false ],
          infections        : [ false ],
          renal     : [ false ],
          gastrointestinal     : [ false ],
          cardiovascular       : [ false ],
          neurological      : [ false ],
          haematological      : [ false ],
          redo_laparoscopy_laparotomy      : [ false ],
          pain      : [ false ],
        change_antibiotics_day1: formBuilder.group({
          added     : [ false ],
          omitted        : [ false ],
          no_change     : [ false ],
            }),
            antibiotics_omit_day1: [''],        
            name_of_antibiotic_omm: [''],        
            if_other_please_specifyomit: [''],
            date_antibiotic_omitted: [''],
            name_of_antibiotic_omm2: [''],                
            if_other_please_specifyomit2: [''],
            date_antibiotic_omitted2: [''],
            name_of_antibiotic: [''],        
            if_other_please_specify: [''],
            name2_of_antibiotic: [''],  
            if_other_please_specify2: [''],
            name3_of_antibiotic: [''],              
            if_other_please_specify3: [''],
    
          }),



      });
    } else {
      this.postOpDay1Form = this.formBuilder.group({
        postop_day1_report_date: [this.postopday1.postop_day1_report_date],
        postop_day1_report_time: [this.postopday1.postop_day1_report_time],
        icu_admission: [this.postopday1.icu_admission],
        notes_pod1: [this.postopday1.notes_pod1],
        cprExperienced: [this.postopday1.cprExperienced],
        hb_level: [this.postopday1.hb_level],
        wound_infection: [this.postopday1.wound_infection],
        feeding: [this.postopday1.feeding],
        bowels: [this.postopday1.bowels],
        hb_avl: formBuilder.group({
          not_available     : [ this.postopday1.not_available ],
          }),
        poms_score_day1: formBuilder.group({
          pulmonary     : [ this.postopday1.pulmonary ],
          infections        : [ this.postopday1.infections ],
          renal     : [ this.postopday1.renal ],
          gastrointestinal     : [ this.postopday1.gastrointestinal ],
          cardiovascular       : [ this.postopday1.cardiovascular ],
          neurological      : [ this.postopday1.neurological ],
          haematological      : [ this.postopday1.haematological ],
          redo_laparoscopy_laparotomy      : [ this.postopday1.redo_laparoscopy_laparotomy ],
          pain      : [ this.postopday1.pain ],
          beetleChewing      : [ this.postopday1.beetleChewing ],
          dyslipidemia      : [ this.postopday1.dyslipidemia ],
          noCormorbidities      : [ this.postopday1.noCormorbidities ],
        change_antibiotics_day1: formBuilder.group({
            added     : [ this.postopday1.added ],
            omitted        : [ this.postopday1.omitted ],
            no_change     : [ this.postopday1.no_change ],
            }),
            name_of_antibiotic_omm: [this.postopday1.name_of_antibiotic_omm],
            if_other_please_specifyomit: [this.postopday1.if_other_please_specifyomit],
            date_antibiotic_omitted: [this.postopday1.date_antibiotic_omitted],
            name_of_antibiotic_omm2: [this.postopday1.name_of_antibiotic_omm2],
            if_other_please_specifyomit2: [this.postopday1.if_other_please_specifyomit2],
            date_antibiotic_omitted2: [this.postopday1.date_antibiotic_omitted2],
            antibiotics_omit_day1: [this.postopday1.antibiotics_omit_day1],
            name_of_antibiotic: [this.postopday1.name_of_antibiotic_omm],
            if_other_please_specify: [this.postopday1.if_other_please_specify],
            name2_of_antibiotic: [this.postopday1.name2_of_antibiotic],
            if_other_please_specify2: [this.postopday1.if_other_please_specify2],
            name3_of_antibiotic: [this.postopday1.name1_of_antibiotic],
            if_other_please_specify3: [this.postopday1.if_other_please_specify3],
    
          }),



      });
    }



  }

  dismiss(){
    // this.savePostOpDay1().then(()=>{
    //   this.viewCtrl.dismiss();
    // })
    if(this.postOpDay1Form.dirty){
      this.savePostOpDay1().then(()=>{
        this.viewCtrl.dismiss();
      })
    } else {
      this.viewCtrl.dismiss();
    }
    
  }

  async savePostOpDay1(){
    if(this.postopday1 == null){

              let postOp1 = {
                postopday1ID: UUID(),
                postop_day1_report_date: this.postOpDay1Form.value.postop_day1_report_date,
                postop_day1_report_time: this.postOpDay1Form.value.postop_day1_report_time,
                icu_admission: this.postOpDay1Form.value.icu_admission,
                notes_pod1: this.postOpDay1Form.value.notes_pod1,
                cprExperienced: this.postOpDay1Form.value.cprExperienced,
                wound_infection: this.postOpDay1Form.value.wound_infection,
                feeding: this.postOpDay1Form.value.feeding,
                bowels: this.postOpDay1Form.value.bowels,

                pulmonary     :  this.postOpDay1Form.value.poms_score_day1.pulmonary ,
                infections        :  this.postOpDay1Form.value.poms_score_day1.infections ,
                renal     :  this.postOpDay1Form.value.poms_score_day1.renal ,
                gastrointestinal     :  this.postOpDay1Form.value.poms_score_day1.gastrointestinal ,
                cardiovascular       :  this.postOpDay1Form.value.poms_score_day1.cardiovascular ,
                neurological      :  this.postOpDay1Form.value.poms_score_day1.neurological ,
                haematological      :  this.postOpDay1Form.value.poms_score_day1.haematological ,
                redo_laparoscopy_laparotomy      :  this.postOpDay1Form.value.poms_score_day1.redo_laparoscopy_laparotomy ,
                pain      :  this.postOpDay1Form.value.poms_score_day1.pain ,
                beetleChewing      :  this.postOpDay1Form.value.poms_score_day1.beetleChewing ,
                dyslipidemia      :  this.postOpDay1Form.value.poms_score_day1.dyslipidemia ,
                noCormorbidities      :  this.postOpDay1Form.value.poms_score_day1.noCormorbidities ,
                added     :  this.postOpDay1Form.value.poms_score_day1.change_antibiotics_day1.added ,
                omitted        :  this.postOpDay1Form.value.poms_score_day1.change_antibiotics_day1.omitted ,
                no_change     :  this.postOpDay1Form.value.poms_score_day1.change_antibiotics_day1.no_change ,
                name_of_antibiotic_omm: this.postOpDay1Form.value.name_of_antibiotic_omm,
                if_other_please_specifyomit: this.postOpDay1Form.value.if_other_please_specifyomit,
                date_antibiotic_omitted: this.postOpDay1Form.value.date_antibiotic_omitted,
                name_of_antibiotic_omm2: this.postOpDay1Form.value.name_of_antibiotic_omm2,
                if_other_please_specifyomit2: this.postOpDay1Form.value.if_other_please_specifyomit2,
                date_antibiotic_omitted2: this.postOpDay1Form.value.date_antibiotic_omitted2,
                antibiotics_omit_day1: this.postOpDay1Form.value.antibiotics_omit_day1,
                name_of_antibiotic: this.postOpDay1Form.value.name_of_antibiotic,
                if_other_please_specify: this.postOpDay1Form.value.if_other_please_specify,
                name2_of_antibiotic: this.postOpDay1Form.value.name2_of_antibiotic,
                if_other_please_specify2: this.postOpDay1Form.value.if_other_please_specify2,
                name3_of_antibiotic: this.postOpDay1Form.value.name3_of_antibiotic,
                if_other_please_specify3: this.postOpDay1Form.value.if_other_please_specify3,





                timeStamp: new Date().getTime()


              }
            this.patient.postopday1 = postOp1;
            this.patient.timeStamp = new Date().getTime();
            this.data.updatePatient(this.patient, '-newPostOpDay1-');
            this.sync.invokeSendDataThroughSocket(postOp1, '-newPostOpDay1-', this.patient.patientId);

          } else {

            let postOp1 = {
              postopday1ID: this.postopday1.postopday1ID,
              postop_day1_report_date: this.postOpDay1Form.value.postop_day1_report_date,
              postop_day1_report_time: this.postOpDay1Form.value.postop_day1_report_time,
              icu_admission     :  this.postOpDay1Form.value.icu_admission ,
              notes_pod1     :  this.postOpDay1Form.value.notes_pod1 ,
              cprExperienced     :  this.postOpDay1Form.value.cprExperienced ,
              wound_infection     :  this.postOpDay1Form.value.wound_infection ,
              feeding     :  this.postOpDay1Form.value.feeding ,
              bowels     :  this.postOpDay1Form.value.bowels ,
              pulmonary     :  this.postOpDay1Form.value.poms_score_day1.pulmonary ,
              infections        :  this.postOpDay1Form.value.poms_score_day1.infections ,
              renal     :  this.postOpDay1Form.value.poms_score_day1.renal ,
              gastrointestinal     :  this.postOpDay1Form.value.poms_score_day1.gastrointestinal ,
              cardiovascular       :  this.postOpDay1Form.value.poms_score_day1.cardiovascular ,
              neurological      :  this.postOpDay1Form.value.poms_score_day1.neurological ,
              haematological      :  this.postOpDay1Form.value.poms_score_day1.haematological ,
              redo_laparoscopy_laparotomy      :  this.postOpDay1Form.value.poms_score_day1.redo_laparoscopy_laparotomy ,
              pain      :  this.postOpDay1Form.value.poms_score_day1.pain ,
              beetleChewing      :  this.postOpDay1Form.value.poms_score_day1.beetleChewing ,
              dyslipidemia      :  this.postOpDay1Form.value.poms_score_day1.dyslipidemia ,
              noCormorbidities      :  this.postOpDay1Form.value.poms_score_day1.noCormorbidities ,
              added     :  this.postOpDay1Form.value.poms_score_day1.change_antibiotics_day1.added ,
              omitted        :  this.postOpDay1Form.value.poms_score_day1.change_antibiotics_day1.omitted ,
              no_change     :  this.postOpDay1Form.value.poms_score_day1.change_antibiotics_day1.no_change ,
              antibiotics_omit_day1     :  this.postOpDay1Form.value.antibiotics_omit_day1 ,
              date_antibiotic_omitted: this.postOpDay1Form.value.date_antibiotic_omitted,
              date_antibiotic_omitted2: this.postOpDay1Form.value.date_antibiotic_omitted2,
              if_other_please_specifyomit     :  this.postOpDay1Form.value.if_other_please_specifyomit ,
              if_other_please_specifyomit2     :  this.postOpDay1Form.value.if_other_please_specifyomit2 ,
              if_other_please_specify     :  this.postOpDay1Form.value.if_other_please_specify ,
              if_other_please_specify2     :  this.postOpDay1Form.value.if_other_please_specify2 ,
              if_other_please_specify3     :  this.postOpDay1Form.value.if_other_please_specify3 ,
              name_of_antibiotic_omm     :  this.postOpDay1Form.value.name_of_antibiotic_omm ,
              name_of_antibiotic_omm2     :  this.postOpDay1Form.value.name_of_antibiotic_omm2 ,
              name_of_antibiotic     :  this.postOpDay1Form.value.name_of_antibiotic ,
              name2_of_antibiotic     :  this.postOpDay1Form.value.name2_of_antibiotic ,     
              name3_of_antibiotic     :  this.postOpDay1Form.value.name3_of_antibiotic ,                    



              timeStamp: new Date().getTime()


            }

            this.patient.postopday1 = postOp1;
            this.patient.timeStamp = new Date().getTime();
            this.data.updatePatient(this.patient, '-newPostOpDay1-')
            this.sync.invokeSendDataThroughSocket(postOp1, '-updatePostOpDay1-', this.patient.patientId);

          }

        }
  

}


@Component({
  templateUrl: 'interventionpci.html',
})
export class ModalContentPage5 { //intervention PCI

  private interventionPciForm: FormGroup;
  public patient;
  public interventionPci;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public navParams: NavParams, public data: DataProvider, public sync: SyncProvider) {

    this.patient = navParams.get("patient");
    this.interventionPci = navParams.get("interventionPci");
    console.log(this.interventionPci);

    if (this.interventionPci === null) {
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
          noReflow: [false],
          cva: [false],
          tamponade: [false],
          ventilation: [false],
          pacemaker: [false],
          cpr: [false],
          defibrillation: [false],
          vasopressors: [false],
          bleeding: [false]
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
          noReflow: [this.interventionPci.noReflow],
          cva: [this.interventionPci.cva],
          tamponade: [this.interventionPci.tamponade],
          ventilation: [this.interventionPci.ventilation],
          pacemaker: [this.interventionPci.pacemaker],
          cpr: [this.interventionPci.cpr],
          defibrillation: [this.interventionPci.defibrillation],
          vasopressors: [this.interventionPci.vasopressors],
          bleeding: [this.interventionPci.bleeding]
        }),
        bleedingSite: [this.interventionPci.bleedingSite],
        destinationFollowingPci: [this.interventionPci.destinationFollowingPci]

      });

    }



  }

  dismiss() {
    // this.saveInterventionPci();
    // this.viewCtrl.dismiss();

    if (this.interventionPciForm.dirty) {
      this.saveInterventionPci().then(() => {
        this.viewCtrl.dismiss();
      })
    } else {
      this.viewCtrl.dismiss();
    }
  }

  async saveInterventionPci() {
    if (this.interventionPci === null) {

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

        noReflow: this.interventionPciForm.value.complications.noReflow,
        cva: this.interventionPciForm.value.complications.cva,
        tamponade: this.interventionPciForm.value.complications.tamponade,
        ventilation: this.interventionPciForm.value.complications.ventilation,
        pacemaker: this.interventionPciForm.value.complications.pacemaker,
        cpr: this.interventionPciForm.value.complications.cpr,
        defibrillation: this.interventionPciForm.value.complications.defibrillation,
        vasopressors: this.interventionPciForm.value.complications.vasopressors,
        bleeding: this.interventionPciForm.value.complications.bleeding,

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

        noReflow: this.interventionPciForm.value.complications.noReflow,
        cva: this.interventionPciForm.value.complications.cva,
        tamponade: this.interventionPciForm.value.complications.tamponade,
        ventilation: this.interventionPciForm.value.complications.ventilation,
        pacemaker: this.interventionPciForm.value.complications.pacemaker,
        cpr: this.interventionPciForm.value.complications.cpr,
        defibrillation: this.interventionPciForm.value.complications.defibrillation,
        vasopressors: this.interventionPciForm.value.complications.vasopressors,
        bleeding: this.interventionPciForm.value.complications.bleeding,

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

  private thrombolysisForm: FormGroup;
  public patient;
  public thrombolysis;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public navParams: NavParams, public data: DataProvider, public sync: SyncProvider) {

    this.patient = navParams.get("patient");
    this.thrombolysis = navParams.get("thrombolysis");

    if (this.thrombolysis == null) {
      this.thrombolysisForm = this.formBuilder.group({

        dateOfthrombolysis: [''],
        timeOfthrombolysis: [''],
        drugs: formBuilder.group({
          streptokinase: [false],
          rTpa: [false]
        }),
        ecgChanges: [''],
        complications: formBuilder.group({
          noReflow: [false],
          cva: [false],
          tamponade: [false],
          ventilation: [false],
          pacemaker: [false],
          cpr: [false],
          defibrillation: [false],
          vasopressors: [false],
          bleeding: [false]
        }),
        bleedingType: ['']

      });
    } else {
      this.thrombolysisForm = this.formBuilder.group({

        dateOfthrombolysis: [this.thrombolysis.dateOfthrombolysis],
        timeOfthrombolysis: [this.thrombolysis.timeOfthrombolysis],
        drugs: formBuilder.group({
          streptokinase: [this.thrombolysis.streptokinase],
          rTpa: [this.thrombolysis.rTpa]
        }),
        ecgChanges: [this.thrombolysis.ecgChanges],
        complications: formBuilder.group({
          noReflow: [this.thrombolysis.noReflow],
          cva: [this.thrombolysis.cva],
          tamponade: [this.thrombolysis.tamponade],
          ventilation: [this.thrombolysis.ventilation],
          pacemaker: [this.thrombolysis.pacemaker],
          cpr: [this.thrombolysis.cpr],
          defibrillation: [this.thrombolysis.defibrillation],
          vasopressors: [this.thrombolysis.vasopressors],
          bleeding: [this.thrombolysis.bleeding]
        }),
        bleedingType: [this.thrombolysis.bleedingType]
      })

    }



  }

  dismiss() {
    // this.saveThrombolysis().then(()=>{
    //   this.viewCtrl.dismiss();
    // })

    if (this.thrombolysisForm.dirty) {
      this.saveThrombolysis().then(() => {
        this.viewCtrl.dismiss();
      })
    } else {
      this.viewCtrl.dismiss();
    }

  }

  async saveThrombolysis() {
    if (this.thrombolysis === null) {

      let thrombo = {
        thrombolysisId: UUID(),
        dateOfthrombolysis: this.thrombolysisForm.value.dateOfthrombolysis,
        timeOfthrombolysis: this.thrombolysisForm.value.timeOfthrombolysis,
        streptokinase: this.thrombolysisForm.value.drugs.streptokinase,
        rTpa: this.thrombolysisForm.value.drugs.rTpa,
        ecgChanges: this.thrombolysisForm.value.ecgChanges,
        noReflow: this.thrombolysisForm.value.complications.noReflow,
        cva: this.thrombolysisForm.value.complications.cva,
        tamponade: this.thrombolysisForm.value.complications.tamponade,
        ventilation: this.thrombolysisForm.value.complications.ventilation,
        pacemaker: this.thrombolysisForm.value.complications.pacemaker,
        cpr: this.thrombolysisForm.value.complications.cpr,
        defibrillation: this.thrombolysisForm.value.complications.defibrillation,
        vasopressors: this.thrombolysisForm.value.complications.vasopressors,
        bleeding: this.thrombolysisForm.value.complications.bleeding,
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
        streptokinase: this.thrombolysisForm.value.drugs.streptokinase,
        rTpa: this.thrombolysisForm.value.drugs.rTpa,
        ecgChanges: this.thrombolysisForm.value.ecgChanges,
        noReflow: this.thrombolysisForm.value.complications.noReflow,
        cva: this.thrombolysisForm.value.complications.cva,
        tamponade: this.thrombolysisForm.value.complications.tamponade,
        ventilation: this.thrombolysisForm.value.complications.ventilation,
        pacemaker: this.thrombolysisForm.value.complications.pacemaker,
        cpr: this.thrombolysisForm.value.complications.cpr,
        defibrillation: this.thrombolysisForm.value.complications.defibrillation,
        vasopressors: this.thrombolysisForm.value.complications.vasopressors,
        bleeding: this.thrombolysisForm.value.complications.bleeding,
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

  private dischargeForm: FormGroup;
  public patient;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public navParams: NavParams, public data: DataProvider, public navCtrl: NavController, public event: Events, public sync: SyncProvider) {

    this.patient = navParams.get("patient");
    console.log('discharge', this.patient)

    this.dischargeForm = this.formBuilder.group({
      dischargeDate: [''],
      dischargeTime: [''],
      dischargeStatus: [''],
      dischargeDestination: [''],
      otherDestinationName: [''],
      clavien_dindo: [''],
      clavien_dindo_disab: [''],
      wound_infection: [''],
      // patientExperience: [''],
      // vasopressorsGiven: [''],
      lastReportedTropanin: [''],
      change_antibiotics_discharge: formBuilder.group({
        added     : [ false ],
        omitted        : [ false ],
        no_change     : [ false ],
          }),                
      antibiotics_omit_discharge: [''],        
      name_of_antibiotic_omm: [''],        
      if_other_please_specifyomit: [''],
      date_antibiotic_omitted: [''],
      name_of_antibiotic_omm2: [''],                
      if_other_please_specifyomit2: [''],
      date_antibiotic_omitted2: [''],
      name_of_antibiotic: [''],        
      if_other_please_specify: [''],
      name2_of_antibiotic: [''],  
      if_other_please_specify2: [''],
      name3_of_antibiotic: [''],              
      if_other_please_specify3: [''],
      complications_discharge: formBuilder.group({
        icu_admissions     : [ false ],
        confirmed_infections_antibiotic_use        : [ false ],
        laparoscopy_laparotomy_same_admission     : [ false ],
        ct_scan_abdomen     : [ false ],
      }),
      drugsOnDischarge: formBuilder.group({
        aspirin: [false],
        clopidogrel: [false],
        prasugrel: [false],
        ticagrelor: [false],
        unfractionatedHeparin: [false],
        lowMolecularWeightHeparin: [false],
        glycoproteinIIbInhibitors: [false],
        glycoproteinIIIbInhibitors: [false],
        bivalirudin: [false],
        fondaparinux: [false],
        warfarin: [false],
        none: [false]
      }),
      patientExperience: formBuilder.group({
        cpr: [false],
        defibrillation: [false],
        stentThrombosis: [false],
        unplannedCriticalCareAdmission: [false],
        vasopressors: [false],
        none: [false]
      })

    });

  }

  dismiss() {
    if (this.dischargeForm.dirty) {
      this.saveDischarge().then(() => {
        // this.navCtrl.setRoot(HomePage)
        // this.navCtrl.popToRoot()
        this.viewCtrl.dismiss().then(() => {
          this.event.publish('-discharge-', { data: 'patient discharged' })
          // this.navCtrl.setRoot(HomePage)
          // this.navCtrl.pop()

        });
      })
    } else {
      this.viewCtrl.dismiss()
    }


  }

  async saveDischarge() {
    let dischargeData = {
      disId: UUID(),
      dischargeDate: this.dischargeForm.value.dischargeDate,
      dischargeTime: this.dischargeForm.value.dischargeTime,
      dischargeStatus: this.dischargeForm.value.dischargeStatus,
      dischargeDestination: this.dischargeForm.value.dischargeDestination,
      otherDestinationName: this.dischargeForm.value.otherDestinationName,
      clavien_dindo: this.dischargeForm.value.clavien_dindo,
      clavien_dindo_disab: this.dischargeForm.value.clavien_dindo_disab,
      wound_infection: this.dischargeForm.value.wound_infection,
      added     :  this.dischargeForm.value.change_antibiotics_discharge.added ,
      omitted        :  this.dischargeForm.value.change_antibiotics_discharge.omitted ,
      no_change     :  this.dischargeForm.value.change_antibiotics_discharge.no_change ,
      name_of_antibiotic_omm: this.dischargeForm.value.name_of_antibiotic_omm,
      if_other_please_specifyomit: this.dischargeForm.value.if_other_please_specifyomit,
      date_antibiotic_omitted: this.dischargeForm.value.date_antibiotic_omitted,
      name_of_antibiotic_omm2: this.dischargeForm.value.name_of_antibiotic_omm2,
      if_other_please_specifyomit2: this.dischargeForm.value.if_other_please_specifyomit2,
      date_antibiotic_omitted2: this.dischargeForm.value.date_antibiotic_omitted2,
      antibiotics_omit_discharge: this.dischargeForm.value.antibiotics_omit_discharge,
      name_of_antibiotic: this.dischargeForm.value.name_of_antibiotic,
      if_other_please_specify: this.dischargeForm.value.if_other_please_specify,
      name2_of_antibiotic: this.dischargeForm.value.name2_of_antibiotic,
      if_other_please_specify2: this.dischargeForm.value.if_other_please_specify2,
      name3_of_antibiotic: this.dischargeForm.value.name3_of_antibiotic,
      if_other_please_specify3: this.dischargeForm.value.if_other_please_specify3,
      icu_admissions     :  this.dischargeForm.value.complications_discharge.icu_admissions ,
      confirmed_infections_antibiotic_use        :  this.dischargeForm.value.complications_discharge.confirmed_infections_antibiotic_use ,
      laparoscopy_laparotomy_same_admission     :  this.dischargeForm.value.complications_discharge.laparoscopy_laparotomy_same_admission ,
      ct_scan_abdomen     :  this.dischargeForm.value.complications_discharge.ct_scan_abdomen ,
      lastReportedTropanin: this.dischargeForm.value.lastReportedTropanin,
      aspirin: this.dischargeForm.value.drugsOnDischarge.aspirin,
      clopidogrel: this.dischargeForm.value.drugsOnDischarge.clopidogrel,
      prasugrel: this.dischargeForm.value.drugsOnDischarge.prasugrel,
      ticagrelor: this.dischargeForm.value.drugsOnDischarge.ticagrelor,
      unfractionatedHeparin: this.dischargeForm.value.drugsOnDischarge.unfractionatedHeparin,
      lowMolecularWeightHeparin: this.dischargeForm.value.drugsOnDischarge.lowMolecularWeightHeparin,
      glycoproteinIIbInhibitors: this.dischargeForm.value.drugsOnDischarge.glycoproteinIIbInhibitors,
      glycoproteinIIIbInhibitors: this.dischargeForm.value.drugsOnDischarge.glycoproteinIIIbInhibitors,
      bivalirudin: this.dischargeForm.value.drugsOnDischarge.bivalirudin,
      fondaparinux: this.dischargeForm.value.drugsOnDischarge.fondaparinux,
      warfarin: this.dischargeForm.value.drugsOnDischarge.warfarin,
      none1: this.dischargeForm.value.drugsOnDischarge.none,
      cpr: this.dischargeForm.value.patientExperience.cpr,
      defibrillation: this.dischargeForm.value.patientExperience.defibrillation,
      stentThrombosis: this.dischargeForm.value.patientExperience.stentThrombosis,
      unplannedCriticalCareAdmission: this.dischargeForm.value.patientExperience.unplannedCriticalCareAdmission,
      vasopressors: this.dischargeForm.value.patientExperience.vasopressors,
      none2: this.dischargeForm.value.patientExperience.none,


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

  private observationForm: FormGroup;
  public patient;
  public ob;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public modalCtrl: ModalController, public navParams: NavParams, public data: DataProvider, public sync: SyncProvider) {

    this.patient = navParams.get("patient");
    this.ob = navParams.get("ob");
    console.log('patient inside the observation modal ', this.patient)
    console.log('ob inside the observation modal ', this.ob)

    if (this.ob === null) {
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
        haemoglobin: [''],
        blood_glucose: [''],
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
        haemoglobin: [this.ob.haemoglobin],
        blood_glucose: [this.ob.blood_glucose],
        platelets: [this.ob.platelets],
        respiratoryRate: [this.ob.respiratoryRate],
        heartRate: [this.ob.heartRate],
        temperature: [this.ob.temperature]

      });
    }



  }

  dismiss() {
    // this.saveObservation().then(()=>{
    //   this.viewCtrl.dismiss();
    // });

    if (this.observationForm.dirty) {
      this.saveObservation().then(() => {
        this.viewCtrl.dismiss();
      })
    } else {
      this.viewCtrl.dismiss();
    }

  }

  async saveObservation() {

    if (!this.patient.observations && this.ob === null) {
      console.log('adding first observation');
      let obsTimeStamp = Date.parse((this.observationForm.value.obsDate + 'T' + this.observationForm.value.obsTime));
      // console.log(Date.parse(obsTimeStamp));
      let observation = {
        obsId: UUID(),
        obsDate: this.observationForm.value.obsDate,
        obsTime: this.observationForm.value.obsTime,
        obsTimeStamp: obsTimeStamp,
        respiratoryRate: this.observationForm.value.respiratoryRate,
        heartRate: this.observationForm.value.heartRate,
        temperature: this.observationForm.value.temperature,
        bed: this.observationForm.value.bed,
        sbp: this.observationForm.value.sbp,
        dbp: this.observationForm.value.dbp,
        saturation: this.observationForm.value.saturation,
        urineOutput: this.observationForm.value.urineOutput,
        fluidInput: this.observationForm.value.fluidInput,
        urineOutputDuration: this.observationForm.value.urineOutputDuration,
        eye: this.observationForm.value.eye,
        verbal: this.observationForm.value.verbal,
        motor: this.observationForm.value.motor,
        pain: this.observationForm.value.pain,
        wbc: this.observationForm.value.wbc,
        haemoglobin: this.observationForm.value.haemoglobin,
        pcv: this.observationForm.value.pcv,
        crft: this.observationForm.value.crft,
        blood_glucose: this.observationForm.value.blood_glucose,
        platelets: this.observationForm.value.platelets,
        timeStamp: new Date().getTime()
      }
      let obsArray = [];
      obsArray.push(observation);
      this.patient.observations = obsArray;
      this.patient.timeStamp = new Date().getTime();
      this.data.updatePatient(this.patient, '-newObservation-');
      this.sync.invokeSendDataThroughSocket(observation, '-newObservation-', this.patient.patientId)

    }

    else if (this.patient.observations.length > 0 && this.ob === null) {
      console.log('adding another observation')
      let obsTimeStamp = Date.parse((this.observationForm.value.obsDate + 'T' + this.observationForm.value.obsTime));
      let observation = {
        obsId: UUID(),
        obsDate: this.observationForm.value.obsDate,
        obsTime: this.observationForm.value.obsTime,
        obsTimeStamp: obsTimeStamp,
        respiratoryRate: this.observationForm.value.respiratoryRate,
        heartRate: this.observationForm.value.heartRate,
        temperature: this.observationForm.value.temperature,
        bed: this.observationForm.value.bed,
        sbp: this.observationForm.value.sbp,
        dbp: this.observationForm.value.dbp,
        saturation: this.observationForm.value.saturation,
        urineOutput: this.observationForm.value.urineOutput,
        fluidInput: this.observationForm.value.fluidInput,
        urineOutputDuration: this.observationForm.value.urineOutputDuration,
        eye: this.observationForm.value.eye,
        verbal: this.observationForm.value.verbal,
        motor: this.observationForm.value.motor,
        pain: this.observationForm.value.pain,
        wbc: this.observationForm.value.wbc,
        haemoglobin: this.observationForm.value.haemoglobin,
        pcv: this.observationForm.value.pcv,
        crft: this.observationForm.value.crft,
        blood_glucose: this.observationForm.value.blood_glucose,
        platelets: this.observationForm.value.platelets,
        timeStamp: new Date().getTime()
      }

      this.patient.observations.push(observation);
      this.patient.timeStamp = new Date().getTime();
      this.data.updatePatient(this.patient, '-newObservation-')
      this.sync.invokeSendDataThroughSocket(observation, '-newObservation-', this.patient.patientId)
    }
    else {

      console.log('editing observation')
      let obsTimeStamp = Date.parse((this.observationForm.value.obsDate + 'T' + this.observationForm.value.obsTime));

      let observation = {
        obsId: this.ob.obsId,
        
        obsDate: this.observationForm.value.obsDate,
        obsTime: this.observationForm.value.obsTime,
        obsTimeStamp: obsTimeStamp,
        respiratoryRate: this.observationForm.value.respiratoryRate,
        heartRate: this.observationForm.value.heartRate,
        temperature: this.observationForm.value.temperature,
        bed: this.observationForm.value.bed,
        sbp: this.observationForm.value.sbp,
        dbp: this.observationForm.value.dbp,
        saturation: this.observationForm.value.saturation,
        urineOutput: this.observationForm.value.urineOutput,
        fluidInput: this.observationForm.value.fluidInput,
        urineOutputDuration: this.observationForm.value.urineOutputDuration,
        eye: this.observationForm.value.eye,
        verbal: this.observationForm.value.verbal,
        motor: this.observationForm.value.motor,
        pain: this.observationForm.value.pain,
        wbc: this.observationForm.value.wbc,
        haemoglobin: this.observationForm.value.haemoglobin,
        pcv: this.observationForm.value.pcv,
        crft: this.observationForm.value.crft,
        blood_glucose: this.observationForm.value.blood_glucose,
        platelets: this.observationForm.value.platelets,
        timeStamp: new Date().getTime()
      }

      let filteredIndex;

      this.patient.observations.forEach((element, index) => {

        if (element.obsId == this.ob.obsId) {
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

  private observationForm: FormGroup;
  public patient;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public modalCtrl: ModalController, public navParams: NavParams, public data: DataProvider) {
    this.patient = navParams.get("patient");
    console.log('patient inside the observation list modal ', this.patient)

    // this.observationForm = this.formBuilder.group({
    //   dischargeDate: [''],
    //   dischargeTime: [''],
    //   dischargeStatus: [''],
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

  sortObservations() {
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

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addObservation() {
    let obs = { patient: this.patient, ob: null };
    let modal = this.modalCtrl.create(ModalContentPage8, obs);
    modal.present();
  }

  editObservation(observation) {
    let obs = { patient: this.patient, ob: observation };
    let modal = this.modalCtrl.create(ModalContentPage8, obs);
    modal.present();
  }
}

@Component({
  templateUrl: 'qollist.html',
})
export class ModalContentPage10 { // QOL list


  public patient;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public modalCtrl: ModalController, public navParams: NavParams, public data: DataProvider) {
    this.patient = navParams.get("patient");
    console.log('patient inside the qol list modal ', this.patient)



  }

  ionViewDidLoad() {
    this.sortQol();
  }

  sortQol() {
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

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addQol() {
    let qol = { patient: this.patient, qol: null };
    let modal = this.modalCtrl.create(ModalContentPage3, qol);
    modal.present();
  }

  editQol(qol) {
    let data = { patient: this.patient, qol: qol };
    let modal = this.modalCtrl.create(ModalContentPage3, data);
    modal.present();
  }
}

@Component({
  templateUrl: 'postOpDay3.html',
})
export class ModalContentPage13 { // postop day 3
  private postOpDay3Form : FormGroup;
  public patient;
  public postopday3;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public navParams: NavParams, public data: DataProvider, public sync : SyncProvider) {

    this.patient = navParams.get("patient");
    this.postopday3 = navParams.get("postopday3");
    console.log(this.postopday3)

    if (this.postopday3 == null){

      this.postOpDay3Form = this.formBuilder.group({
        postop_day3_report_date: [''],
        postop_day3_report_time: [''],
        icu_admission: [''],
        fever: [''],
        wound_infection: [''],
        feeding: [''],
        bowels: [''],
        hb_avl_day3: [''],
        hb_day3: [''],                     


        poms_score_day3: formBuilder.group({
          pulmonary     : [ false ],
          infections        : [ false ],
          renal     : [ false ],
          gastrointestinal     : [ false ],
          cardiovascular       : [ false ],
          neurological      : [ false ],
          haematological      : [ false ],
          redo_laparoscopy_laparotomy      : [ false ],
          pain      : [ false ],
        change_antibiotics_day3: formBuilder.group({
          added     : [ false ],
          omitted        : [ false ],
          no_change     : [ false ],
            }),
            antibiotics_omit_day3: [''],        
            name_of_antibiotic_omm: [''],        
            if_other_please_specifyomit: [''],
            date_antibiotic_omitted: [''],
            name_of_antibiotic_omm2: [''],                
            if_other_please_specifyomit2: [''],
            date_antibiotic_omitted2: [''],
            name_of_antibiotic: [''],        
            if_other_please_specify: [''],
            name2_of_antibiotic: [''],  
            if_other_please_specify2: [''],
            name3_of_antibiotic: [''],              
            if_other_please_specify3: [''],
    
          }),


      });
    } else {
      this.postOpDay3Form = this.formBuilder.group({
        postop_day3_report_date: [this.postopday3.postop_day3_report_date],
        postop_day3_report_time: [this.postopday3.postop_day3_report_time],
        icu_admission: [this.postopday3.icu_admission],
        fever: [this.postopday3.fever],
        wound_infection: [this.postopday3.wound_infection],
        feeding: [this.postopday3.feeding],
        bowels: [this.postopday3.bowels],
        hb_avl_day3: [this.postopday3.hb_avl_day3],
        hb_day3: [this.postopday3.hb_day3],   

        poms_score_day3: formBuilder.group({
          pulmonary     : [ this.postopday3.pulmonary ],
          infections        : [ this.postopday3.infections ],
          renal     : [ this.postopday3.renal ],
          gastrointestinal     : [ this.postopday3.gastrointestinal ],
          cardiovascular       : [ this.postopday3.cardiovascular ],
          neurological      : [ this.postopday3.neurological ],
          haematological      : [ this.postopday3.haematological ],
          redo_laparoscopy_laparotomy      : [ this.postopday3.redo_laparoscopy_laparotomy ],
          pain      : [ this.postopday3.pain ],
          beetleChewing      : [ this.postopday3.beetleChewing ],
          dyslipidemia      : [ this.postopday3.dyslipidemia ],
          noCormorbidities      : [ this.postopday3.noCormorbidities ],
        change_antibiotics_day3: formBuilder.group({
            added     : [ this.postopday3.added ],
            omitted        : [ this.postopday3.omitted ],
            no_change     : [ this.postopday3.no_change ],
            }),
            name_of_antibiotic_omm: [this.postopday3.name_of_antibiotic_omm],
            if_other_please_specifyomit: [this.postopday3.if_other_please_specifyomit],
            date_antibiotic_omitted: [this.postopday3.date_antibiotic_omitted],
            name_of_antibiotic_omm2: [this.postopday3.name_of_antibiotic_omm2],
            if_other_please_specifyomit2: [this.postopday3.if_other_please_specifyomit2],
            date_antibiotic_omitted2: [this.postopday3.date_antibiotic_omitted2],
            antibiotics_omit_day3: [this.postopday3.antibiotics_omit_day3],
            name_of_antibiotic: [this.postopday3.name_of_antibiotic_omm],
            if_other_please_specify: [this.postopday3.if_other_please_specify],
            name2_of_antibiotic: [this.postopday3.name2_of_antibiotic],
            if_other_please_specify2: [this.postopday3.if_other_please_specify2],
            name3_of_antibiotic: [this.postopday3.name3_of_antibiotic],
            if_other_please_specify3: [this.postopday3.if_other_please_specify3],
    
          }),

      });
    }



  }

  dismiss(){
    // this.savePostOpDay3().then(()=>{
    //   this.viewCtrl.dismiss();
    // })
    if(this.postOpDay3Form.dirty){
      this.savePostOpDay3().then(()=>{
        this.viewCtrl.dismiss();
      })
    } else {
      this.viewCtrl.dismiss();
    }
    
  }

  async savePostOpDay3(){
    if(this.postopday3 == null){

              let postOp3 = {
                postopday3ID: UUID(),
                postop_day3_report_date: this.postOpDay3Form.value.postop_day3_report_date,
                postop_day3_report_time: this.postOpDay3Form.value.postop_day3_report_time,
                icu_admission: this.postOpDay3Form.value.icu_admission,
                fever: this.postOpDay3Form.value.fever,
                wound_infection: this.postOpDay3Form.value.wound_infection,
                feeding: this.postOpDay3Form.value.feeding,
                bowels: this.postOpDay3Form.value.bowels,
                hb_avl_day3: this.postOpDay3Form.value.hb_avl_day3,
                hb_day3: this.postOpDay3Form.value.hb_day3,




                pulmonary     :  this.postOpDay3Form.value.poms_score_day3.pulmonary ,
                infections        :  this.postOpDay3Form.value.poms_score_day3.infections ,
                renal     :  this.postOpDay3Form.value.poms_score_day3.renal ,
                gastrointestinal     :  this.postOpDay3Form.value.poms_score_day3.gastrointestinal ,
                cardiovascular       :  this.postOpDay3Form.value.poms_score_day3.cardiovascular ,
                neurological      :  this.postOpDay3Form.value.poms_score_day3.neurological ,
                haematological      :  this.postOpDay3Form.value.poms_score_day3.haematological ,
                redo_laparoscopy_laparotomy      :  this.postOpDay3Form.value.poms_score_day3.redo_laparoscopy_laparotomy ,
                pain      :  this.postOpDay3Form.value.poms_score_day3.pain ,
                beetleChewing      :  this.postOpDay3Form.value.poms_score_day3.beetleChewing ,
                dyslipidemia      :  this.postOpDay3Form.value.poms_score_day3.dyslipidemia ,
                noCormorbidities      :  this.postOpDay3Form.value.poms_score_day3.noCormorbidities ,
                added     :  this.postOpDay3Form.value.poms_score_day3.change_antibiotics_day3.added ,
                omitted        :  this.postOpDay3Form.value.poms_score_day3.change_antibiotics_day3.omitted ,
                no_change     :  this.postOpDay3Form.value.poms_score_day3.change_antibiotics_day3.no_change ,
                name_of_antibiotic_omm: this.postOpDay3Form.value.name_of_antibiotic_omm,
                if_other_please_specifyomit: this.postOpDay3Form.value.if_other_please_specifyomit,
                date_antibiotic_omitted: this.postOpDay3Form.value.date_antibiotic_omitted,
                name_of_antibiotic_omm2: this.postOpDay3Form.value.name_of_antibiotic_omm2,
                if_other_please_specifyomit2: this.postOpDay3Form.value.if_other_please_specifyomit2,
                date_antibiotic_omitted2: this.postOpDay3Form.value.date_antibiotic_omitted2,
                antibiotics_omit_day3: this.postOpDay3Form.value.antibiotics_omit_day3,
                name_of_antibiotic: this.postOpDay3Form.value.name_of_antibiotic,
                if_other_please_specify: this.postOpDay3Form.value.if_other_please_specify,
                name2_of_antibiotic: this.postOpDay3Form.value.name2_of_antibiotic,
                if_other_please_specify2: this.postOpDay3Form.value.if_other_please_specify2,
                name3_of_antibiotic: this.postOpDay3Form.value.name3_of_antibiotic,
                if_other_please_specify3: this.postOpDay3Form.value.if_other_please_specify3,



                timeStamp: new Date().getTime()


              }
            this.patient.postopday3 = postOp3;
            this.patient.timeStamp = new Date().getTime();
            this.data.updatePatient(this.patient, '-newPostOpDay3-');
            this.sync.invokeSendDataThroughSocket(postOp3, '-newPostOpDay3-', this.patient.patientId);

          } else {

            let postOp3 = {
              postopday3ID: this.postopday3.postopday3ID,
              postop_day3_report_date: this.postOpDay3Form.value.postop_day3_report_date,
              postop_day3_report_time: this.postOpDay3Form.value.postop_day3_report_time,
              icu_admission     :  this.postOpDay3Form.value.icu_admission ,
              fever     :  this.postOpDay3Form.value.fever ,
              wound_infection     :  this.postOpDay3Form.value.wound_infection ,
              feeding     :  this.postOpDay3Form.value.feeding ,
              bowels     :  this.postOpDay3Form.value.bowels ,
              hb_avl_day3     :  this.postOpDay3Form.value.hb_avl_day3 ,
              hb_day3     :  this.postOpDay3Form.value.hb_day3 ,
              pulmonary     :  this.postOpDay3Form.value.poms_score_day3.pulmonary ,
              infections        :  this.postOpDay3Form.value.poms_score_day3.infections ,
              renal     :  this.postOpDay3Form.value.poms_score_day3.renal ,
              gastrointestinal     :  this.postOpDay3Form.value.poms_score_day3.gastrointestinal ,
              cardiovascular       :  this.postOpDay3Form.value.poms_score_day3.cardiovascular ,
              neurological      :  this.postOpDay3Form.value.poms_score_day3.neurological ,
              haematological      :  this.postOpDay3Form.value.poms_score_day3.haematological ,
              redo_laparoscopy_laparotomy      :  this.postOpDay3Form.value.poms_score_day3.redo_laparoscopy_laparotomy ,
              pain      :  this.postOpDay3Form.value.poms_score_day3.pain ,
              beetleChewing      :  this.postOpDay3Form.value.poms_score_day3.beetleChewing ,
              dyslipidemia      :  this.postOpDay3Form.value.poms_score_day3.dyslipidemia ,
              noCormorbidities      :  this.postOpDay3Form.value.poms_score_day3.noCormorbidities ,
              added     :  this.postOpDay3Form.value.poms_score_day3.change_antibiotics_day3.added ,
              omitted        :  this.postOpDay3Form.value.poms_score_day3.change_antibiotics_day3.omitted ,
              no_change     :  this.postOpDay3Form.value.poms_score_day3.change_antibiotics_day3.no_change ,
              antibiotics_omit_day3     :  this.postOpDay3Form.value.antibiotics_omit_day3 ,
              date_antibiotic_omitted: this.postOpDay3Form.value.date_antibiotic_omitted,
              date_antibiotic_omitted2: this.postOpDay3Form.value.date_antibiotic_omitted2,
              if_other_please_specifyomit     :  this.postOpDay3Form.value.if_other_please_specifyomit ,
              if_other_please_specifyomit2     :  this.postOpDay3Form.value.if_other_please_specifyomit2 ,
              if_other_please_specify     :  this.postOpDay3Form.value.if_other_please_specify ,
              if_other_please_specify2     :  this.postOpDay3Form.value.if_other_please_specify2 ,
              if_other_please_specify3     :  this.postOpDay3Form.value.if_other_please_specify3 ,
              name_of_antibiotic_omm     :  this.postOpDay3Form.value.name_of_antibiotic_omm ,
              name_of_antibiotic_omm2     :  this.postOpDay3Form.value.name_of_antibiotic_omm2 ,
              name_of_antibiotic     :  this.postOpDay3Form.value.name_of_antibiotic ,
              name2_of_antibiotic     :  this.postOpDay3Form.value.name2_of_antibiotic ,     
              name3_of_antibiotic     :  this.postOpDay3Form.value.name3_of_antibiotic ,                       


              timeStamp: new Date().getTime()


            }

            this.patient.postopday3 = postOp3;
            this.patient.timeStamp = new Date().getTime();
            this.data.updatePatient(this.patient, '-newPostOpDay3-')
            this.sync.invokeSendDataThroughSocket(postOp3, '-updatePostOpDay3-', this.patient.patientId);

          }

        }
  

}

@Component({
  templateUrl: 'postOpDay7.html',
})
export class ModalContentPage14 { // postop day 7
  private postOpDay7Form : FormGroup;
  public patient;
  public postopday7;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public navParams: NavParams, public data: DataProvider, public sync : SyncProvider) {

    this.patient = navParams.get("patient");
    this.postopday7 = navParams.get("postopday7");
    console.log(this.postopday7)

    if (this.postopday7 == null){

      this.postOpDay7Form = this.formBuilder.group({
        postop_day7_report_date: [''],
        postop_day7_report_time: [''],
        icu_admission: [''],
        fever: [''],
        wound_infection: [''],
        feeding: [''],
        bowels: [''],
        hb_avl_day7: [''],
        hb_day7: [''],     
        poms_score_day7: formBuilder.group({
          pulmonary     : [ false ],
          infections        : [ false ],
          renal     : [ false ],
          gastrointestinal     : [ false ],
          cardiovascular       : [ false ],
          neurological      : [ false ],
          haematological      : [ false ],
          redo_laparoscopy_laparotomy      : [ false ],
          pain      : [ false ],
        change_antibiotics_day7: formBuilder.group({
          added     : [ false ],
          omitted        : [ false ],
          no_change     : [ false ],
            }),
            antibiotics_omit_day7: [''],        
            name_of_antibiotic_omm: [''],        
            if_other_please_specifyomit: [''],
            date_antibiotic_omitted: [''],
            name_of_antibiotic_omm2: [''],                
            if_other_please_specifyomit2: [''],
            date_antibiotic_omitted2: [''],
            name_of_antibiotic: [''],        
            if_other_please_specify: [''],
            name2_of_antibiotic: [''],  
            if_other_please_specify2: [''],
            name3_of_antibiotic: [''],              
            if_other_please_specify3: [''],
    
          }),



      });
    } else {
      this.postOpDay7Form = this.formBuilder.group({
        postop_day7_report_date: [this.postopday7.postop_day7_report_date],
        postop_day7_report_time: [this.postopday7.postop_day7_report_time],
        icu_admission: [this.postopday7.icu_admission],
        fever: [this.postopday7.fever],
        wound_infection: [this.postopday7.wound_infection],
        feeding: [this.postopday7.feeding],
        bowels: [this.postopday7.bowels],
        hb_avl_day7: [this.postopday7.hb_avl_day7],
        hb_day7: [this.postopday7.hb_day7],
        poms_score_day7: formBuilder.group({
          pulmonary     : [ this.postopday7.pulmonary ],
          infections        : [ this.postopday7.infections ],
          renal     : [ this.postopday7.renal ],
          gastrointestinal     : [ this.postopday7.gastrointestinal ],
          cardiovascular       : [ this.postopday7.cardiovascular ],
          neurological      : [ this.postopday7.neurological ],
          haematological      : [ this.postopday7.haematological ],
          redo_laparoscopy_laparotomy      : [ this.postopday7.redo_laparoscopy_laparotomy ],
          pain      : [ this.postopday7.pain ],
          beetleChewing      : [ this.postopday7.beetleChewing ],
          dyslipidemia      : [ this.postopday7.dyslipidemia ],
          noCormorbidities      : [ this.postopday7.noCormorbidities ],
        change_antibiotics_day7: formBuilder.group({
            added     : [ this.postopday7.added ],
            omitted        : [ this.postopday7.omitted ],
            no_change     : [ this.postopday7.no_change ],
            }),
            name_of_antibiotic_omm: [this.postopday7.name_of_antibiotic_omm],
            if_other_please_specifyomit: [this.postopday7.if_other_please_specifyomit],
            date_antibiotic_omitted: [this.postopday7.date_antibiotic_omitted],
            name_of_antibiotic_omm2: [this.postopday7.name_of_antibiotic_omm2],
            if_other_please_specifyomit2: [this.postopday7.if_other_please_specifyomit2],
            date_antibiotic_omitted2: [this.postopday7.date_antibiotic_omitted2],
            antibiotics_omit_day7: [this.postopday7.antibiotics_omit_day7],
            name_of_antibiotic: [this.postopday7.name_of_antibiotic_omm],
            if_other_please_specify: [this.postopday7.if_other_please_specify],
            name2_of_antibiotic: [this.postopday7.name2_of_antibiotic],
            if_other_please_specify2: [this.postopday7.if_other_please_specify2],
            name3_of_antibiotic: [this.postopday7.name3_of_antibiotic],
            if_other_please_specify3: [this.postopday7.if_other_please_specify3],
    
          }),


      });
    }



  }

  dismiss(){
    // this.savePostOpDay7().then(()=>{
    //   this.viewCtrl.dismiss();
    // })
    if(this.postOpDay7Form.dirty){
      this.savePostOpDay7().then(()=>{
        this.viewCtrl.dismiss();
      })
    } else {
      this.viewCtrl.dismiss();
    }
    
  }

  async savePostOpDay7(){
    if(this.postopday7 == null){

              let postOp7 = {
                postopday7ID: UUID(),
                postop_day7_report_date: this.postOpDay7Form.value.postop_day7_report_date,
                postop_day7_report_time: this.postOpDay7Form.value.postop_day7_report_time,
                icu_admission: this.postOpDay7Form.value.icu_admission,
                fever: this.postOpDay7Form.value.fever,
                wound_infection: this.postOpDay7Form.value.wound_infection,
                feeding: this.postOpDay7Form.value.feeding,
                bowels: this.postOpDay7Form.value.bowels,
                hb_avl_day7: this.postOpDay7Form.value.hb_avl_day7,
                hb_day7: this.postOpDay7Form.value.hb_day7,
                pulmonary     :  this.postOpDay7Form.value.poms_score_day7.pulmonary ,
                infections        :  this.postOpDay7Form.value.poms_score_day7.infections ,
                renal     :  this.postOpDay7Form.value.poms_score_day7.renal ,
                gastrointestinal     :  this.postOpDay7Form.value.poms_score_day7.gastrointestinal ,
                cardiovascular       :  this.postOpDay7Form.value.poms_score_day7.cardiovascular ,
                neurological      :  this.postOpDay7Form.value.poms_score_day7.neurological ,
                haematological      :  this.postOpDay7Form.value.poms_score_day7.haematological ,
                redo_laparoscopy_laparotomy      :  this.postOpDay7Form.value.poms_score_day7.redo_laparoscopy_laparotomy ,
                pain      :  this.postOpDay7Form.value.poms_score_day7.pain ,
                beetleChewing      :  this.postOpDay7Form.value.poms_score_day7.beetleChewing ,
                dyslipidemia      :  this.postOpDay7Form.value.poms_score_day7.dyslipidemia ,
                noCormorbidities      :  this.postOpDay7Form.value.poms_score_day7.noCormorbidities ,
                added     :  this.postOpDay7Form.value.poms_score_day7.change_antibiotics_day7.added ,
                omitted        :  this.postOpDay7Form.value.poms_score_day7.change_antibiotics_day7.omitted ,
                no_change     :  this.postOpDay7Form.value.poms_score_day7.change_antibiotics_day7.no_change ,
                name_of_antibiotic_omm: this.postOpDay7Form.value.name_of_antibiotic_omm,
                if_other_please_specifyomit: this.postOpDay7Form.value.if_other_please_specifyomit,
                date_antibiotic_omitted: this.postOpDay7Form.value.date_antibiotic_omitted,
                name_of_antibiotic_omm2: this.postOpDay7Form.value.name_of_antibiotic_omm2,
                if_other_please_specifyomit2: this.postOpDay7Form.value.if_other_please_specifyomit2,
                date_antibiotic_omitted2: this.postOpDay7Form.value.date_antibiotic_omitted2,
                antibiotics_omit_day7: this.postOpDay7Form.value.antibiotics_omit_day7,
                name_of_antibiotic: this.postOpDay7Form.value.name_of_antibiotic,
                if_other_please_specify: this.postOpDay7Form.value.if_other_please_specify,
                name2_of_antibiotic: this.postOpDay7Form.value.name2_of_antibiotic,
                if_other_please_specify2: this.postOpDay7Form.value.if_other_please_specify2,
                name3_of_antibiotic: this.postOpDay7Form.value.name3_of_antibiotic,
                if_other_please_specify3: this.postOpDay7Form.value.if_other_please_specify3,



                timeStamp: new Date().getTime()


              }
            this.patient.postopday7 = postOp7;
            this.patient.timeStamp = new Date().getTime();
            this.data.updatePatient(this.patient, '-newPostOpDay7-');
            this.sync.invokeSendDataThroughSocket(postOp7, '-newPostOpDay7-', this.patient.patientId);

          } else {

            let postOp7 = {
              postopday7ID: this.postopday7.postopday7ID,
              postop_day7_report_date: this.postOpDay7Form.value.postop_day7_report_date,
              postop_day7_report_time: this.postOpDay7Form.value.postop_day7_report_time,
              icu_admission     :  this.postOpDay7Form.value.icu_admission ,
              fever     :  this.postOpDay7Form.value.fever ,
              wound_infection     :  this.postOpDay7Form.value.wound_infection ,
              feeding     :  this.postOpDay7Form.value.feeding ,
              bowels     :  this.postOpDay7Form.value.bowels ,
              hb_avl_day7     :  this.postOpDay7Form.value.hb_avl_day7 ,
              hb_day7     :  this.postOpDay7Form.value.hb_day7 ,
              added     :  this.postOpDay7Form.value.poms_score_day7.change_antibiotics_day7.added ,
              omitted        :  this.postOpDay7Form.value.poms_score_day7.change_antibiotics_day7.omitted ,
              no_change     :  this.postOpDay7Form.value.poms_score_day7.change_antibiotics_day7.no_change ,
              antibiotics_omit_day7     :  this.postOpDay7Form.value.antibiotics_omit_day7 ,
              date_antibiotic_omitted: this.postOpDay7Form.value.date_antibiotic_omitted,
              date_antibiotic_omitted2: this.postOpDay7Form.value.date_antibiotic_omitted2,
              if_other_please_specifyomit     :  this.postOpDay7Form.value.if_other_please_specifyomit ,
              if_other_please_specifyomit2     :  this.postOpDay7Form.value.if_other_please_specifyomit2 ,
              if_other_please_specify     :  this.postOpDay7Form.value.if_other_please_specify ,
              if_other_please_specify2     :  this.postOpDay7Form.value.if_other_please_specify2 ,
              if_other_please_specify3     :  this.postOpDay7Form.value.if_other_please_specify3 ,
              name_of_antibiotic_omm     :  this.postOpDay7Form.value.name_of_antibiotic_omm ,
              name_of_antibiotic_omm2     :  this.postOpDay7Form.value.name_of_antibiotic_omm2 ,
              name_of_antibiotic     :  this.postOpDay7Form.value.name_of_antibiotic ,
              name2_of_antibiotic     :  this.postOpDay7Form.value.name2_of_antibiotic ,     
              name3_of_antibiotic     :  this.postOpDay7Form.value.name3_of_antibiotic ,                       


              timeStamp: new Date().getTime()


            }

            this.patient.postopday7 = postOp7;
            this.patient.timeStamp = new Date().getTime();
            this.data.updatePatient(this.patient, '-newPostOpDay7-')
            this.sync.invokeSendDataThroughSocket(postOp7, '-updatePostOpDay7-', this.patient.patientId);

          }

        }
  

}

@Component({
  templateUrl: 'intraOplist.html',
})
export class ModalContentPage11 { // IntraOp list
  
  public patient;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public modalCtrl: ModalController, public navParams: NavParams, public data: DataProvider ) {
    this.patient = navParams.get("patient")
    console.log('patient inside the intraOp list modal ', this.patient)
    
  }

  ionViewDidLoad() {
    this.sortIntraOps();
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  sortIntraOps(){
    if (this.patient.intraOps) {
      this.patient.intraOps.sort((a: any, b: any) => {
        if (a.intraOpTimeStamp < b.intraOpTimeStamp) {
          return -1;
        } else if (a.intraOpTimeStamp > b.intraOpTimeStamp) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  addIntraOp(){
    let intraOp = {patient: this.patient, intraOp: null};
    let modal = this.modalCtrl.create(ModalContentPage2, intraOp);
    modal.present();
  }

  editIntraOp(intraOp){
    let data = {patient: this.patient, intraOp: intraOp};
    let modal = this.modalCtrl.create(ModalContentPage2, data);
    modal.present();
  }
}