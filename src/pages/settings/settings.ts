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
  public setIntervalHandlerConn;
  public setIntervalHandlerSync;

  constructor(public navCtrl: NavController, public navParams: NavParams, public data : DataProvider,  public socket : SocketProvider) {
    this.socket.getSocketConnectionStatus().then((status=>{
      this.socketStatus = status;
    }))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.checkSync()
    
    this.setIntervalHandlerConn = setInterval(()=>{
      this.checkConnectivity()
    }, 1000)

    this.setIntervalHandlerSync = setInterval(()=>{
      this.checkSync()
    }, 10000)
    
  }

  ionViewWillLeave(){
    clearInterval(this.setIntervalHandlerConn);
    clearInterval(this.setIntervalHandlerSync);
  }

  async checkSync(){
    this.data.getDataFromTempDbToSettings().then(res=>{
      console.log(res)
      this.tempData = res;
      console.log('recieved tempdata ', this.tempData)
    })
  }

  async checkConnectivity(){

    
    this.socket.getSocketConnectionStatus().then((status=>{
      this.socketStatus = status;
    }))

  }

}
