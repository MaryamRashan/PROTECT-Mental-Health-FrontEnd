import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';

import { ModalContentPage1 } from '../pages/list/list';
import { ModalContentPage2 } from '../pages/list/list';
import { ModalContentPage3 } from '../pages/list/list';
import { ModalContentPage4 } from '../pages/list/list';
import { ModalContentPage5 } from '../pages/list/list';
import { ModalContentPage6 } from '../pages/list/list';
import { ModalContentPage7 } from '../pages/list/list';
import { ModalContentPage8 } from '../pages/list/list';
import { ModalContentPage9 } from '../pages/list/list';
import { ModalContentPage10 } from '../pages/list/list';
import { ModalContentPage11 } from '../pages/list/list';
import { ModalContentPage13 } from '../pages/list/list';
import { ModalContentPage14 } from '../pages/list/list';


import { AddAdmissionModal } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { AuthProvider } from '../providers/auth/auth';
import { SocketProvider } from '../providers/socket/socket';
import { DeviceProvider } from '../providers/device/device';
import { SyncProvider } from '../providers/sync/sync';

import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ListPage,
    ModalContentPage1,
    ModalContentPage2,
    ModalContentPage3,
    ModalContentPage4,
    ModalContentPage5,
    ModalContentPage6,
    ModalContentPage7,
    ModalContentPage8,
    ModalContentPage9,
    ModalContentPage10,
    ModalContentPage11,
    ModalContentPage13,
    ModalContentPage14,
    AddAdmissionModal
  ],
  imports: [
    IonicStorageModule.forRoot({
      name: '__abdo',
         driverOrder: ['sqlite', 'indexeddb',  'websql']
    }),
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ListPage,
    ModalContentPage1,
    ModalContentPage2,
    ModalContentPage3,
    ModalContentPage4,
    ModalContentPage5,
    ModalContentPage6,
    ModalContentPage7,
    ModalContentPage8,
    ModalContentPage9,
    ModalContentPage10,
    ModalContentPage11,
    ModalContentPage13,
    ModalContentPage14,
    AddAdmissionModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    AuthProvider,
    SocketProvider,
    DeviceProvider,
    SyncProvider
  ]
})
export class AppModule {}
