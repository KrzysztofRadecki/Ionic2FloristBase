import { LoginPage } from './../login/login';
import { AuthData } from './../../providers/auth-data/auth-data';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/home/home.html',
  providers:[AuthData]
})
export class HomePage {
  constructor(public navCtrl: NavController, public authData: AuthData ) {
  
  }

  logOut(){
    this.authData.logoutUser().then(() => {
    this.navCtrl.setRoot(LoginPage);
  });
}
}
