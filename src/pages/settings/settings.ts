import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { SocketProvider } from '../../providers/socket/socket';

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
  public socketStatus ;
  public setIntervalHandler

  constructor(public navCtrl: NavController, public navParams: NavParams, public data : DataProvider,  public socket : SocketProvider) {
    this.socket.getSocketConnectionStatus().then((status=>{
      this.socketStatus = status;
    }))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
 
    this.data.getDataFromTempDbToSettings().then(res=>{
      console.log(res)
      this.tempData = res;
      console.log('recieved tempdata ', this.tempData)
    })
    this.setIntervalHandler = setInterval(()=>{
      this.checkConnectivity()
    }, 1000)
    
  }

  ionViewWillLeave(){
    clearInterval(this.setIntervalHandler);
  }

  async checkConnectivity(){

    
    this.socket.getSocketConnectionStatus().then((status=>{
      this.socketStatus = status;
    }))

  }

}
