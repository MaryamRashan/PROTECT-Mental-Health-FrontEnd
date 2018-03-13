import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public tempData;

  constructor(public navCtrl: NavController, public navParams: NavParams, public data : DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.data.getDataFromTempDbToSettings().then(res=>{
      console.log(res)
      this.tempData = res;
      console.log('recieved tempdata ', this.tempData)
    })
  }

}
