import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { AuthData } from '../../providers/auth-data/auth-data';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';
/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthData]
})
export class LoginPage {
  public loginForm: any;
  public alertCtrl: AlertController;
  public loadingCtrl: LoadingController;

  constructor(private navCtrl: NavController, private authData: AuthData, public formBuilder: FormBuilder, alertCtrl: AlertController, loadingCtrl: LoadingController) {
    this.loadingCtrl = loadingCtrl;
    this.alertCtrl = alertCtrl;
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



  loginUser() {

    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      let loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
        content: 'Waiting for server response..'
      });

      let alert = this.alertCtrl.create({
        // message: error.message,
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });

      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
        this.navCtrl.setRoot(HomePage);
      }
        , error => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.showBackButton(true);
          alert.present();
        });
      loading.present();
    }
  }


  goToSignup() {
    this.navCtrl.push(SignupPage);
  }

  goToResetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }
}
