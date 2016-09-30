import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AnonymousListPage } from '../anonymous-list/anonymous-list';
import { AuthData } from '../../providers/auth-data/auth-data';

@Component({
  templateUrl: 'build/pages/landing/landing.html',
  providers: [AuthData]
})
export class LandingPage {

  constructor(private navCtrl: NavController, public authData: AuthData) {

  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  goToList(){
    this.authData.createAnonymousUser().then( () => {
      // this.navCtrl.setRoot(AnonymousListPage);
      this.navCtrl.push(AnonymousListPage);
    });
  }

}