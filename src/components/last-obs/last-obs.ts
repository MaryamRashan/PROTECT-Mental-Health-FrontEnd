import { Component, Input, OnChanges } from '@angular/core';

/**
 * Generated class for the LastObsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'last-obs',
  templateUrl: 'last-obs.html'
})
export class LastObsComponent implements OnChanges {

  @Input() obs ;
  public isDengue = false;
  // public obs;
  public sortedObs;
  public lastObsSet;
  public respiratoryRate;
  public heartRate;
  public temperature;
  public sbp;
  public dbp;    
  data: any;
  public rrTriggerStatus = false;
  public hrTriggerStatus = false;
  public pulsePressure;
  public saturation;
  public urineOutput;
  public wbc;
  public hemoglobin;
  public sugar;
  public platelets;
  public uop;
  public fip;
  public pcv;
  public crft;

  text: string;

  constructor() {
    console.log('Hello LastObsComponent Component');
    this.text = 'Hello World';
  }

  ngOnChanges(){
    console.log( 'child ngOnchange',this.obs)
      // if(this.admission){
              // if(this.obs.length > 0){
              //   this.logAdmission()
              //   }
              this.arrangeData()
            //   if(this.admission.reason == 'Dengue' || this.admission.reason == 'Dengue hemorrhagic fever' || this.admission.reason == 'Fever'){
            //   this.isDengue = true;
            //   console.log('isDengue', this.isDengue)
            // }else{
            //   this.isDengue = false;
            //   console.log('isDengue', this.isDengue)
            // }
      // }

            // if(this.obs.length > 0){
            //     this.logAdmission()
            //     }
  }


  arrangeData(){

    console.log('###########################################################')
    // this.obs = this.admission.obs;

        if (this.obs.length > 0){
              
            this.sortedObs = this.obs.sort(function(a, b){
                return a.obsTimeStamp - b.obsTimeStamp;
            });
            this.lastObsSet = this.sortedObs.slice(-1);
            this.respiratoryRate = this.lastObsSet[0].respiratoryRate;
            this.heartRate = this.lastObsSet[0].heartRate;
            this.temperature = this.lastObsSet[0].temperature;
            this.sbp = this.lastObsSet[0].sbp;
            this.dbp = this.lastObsSet[0].dbp;
            this.saturation = this.lastObsSet[0].saturation;
            this.urineOutput = this.lastObsSet[0].urineOutput;
            this.wbc = this.lastObsSet[0].wbc;
            this.hemoglobin = this.lastObsSet[0].hemoglobin;
            this.sugar = this.lastObsSet[0].sugar;
            this.platelets = this.lastObsSet[0].platelets;
            this.uop = this.lastObsSet[0].urineOutput;
            this.fip = this.lastObsSet[0].fluidInput;
            this.pcv = this.lastObsSet[0].pcv;
            this.crft = this.lastObsSet[0].crft;
            console.log(this.respiratoryRate)
            console.log(this.lastObsSet)

            if((this.sbp) && (this.dbp)){
              this.pulsePressure = this.sbp - this.dbp
            }

            if (this.respiratoryRate > 30 ){
                this.rrTriggerStatus = true;
            }

            if (this.heartRate > 104 ){
                this.hrTriggerStatus = true;
            }            
        }


  }


}
