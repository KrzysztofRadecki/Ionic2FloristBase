import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LandingPage } from '../landing/landing';
import { SignupPage } from '../signup/signup';
import { AuthData } from '../../providers/auth-data/auth-data';

@Component({
  templateUrl: 'build/pages/anonymous-list/anonymous-list.html',
  providers: [AuthData]
})
export class AnonymousListPage {
  public apartments: number[];
  constructor(private navCtrl: NavController, public authData: AuthData, public alertCtrl: AlertController) {
    this.apartments = [1, 2, 3, 4, 5];
  }

  goToDetail() {
    if (this.authData.getUser().isAnonymous == true) {
      let alert = this.alertCtrl.create({
        message: "If you want to continue you'll need to provide an email and create a password",
        buttons: [
          { text: "Cancel" },
          {
            text: "OK",
            handler: data => {
              this.navCtrl.push(SignupPage);
            }
          }
        ]
      });
      alert.present();
    } else {
      this.navCtrl.push(LandingPage);
    }
  }

}