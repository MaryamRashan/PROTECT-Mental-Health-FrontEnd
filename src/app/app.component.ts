import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { SettingsPage } from '../pages/settings/settings';

import { DataProvider } from '../providers/data/data';
import { SocketProvider } from '../providers/socket/socket';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public data: DataProvider, public socket: SocketProvider) {
    this.initializeApp();
    this.checkLoginStatus();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Logout', component: LoginPage},
      { title: 'Home', component: HomePage },
      { title: 'Settings', component: SettingsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  async checkLoginStatus(){
    let token = await this.data.getUserToken();
    if (token){
      this.rootPage = HomePage;
      setTimeout(()=>{
        this.socket.openDataConnection()
      },2000)
    } else {
      this.rootPage = LoginPage;
    }
  }
}
