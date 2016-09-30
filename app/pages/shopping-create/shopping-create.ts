import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ShoppingData } from '../../providers/shopping-data/shopping-data';

/*
  Generated class for the ShoppingCreatePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/shopping-create/shopping-create.html',
  providers: [ShoppingData]

})
export class ShoppingCreatePage {

  constructor(private navCtrl: NavController, private shoppingData: ShoppingData) {
    this.navCtrl = navCtrl;
    this.shoppingData = shoppingData;
  }

  createEvent(productName: string, buyToDate: string, description: string, amount: string) {
    this.shoppingData.createItem(productName, buyToDate, description, amount).then(() => {
      this.navCtrl.pop();
    });
  }
}