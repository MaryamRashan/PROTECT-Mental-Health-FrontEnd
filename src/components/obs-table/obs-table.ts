import { Component, Input, OnInit } from '@angular/core';

/**
 * Generated class for the ObsTableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'obs-table',
  templateUrl: 'obs-table.html'
})
export class ObsTableComponent implements OnInit {

  
  @Input() obs;

  text: string;
  public transformedObs;
  public sortedObs;

  constructor() {
    
    this.text = 'Hello World';
  }

  ngOnInit(): void {
    console.log('Hello ObsTableComponent Component', this.obs);
    this.arrangeData();
  }

  arrangeData(){
    
    this.sortedObs = this.obs.sort(function(a, b){
        return a.obsTimeStamp - b.obsTimeStamp;
    });

    this.transformData();

  }

  // ionViewDidLoad(){
  //   console.log('Hello ObsTableComponent Component', this.obs);
  // }

  async transformData() {

    const transformedData = [];
    let currentDate = this.sortedObs[0].obsDate;
    console.log('transformData()', this.sortedObs);

    // let tfip = this.sortedObs[0].fluidInput ? this.sortedObs[0].fluidInput : 0 ;
    // let tuop = this.sortedObs[0].urineOutput ? this.sortedObs[0].urineOutput : 0;
    // let balance = tfip - tuop;
    // let tfip = 0 ;
    // let tuop = 0;
    // let balance = 0;
    const datesArray = this.sortedObs.map((ob) => {
        return ob.obsDate;
    });

    console.log('datesArray', datesArray);

    const uniqueDatesArray = datesArray.filter(function(item, pos){
      return datesArray.indexOf(item) === pos;
    });

    console.log('uniqueDatesArray', uniqueDatesArray);

    uniqueDatesArray.forEach(uniqueDate => {

      console.log('newDate',uniqueDate)
      let tfip = 0 ;
      let tuop = 0;
      let balance = 0;

      let perDayObs = this.sortedObs.filter((ob) => {
        return ob.obsDate === uniqueDate;
      });

      perDayObs.forEach(ob => {

        tfip = tfip + +ob.fluidInput;
        ob.tfip = tfip;


        tuop = tuop + +ob.urineOutput;
        ob.tuop = tuop ;

        // balance = balance + (ob.fluidInput - ob.urineOutput)
        ob.fluidBalance = tfip - tuop;

        console.log('obsTimeStamp',ob.obsTimeStamp)
        console.log('ob',ob)
        transformedData.push(ob)
        
      });

    });

    // const transformedData = [];
    // this.sortedObs.forEach(ob => {
    //   let dateTimeStamp = new Date (ob.obsDate).getTime();
    //   console.log('dateTimeStamp', dateTimeStamp);
    //   if (ob.obsDate === currentDate) {
    //     if (ob.obsTimeStamp < dateTimeStamp + 21600 * 1000) {
    //       ob.tfip = tfip + ob.fluidInput;
    //       ob.tuop = tuop + ob.urineOutput;
    //       ob.fluidBalance = balance + (ob.fluidInput - ob.urineOutput)
    //       transformedData.push(ob)
    //     }
    //   } else {
    //     currentDate = ob.obsDate;
    //     if (ob.obsTimeStamp > dateTimeStamp + 21600 * 1000) {
    //       ob.tfip = tfip + ob.fluidInput;
    //       ob.tuop = tuop + ob.urineOutput;
    //       ob.fluidBalance = balance + (ob.fluidInput - ob.urineOutput)
    //       transformedData.push(ob)
    //     }
    //   }
      
    // });
    console.log('transformedData ', transformedData );
    this.transformedObs = transformedData;

  }

}
