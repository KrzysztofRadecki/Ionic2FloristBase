import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { AuthData } from '../../providers/auth-data/auth-data';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'build/pages/signup/signup.html',
  providers: [AuthData]
})
export class SignupPage {
  public signupForm: ControlGroup;

  constructor(public navCtrl: NavController, public authData: AuthData, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    })
  }


  signupUser() {

    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {

      let loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
        content: 'Waiting for server response..'
      });

      if (this.authData.getUser() && this.authData.getUser().isAnonymous ) {
        // obsługa osób bez konta
        this.authData.linkAccount(this.signupForm.value.email, this.signupForm.value.password).then(() => {
          // this.navCtrl.setRoot(HomePage);
          loading.present(this.navCtrl.setRoot(HomePage));
        }, (error) => {
          let errorMessage: string = error.message;
          let alert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
        });
      }
      else {
        this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password).then(() => {
          loading.present(this.navCtrl.setRoot(HomePage));
        }, (error) => {
          let errorMessage: string = error.message;
          let alert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      }
    }
  }
}