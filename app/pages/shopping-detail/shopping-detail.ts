import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ShoppingDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/shopping-detail/shopping-detail.html',
})
export class ShoppingDetailPage {
  currentItem: any;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
      this.navCtrl = navCtrl;
      this.currentItem = navParams.get('myItemDetail');
  }

}
