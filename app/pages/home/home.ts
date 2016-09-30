import { ProfilePage } from './../profile/profile';
import { LoginPage } from './../login/login';
import { AuthData } from './../../providers/auth-data/auth-data';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { ShoppingCreatePage } from '../shopping-create/shopping-create';
import { ShoppingListPage } from '../shopping-list/shopping-list';



@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [AuthData]
})
export class HomePage {
  userName: string;
  constructor(public navCtrl: NavController, public authData: AuthData) {
    this.getUserEmail();
  }

  logOut() {
    this.authData.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });

  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

  getUserEmail() {
    this.userName = this.authData.getUser().email;
  }

  goToCreateShopping() {
    this.navCtrl.push(ShoppingCreatePage);
  }

  goToShoppingList() {
    this.navCtrl.push(ShoppingListPage);
  }
}
