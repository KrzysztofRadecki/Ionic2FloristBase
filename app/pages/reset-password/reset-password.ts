import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { AuthData } from '../../providers/auth-data/auth-data';
import { LoginPage } from '../login/login';

/*
  Generated class for the ResetPasswordPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/reset-password/reset-password.html',
  providers: [AuthData]
})
export class ResetPasswordPage {


  public resetPasswordForm: ControlGroup;

  constructor(public authData: AuthData, public formBuilder: FormBuilder, private navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  this.resetPasswordForm = formBuilder.group({
    email:['', Validators.required
    // Validators.compose[Validators.required, Validators.minLength(6)]
    ],
  })
  }


resetPassword(){
 
    if (!this.resetPasswordForm.valid){
      console.log(this.resetPasswordForm.value);
    } else {
      this.authData.resetPassword(this.resetPasswordForm.value.email).then((user) => {
        let alert = this.alertCtrl.create({
          message: "We just sent you a reset link to your email",
          buttons: [
            {
              text: "Ok",
              role: 'cancel',
              handler: () => {
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
 
      }, (error) => {
        var errorMessage: string = error.message;
        let errorAlert = this.alertCtrl.create({
          message: errorMessage,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
 
        errorAlert.present();
      });
    }
  }

}
