import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, MenuController, ToastController } from 'ionic-angular';

import { AuthProvider } from './../../providers/auth/auth';
import { SocketProvider } from './../../providers/socket/socket';
import { DataProvider } from './../../providers/data/data';

import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private login : FormGroup;

  constructor(public navCtrl: NavController, public menu: MenuController, public toastCtrl: ToastController, public navParams: NavParams, private formBuilder: FormBuilder, private auth: AuthProvider, public socket: SocketProvider, public data: DataProvider) {
    this.login = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  submit(){
    // this.socket.openDataConnection()
    console.log(this.login.value)
    this.auth.login(this.login.value)
      .then(result =>{
        
        if(result){
          this.data.saveUserData(result).then(result=>{
            this.navCtrl.setRoot(HomePage)
            this.socket.openDataConnection()
          })
          // this.navCtrl.setRoot(HomePage)
          // setTimeout(()=>{
          //   this.socket.openDataConnection()
          // },2000)
        }
      })
      .catch(err =>{
        let _err :any = err;
        
        if (_err.status == 401){
          console.log('err >>> login failed', _err)
          let toast = this.toastCtrl.create({
            message: 'Login failed, Please check spellings',
            duration: 3000
          });
          toast.present();
        } else if (_err.status == 400){
          console.log('err >>> login failed', _err)
          let toast = this.toastCtrl.create({
            message: 'Login failed, Please fill both fields',
            duration: 3000
          });
          toast.present();
        }
      })

      
  }

}
