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

  // async removeTestData(){
  //   let testData = await this.data.getPatients()
  //   console.log(testData.length)
  //   if(testData.length > 0){
  //     testData.forEach((_item, _index)=>{
  //       // console.log(item)
  //       let item = _item;
  //       let index = _index;

  //       window.setTimeout(()=>{
  //         let dischargeData = {
  //           disId : UUID(),
  //           dischargeDate : '',
  //           dischargeTime : '',
  //           survivalStatus : '',
  //           dischargeDestination : '',
  //           lastReportedTropanin : '',
  //           aspirin : '',
  //           clopidogrel        : '',
  //           prasugrel     : '',
  //           ticagrelor     : '',
  //           unfractionatedHeparin       : '',
  //           lowMolecularWeightHeparin      : '',
  //           glycoproteinIIbInhibitors     : '',
  //           glycoproteinIIIbInhibitors      : '',
  //           bivalirudin      : '',
  //           fondaparinux      : '',
  //           warfarin      : '',
  //           none1      : '',
  //           cpr     : '',
  //           defibrillation        : '',
  //           stentThrombosis     : '',
  //           unplannedCriticalCareAdmission     : '',
  //           vasopressors       : '',
  //           none2      : '',
      
      
  //           timeStamp: new Date().getTime()
  //         }
  //         this.data.removePatient(item.patientId);
  //         this.sync.invokeSendDataThroughSocket(dischargeData, '-discharge-', item.patientId);
  //       }, 100 * index)

        
  //     }) 
  //   }
    
  //  }

  // loadTestData(){
  //   for (let index = 1; index < 100; index++) {
  //     let admissionData = {
  //       patientId : UUID(),
  //       patientName: `test${index}`,
  //       cprGiven: {
  //         cpr : '',
  //         defibrillation : '',
  //         thrombolysis : '',
  //         vasoactiveDrugs : '',
  //         furosemide : '',
  //         ventilation : '',
  //         none : '',
  //       },
  //       gender: '',
  //       age: '',
  //       nic: '',
  //       contactNumber: '',
  //       admission_date: '',
  //       dateOfHospitalArrival: '',
  //       timeOfHospitalArrival: '',
  //       bht: index,
  //       ward_number: '',
  //       admission_type: '',
  //       comorbidities: {
  //         cancer_immune : '',
  //         coagulapathy : '',
  //         endocrine : '',
  //         gastrointestinal : '',
  //         liver : '',
  //         myocardial : '',
  //         neurologic : '',
  //         pulmonary : '',
  //         renal : '',          
  //         vascular : '',                    
  //         dyslipidemia : '',
  //         psychiatric_disorder : '',
  //         non_documented : '',
  //       },
  //       modeOfTransportation: '',
  //       transferredFrom: '',
  //       pciOrThrombolysis: '',
  //       raisedJvp: '',
  //       numberOfVasoDrugs: '',
  //       ecgReferral: '',
  //       dateOfFirstEcg: '',
  //       timeOfFirstEcg: '',
  //       admittedFor: '',
  //       analgesiaGiven: '',
  //       weight: '50',
  //       height: '100',
  //       admission_report_date: '',
  //       timeStamp: new Date().getTime()
  
  //     }
  //     console.log(admissionData);
  //     this.data.saveNewPatient(admissionData);
  //     this.sync.invokeSendDataThroughSocket(admissionData, '-newAdmission-', admissionData.patientId)
      
  //   }
  // }

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
  public freeTextDiagVisibility = false;
  public codeData = [];
  public selectedCodeData;
  public selectedCode = '';
  public systems;
  public systemsOps = [
    {id: '11', value :'Gastrointestinal'},
    {id: '12', value :'Genitourinary'},
    {id: '13', value :'Neurological'},
    {id: '14', value :'Respiratory'},
    {id: '15', value :'Musculoskeletal/Skin'},
    {id: '16', value :'Trauma'},
    {id: '17', value :'Hematology'},
    {id: '20', value :'Cardiovascular'},
   ];
  public systemsNonOps = [
    {id: '11', value :'Gastrointestinal'},
    {id: '12', value :'Genitourinary'},
    {id: '13', value :'Neurological'},
    {id: '14', value :'Respiratory'},
    {id: '15', value :'Musculoskeletal/Skin'},
    {id: '16', value :'Trauma'},
    {id: '17', value :'Hematology'},
    {id: '20', value :'Cardiovascular'},
   ];
  public systemsVisibility = '';

  public wardsList = [
    {id:'1',name:'CWA'},
    {id:'2',name:'CWB'},
    {id:'3',name:'CWC'},
    {id:'4',name:'HDU'},
    {id:'5',name:'ITU'},
    {id:'6',name:'Other'},
    {id:'7',name:'PN'},
    {id:'8',name:'EMN'},
  ]
  

  constructor(public data: DataProvider ,public viewCtrl: ViewController, public formBuilder: FormBuilder, public modalCtrl: ModalController, public sync : SyncProvider  ) {
    
    this.admissionForm = this.formBuilder.group({
      patientName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age_years: ['', [Validators.required]],
      age_months: [''],
      age_days: [''],
      nic: [''],
      if_other_ward: [''],
      pre_operative_hb: [''],
      contactNumber: [''],
      admission_date: ['', [Validators.required]],
      dateOfHospitalArrival: [''],
      timeOfHospitalArrival: [''],
      bht: [''],
      ward_number: ['', [Validators.required]],
      admission_type: ['', [Validators.required]],
      pre_operative_hb_avl: formBuilder.group({
        not_available      : [ false ],
      }),
      comorbidities: formBuilder.group({
        hiv      : [ false ],
        none      : [ false ],
        other      : [ false ]
      }),
      if_other_please_specify_comorbi: [''],     
      cd4: [''],     
      feverad: [''],
      // modeOfTransportation: [''],
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
      // analgesiaGiven: [''],
      admittedFor: [''],
    //   reinfarction: formBuilder.group({
    //     thrombosis     : [ false ],
    //     stentThrombosis      : [ false ]
    //  }),
      weight: [''],
      height: [''],
      admission_report_date: [''],
      opOrnonOp: ['', [Validators.required]],
      system: ['', [Validators.required]],
      code: ['', [Validators.required]],
      freeTextDiag: [''],
    });
    
  }

  dismiss(){
    if(this.admissionForm.dirty && this.admissionForm.valid){
      this.saveAdmission();
      this.viewCtrl.dismiss();
    } else if (this.admissionForm.dirty) {
      this.admissionForm.get('ward_number').markAsTouched()
      this.admissionForm.get('patientName').markAsTouched()
      this.admissionForm.get('admission_date').markAsTouched()
      this.admissionForm.get('gender').markAsTouched()
      this.admissionForm.get('admission_type').markAsTouched()
      this.admissionForm.get('opOrnonOp').markAsTouched()
      this.admissionForm.get('system').markAsTouched()
      this.admissionForm.get('code').markAsTouched()
      this.admissionForm.get('age_years').markAsTouched()

    } else {
      this.viewCtrl.dismiss();
    }
    
  }

  changeFreeTextVisibility(e) {
    console.log('changeFreeTextVisibility')
    this.admissionForm.controls.freeTextDiag.setValue('');
    if(this.admissionForm.value.code.apacheDiag == 'Other'){
      this.freeTextDiagVisibility = true;
    }

    else {
      this.freeTextDiagVisibility = false;
    }
  }

  generateCodes (e){
    this.freeTextDiagVisibility = false;
    this.admissionForm.controls.freeTextDiag.setValue('');
    console.log(e)
    let tempCodeData = 
    [
      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'Herniorrhaphy',
        snomed: 'Hernia repair',
        snomedCode: '50465008'
      },
      {
        type: 'non-op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI Abscess/cyst',
        snomed: 'Incision and drainage of abscess',
        snomedCode: '284181007'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Simple excision of inguinal hernial sac',
        snomedCode: '177854007'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'Complications of previous GI surgery; surgery for (anastomotic leak, bleeding, abscess, infection, dehiscence, etc.)',
        snomed: 'Incision and drainage of abscess',
        snomedCode: '50465008'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'Fistula/abscess, surgery for (not inflammatory bowel disease)',
        snomed: 'Incision and drainage of abscess',
        snomedCode: '50465008'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI Abscess/cyst-primary, surgery for',
        snomed: 'Incision and drainage of abscess',
        snomedCode: '50465008'
      },

      {
        type: 'op',
        apacheGroup: 'Genitourinary',
        apacheDiag: 'Renal infection/abscess',
        snomed: 'Incision and drainage of abscess',
        snomedCode: '50465008'
      },

      {
        type: 'op',
        apacheGroup: 'Neurological',
        apacheDiag: 'Abscess, neurologic',
        snomed: 'Incision and drainage of abscess',
        snomedCode: '50465008'
      },

      {
        type: 'op',
        apacheGroup: 'Neurological',
        apacheDiag: 'Abscess/infection-cranial, surgery for',
        snomed: 'Incision and drainage of abscess',
        snomedCode: '50465008'
      },

      {
        type: 'op',
        apacheGroup: 'Respiratory',
        apacheDiag: 'Infection/abscess, other surgery for',
        snomed: 'Incision and drainage of abscess',
        snomedCode: '50465008'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'Herniorrhaphy',
        snomed: 'Repair of umbilical hernia',
        snomedCode: '44946007'
      },

      {
        type: 'op',
        apacheGroup: 'Musculoskeletal/Skin',
        apacheDiag: 'Grafting, skin (all)',
        snomed: 'Skin graft operation',
        snomedCode: '304040003'
      },

      {
        type: 'op',
        apacheGroup: 'Musculoskeletal/Skin',
        apacheDiag: 'Burn',
        snomed: 'Skin graft operation',
        snomedCode: '304040003'
      },

      {
        type: 'op',
        apacheGroup: 'Musculoskeletal/Skin',
        apacheDiag: 'Skin surgery, other',
        snomed: 'Excision',
        snomedCode: '65801008'
      },

      {
        type: 'op',
        apacheGroup: 'Musculoskeletal/Skin',
        apacheDiag: 'Skin surgery, other',
        snomed: 'Excision',
        snomedCode: '65801008'
      },

      {
        type: 'op',
        apacheGroup: 'Musculoskeletal/Skin',
        apacheDiag: 'Skin surgery, other',
        snomed: 'Excision',
        snomedCode: '65801008'
      },

      {
        type: 'op',
        apacheGroup: 'Musculoskeletal/Skin',
        apacheDiag: 'Amputation (non-traumatic)',
        snomed: 'Amputation',
        snomedCode: '81723002'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Biopsy of rectum',
        snomedCode: '54686006'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Fitting stoma bag',
        snomedCode: '225176002'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: ' Removing stoma bag',
        snomedCode: '225185002'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: ' Lateral sphincterotomy',
        snomedCode: '174385004'
      },


      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Repair of anus',
        snomedCode: '47118000'
      },


      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Fitting stoma bag',
        snomedCode: '225176002'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Removing stoma bag',
        snomedCode: '225185002'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: ' Posterior sagittal anorectoplasty',
        snomedCode: '235374000'
      },


      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Small intestinal strictureplasty',
        snomedCode: '302354002'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Laparotomy',
        snomedCode: '86481000'
      },

      {


        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'Appendectomy',
        snomed: 'Appendectomy',
        snomedCode: '80146002'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI Obstruction, surgery for (including lysis of adhesions)',
        snomed: 'Open reduction of intussusception of intestine',
        snomedCode: '713046002'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Reconstruction of abdominal wall',
        snomedCode: '238212008'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Repair of omphalocele',
        snomedCode: '30502000'
      },

      {
        type: 'op',
        apacheGroup: 'Trauma',
        apacheDiag: 'Abdomen/extremity trauma, surgery for',
        snomed: 'Repair of liver laceration',
        snomedCode: '397239004'
      },

      {
        type: 'op',
        apacheGroup: 'Trauma',
        apacheDiag: 'Abdomen only trauma, surgery for',
        snomed: 'Splenectomy',
        snomedCode: '234319005'
      },

      {
        type: 'op',
        apacheGroup: 'Trauma',
        apacheDiag: 'Abdomen/face trauma, surgery for',
        snomed: ' Packing of liver laceration',
        snomedCode: '174440001'
      },

      {
        type: 'op',
        apacheGroup: 'Trauma',
        apacheDiag: 'Abdomen/multiple trauma, surgery for',
        snomed: 'Repair of perforated colon',
        snomedCode: '307709007'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI Obstruction, surgery for (including lysis of adhesions)',
        snomed: 'Duodenostomy',
        snomedCode: '30582003'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI Obstruction, surgery for (including lysis of adhesions)',
        snomed: 'Pyloromyotomy',
        snomedCode: '173788005'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Laparotomy and division of peritoneal adhesions',
        snomedCode: '287853009'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Fitting stoma bag',
        snomedCode: '225176002'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Removing stoma bag',
        snomedCode: '225185002'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Excision',
        snomedCode: '65801008'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Lysis of adhesions',
        snomedCode: '39270003'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Gastrostomy',
        snomedCode: '54956002'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Endoscopy',
        snomedCode: '423827005'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Pancreatectomy',
        snomedCode: '33149006'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'GI surgery, other',
        snomed: 'Pyloroplasty',
        snomedCode: '363742001'
      },


      {
        type: 'op',
        apacheGroup: 'Genitourinary',
        apacheDiag: 'Nephrectomy for neoplasm',
        snomed: ' Total nephrectomy',
        snomedCode: '175905003'
      },

      {
        type: 'op',
        apacheGroup: 'Musculoskeletal/Skin',
        apacheDiag: 'Orthopedic surgery, other',
        snomed: 'Excision of lesion of bone',
        snomedCode: '68471001'
      },

      {
        type: 'op',
        apacheGroup: 'Musculoskeletal/Skin',
        apacheDiag: 'Orthopedic surgery, other',
        snomed: 'Excision ',
        snomedCode: '65801008'
      },

      {
        type: 'op',
        apacheGroup: 'Hematology',
        apacheDiag: 'Hematologic surgery, other',
        snomed: 'Biopsy of lymph node ',
        snomedCode: '21911005'
      },

      {
        type: 'op',
        apacheGroup: 'Neurological',
        apacheDiag: 'Neurologic surgery, other',
        snomed: 'Excision ',
        snomedCode: '65801008'
      },

      {
        type: 'op',
        apacheGroup: 'Genitourinary',
        apacheDiag: 'Oophorectomy with/without salpingectomy with/without lymph node dissection',
        snomed: 'Oophorectomy',
        snomedCode: '83152002'
      },

      {
        type: 'op',
        apacheGroup: 'Genitourinary',
        apacheDiag: 'Orchiectomy with/without pelvic lymph node dissection',
        snomed: 'Total orchidectomy',
        snomedCode: '236334001'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'Splenectomy',
        snomed: 'Splenectomy',
        snomedCode: '234319005'
      },

      {
        type: 'op',
        apacheGroup: 'Genitourinary',
        apacheDiag: 'Genitourinary surgery, other',
        snomed: ' Ligation',
        snomedCode: '70751009'
      },

      {
        type: 'op',
        apacheGroup: 'Genitourinary',
        apacheDiag: 'Genitourinary surgery, other',
        snomed: 'Orchidopexy',
        snomedCode: '85419002'
      },

      {
        type: 'op',
        apacheGroup: 'Genitourinary',
        apacheDiag: 'Orchiectomy with/without pelvic lymph node dissection',
        snomed: 'Total orchidectomy',
        snomedCode: '236334001'
      },

      {
        type: 'op',
        apacheGroup: 'Genitourinary',
        apacheDiag: 'Obstruction/other, surgery for (with or without ileal-conduit)',
        snomed: 'Hook ablation of posterior urethral valve',
        snomedCode: '176374004'
      },

      {
        type: 'op',
        apacheGroup: 'Genitourinary',
        apacheDiag: 'Obstruction/other, surgery for (with or without ileal-conduit)',
        snomed: 'Procedure involving suprapubic catheter',
        snomedCode: '429516009'
      },

      {
        type: 'op',
        apacheGroup: 'Genitourinary',
        apacheDiag: 'Obstruction/other, surgery for (with or without ileal-conduit)',
        snomed: 'Insertion of temporary peritoneal dialysis catheter',
        snomedCode: '180277007'
      },

      {
        type: 'op',
        apacheGroup: 'Genitourinary',
        apacheDiag: 'Genitourinary surgery, other',
        snomed: ' Ureterosigmoidostomy',
        snomedCode: ' Ureterosigmoidostomy'
      },

      {
        type: 'op',
        apacheGroup: 'Genitourinary',
        apacheDiag: 'Obstruction/other, surgery for (with or without ileal-conduit)',
        snomed: ' Nephrostomy',
        snomedCode: '39834009'
      },

      {
        type: 'op',
        apacheGroup: 'Genitourinary',
        apacheDiag: 'Genitourinary surgery, other',
        snomed: ' Hypospadias repair',
        snomedCode: '274040007'
      },

      {
        type: 'op',
        apacheGroup: 'Respiratory',
        apacheDiag: 'Tracheostomy',
        snomed: 'Incision of trachea',
        snomedCode: '48387007'
      },

      {
        type: 'op',
        apacheGroup: 'Respiratory',
        apacheDiag: 'Respiratory surgery, other',
        snomed: 'Removal of foreign body from mouth',
        snomedCode: '300231003'
      },

      {
        type: 'op',
        apacheGroup: 'Respiratory',
        apacheDiag: 'Thoracotomy for pleural disease',
        snomed: 'Insertion of pleural tube drain',
        snomedCode: '264957007'
      },

      {
        type: 'op',
        apacheGroup: 'Respiratory',
        apacheDiag: 'Respiratory surgery, other',
        snomed: 'Primary repair of esophageal atresia',
        snomedCode: '235173003'
      },

      {
        type: 'op',
        apacheGroup: 'Respiratory',
        apacheDiag: 'Respiratory surgery, other',
        snomed: 'Secondary repair for esophageal atresia ',
        snomedCode: '235174009'
      },

      {
        type: 'op',
        apacheGroup: 'Respiratory',
        apacheDiag: 'Respiratory surgery, other',
        snomed: 'Esophageal atresia, stenosis and fistula',
        snomedCode: '268201001'
      },

      {
        type: 'op',
        apacheGroup: 'Respiratory',
        apacheDiag: 'Respiratory surgery, other',
        snomed: 'Esophageal atresia with tracheoesophageal fistula',
        snomedCode: '204659003'
      },

      {
        type: 'op',
        apacheGroup: 'Respiratory',
        apacheDiag: 'Respiratory surgery, other',
        snomed: ' Repair of diaphragmatic hernia ',
        snomedCode: '112977000'
      },

      {
        type: 'op',
        apacheGroup: 'Cardiovascular',
        apacheDiag: 'Congenital Defect Repair (Other)',
        snomed: 'Ligation of ductus arteriosus',
        snomedCode: '175212004'
      },


      {
        type: 'op',
        apacheGroup: 'Neurological',
        apacheDiag: 'Spinal cord sugery, other',
        snomed: 'Repair of spina bifida',
        snomedCode: '19054000'
      },


      {
        type: 'op',
        apacheGroup: 'Neurological',
        apacheDiag: 'Shunts and revisions',
        snomed: 'Ventriculoperitoneal shunt',
        snomedCode: '47020004'
      },

      {
        type: 'op',
        apacheGroup: 'Neurological',
        apacheDiag: 'Shunts and revisions',
        snomed: 'Removal of ventriculoperitoneal shunt',
        snomedCode: '230878007'
      },

      {
        type: 'op',
        apacheGroup: 'Neurological',
        apacheDiag: 'Shunts and revisions',
        snomed: 'Revision of ventriculoperitoneal shunt',
        snomedCode: '442432004'
      },

      {
        type: 'op',
        apacheGroup: 'Neurological',
        apacheDiag: 'Shunts and revisions',
        snomed: 'Repair of encephalocele',
        snomedCode: '230835002'
      },

      {
        type: 'op',
        apacheGroup: 'Neurological',
        apacheDiag: 'Neurologic surgery, other',
        snomed: 'Repair of encephalocele',
        snomedCode: '230835002'
      },


      {
        type: 'op',
        apacheGroup: 'Neurological',
        apacheDiag: 'Hemorrhage/hematoma-intracranial, surgery for',
        snomed: 'Craniotomy',
        snomedCode: '25353009'
      },


      {
        type: 'op',
        apacheGroup: 'Neurological',
        apacheDiag: 'Burr hole placement',
        snomed: 'Trephination of cranium',
        snomedCode: '67864003'
      },

      {
        type: 'non-op',
        apacheGroup: 'Neurological',
        apacheDiag: 'Other',
        snomed: 'Other',
        snomedCode: '001'
      },

      {
        type: 'non-op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'Other',
        snomed: 'Other',
        snomedCode: '001'
      },

      {
        type: 'non-op',
        apacheGroup: 'Genitourinary',
        apacheDiag: 'Other',
        snomed: 'Other',
        snomedCode: '001'
      },

      {
        type: 'non-op',
        apacheGroup: 'Respiratory',
        apacheDiag: 'Other',
        snomed: 'Other',
        snomedCode: '001'
      },

      {
        type: 'non-op',
        apacheGroup: 'Musculoskeletal/Skin',
        apacheDiag: 'Other',
        snomed: 'Other',
        snomedCode: '001'
      },

      {
        type: 'non-op',
        apacheGroup: 'Trauma',
        apacheDiag: 'Other',
        snomed: 'Other',
        snomedCode: '001'
      },

      {
        type: 'non-op',
        apacheGroup: 'Hematology',
        apacheDiag: 'Other',
        snomed: 'Other',
        snomedCode: '001'
      },

      {
        type: 'non-op',
        apacheGroup: 'Cardiovascular',
        apacheDiag: 'Other',
        snomed: 'Other',
        snomedCode: '001'
      },

      {
        type: 'op',
        apacheGroup: 'Neurological',
        apacheDiag: 'Other',
        snomed: 'Other',
        snomedCode: '001'
      },

      {
        type: 'op',
        apacheGroup: 'Gastrointestinal',
        apacheDiag: 'Other',
        snomed: 'Other',
        snomedCode: '001'
      },

      {
        type: 'op',
        apacheGroup: 'Genitourinary',
        apacheDiag: 'Other',
        snomed: 'Other',
        snomedCode: '001'
      },

      {
        type: 'op',
        apacheGroup: 'Respiratory',
        apacheDiag: 'Other',
        snomed: 'Other',
        snomedCode: '001'
      },

      {
        type: 'op',
        apacheGroup: 'Musculoskeletal/Skin',
        apacheDiag: 'Other',
        snomed: 'Other',
        snomedCode: '001'
      },

      {
        type: 'op',
        apacheGroup: 'Trauma',
        apacheDiag: 'Other',
        snomed: 'Other',
        snomedCode: '001'
      },

      {
        type: 'op',
        apacheGroup: 'Hematology',
        apacheDiag: 'Other',
        snomed: 'Other',
        snomedCode: '001'
      },

      {
        type: 'op',
        apacheGroup: 'Cardiovascular',
        apacheDiag: 'Other',
        snomed: 'Other',
        snomedCode: '001'
      },

    ]
    this.admissionForm.value.code = '';
    this.selectedCodeData = [];
    console.log(this.selectedCodeData)
    let opOrnonOp = this.admissionForm.value.opOrnonOp;
    let system = this.admissionForm.value.system;
    // console.log('tempCodeData length ', tempCodeData.length)
    const tempArr = tempCodeData.filter((code)=>{
      // console.log('code ', code);
        return code.type == opOrnonOp && code.apacheGroup == system.value
    }).map(_item=>{
      let item: any = _item;
      item.id = Math.random() * 100;
      return item;
    })
    let apacheCollection = [];
    tempArr.forEach(item=>{
      console.log(item)
      if((apacheCollection.indexOf(item.apacheDiag)== -1)){
        console.log('not there');
        apacheCollection.push(item.apacheDiag)
        this.selectedCodeData.push(item)
      }
    })
    // this.selectedCodeData = tempArr;
    // console.log(this.selectedCodeData)
    // this.admissionForm.value.code = '';
  }

  makeCodeandSystemEmpty(e) {
    this.freeTextDiagVisibility = false;
    this.admissionForm.controls.freeTextDiag.setValue('');

    this.systems = [];
    this.selectedCodeData = []
    
    // this.admissionForm.value.system = '';
    if (this.admissionForm.value.opOrnonOp == 'op') {
      // setTimeout(()=>{
      //   this.systems = this.systemsOps;
      // }, 500)
      // this.systemsNonOps = [];
      this.systems = [
        {id: '11', value :'Gastrointestinal'},
        {id: '12', value :'Genitourinary'},
        {id: '13', value :'Neurological'},
        {id: '14', value :'Respiratory'},
        {id: '15', value :'Musculoskeletal/Skin'},
        {id: '16', value :'Trauma'},
        {id: '17', value :'Hematology'},
        {id: '20', value :'Cardiovascular'},
       ].map(_item=>{
        let item: any = _item;
        item.id = Math.random() * 100;
        return item;
      })
      // this.systemsVisibility = 'op';
    } else if (this.admissionForm.value.opOrnonOp == 'non-op'){
      // this.systemsOps = [];
      this.systems = [
        {id: '11', value :'Gastrointestinal'},
        {id: '12', value :'Genitourinary'},
        {id: '13', value :'Neurological'},
        {id: '14', value :'Respiratory'},
        {id: '15', value :'Musculoskeletal/Skin'},
        {id: '16', value :'Trauma'},
        {id: '17', value :'Hematology'},
        {id: '20', value :'Cardiovascular'},
       ].map(_item=>{
        let item: any = _item;
        item.id = Math.random() * 100;
        return item;
      })
      // setTimeout(()=>{
      //   this.systems = this.systemsNonOps;
      // }, 500)
      // this.systems = this.systemsNonOps;
      // this.systemsVisibility = 'non-op';
    }
    this.selectedCodeData = [];
    // console.log(this.selectedCodeData)
    
    this.admissionForm.value.code = '';
    this.admissionForm.value.system = '';
    
    // console.log(this.admissionForm.value.code);
    // console.log(this.admissionForm.value.system)
    
    
  }

  saveAdmission(){

    let admissionData = {
      patientId : UUID(),
      patientName: this.admissionForm.value.patientName,
      // cprGiven: {
      //   cpr : this.admissionForm.value.cprGiven.cpr,
      //   defibrillation : this.admissionForm.value.cprGiven.defibrillation,
      //   thrombolysis : this.admissionForm.value.cprGiven.thrombolysis,
      //   vasoactiveDrugs : this.admissionForm.value.cprGiven.vasoactiveDrugs,
      //   furosemide : this.admissionForm.value.cprGiven.furosemide,
      //   ventilation : this.admissionForm.value.cprGiven.ventilation,
      //   none : this.admissionForm.value.cprGiven.none,
      // },
      gender: this.admissionForm.value.gender,
      age: this.admissionForm.value.age,
      age_unit: this.admissionForm.value.age_unit,
      if_other_ward: this.admissionForm.value.if_other_ward,
      pre_operative_hb: this.admissionForm.value.pre_operative_hb,
      contactNumber: this.admissionForm.value.contactNumber,
      admission_date: this.admissionForm.value.admission_date,
      dateOfHospitalArrival: this.admissionForm.value.dateOfHospitalArrival,
      timeOfHospitalArrival: this.admissionForm.value.timeOfHospitalArrival,
      bht: this.admissionForm.value.bht,
      ward_number: this.admissionForm.value.ward_number,
      admission_type: this.admissionForm.value.admission_type,
      pre_operative_hb_avl:  this.admissionForm.value.pre_operative_hb_avl.not_available, 
      comorbidities: {
        hiv : this.admissionForm.value.comorbidities.hiv,
        none : this.admissionForm.value.comorbidities.none,
        other : this.admissionForm.value.comorbidities.other,
      },                   
      if_other_please_specify_comorbi: this.admissionForm.value.if_other_please_specify_comorbi,      
      cd4: this.admissionForm.value.cd4,
      feverad: this.admissionForm.value.feverad,      
      // transferredFrom: this.admissionForm.value.transferredFrom,
      // pciOrThrombolysis: this.admissionForm.value.pciOrThrombolysis,
      // raisedJvp: this.admissionForm.value.raisedJvp,
      // numberOfVasoDrugs: this.admissionForm.value.numberOfVasoDrugs,
      // ecgReferral: this.admissionForm.value.ecgReferral,
      // dateOfFirstEcg: this.admissionForm.value.dateOfFirstEcg,
      // timeOfFirstEcg: this.admissionForm.value.timeOfFirstEcg,
      // admittedFor: this.admissionForm.value.admittedFor,
      // analgesiaGiven: this.admissionForm.value.analgesiaGiven,
      weight: this.admissionForm.value.weight,
      height: this.admissionForm.value.height,
      opOrnonOp : this.admissionForm.value.opOrnonOp,
      system : this.admissionForm.value.system,
      code : this.admissionForm.value.code,
      freeTextDiag : this.admissionForm.value.freeTextDiag ? this.admissionForm.value.freeTextDiag: '',
      admission_report_date: this.admissionForm.value.admission_report_date,
      timeStamp: new Date().getTime()

    }
    console.log(admissionData);
    this.data.saveNewPatient(admissionData);
    this.sync.invokeSendDataThroughSocket(admissionData, '-newAdmission-', admissionData.patientId)
  }

  


}
