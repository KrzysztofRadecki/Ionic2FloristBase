import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { ShoppingDetailPage } from './../shopping-detail/shopping-detail';
import { ShoppingData } from './../../providers/shopping-data/shopping-data';

/*
  Generated class for the ShoppingListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/shopping-list/shopping-list.html',
  providers: [ShoppingData]
})
export class ShoppingListPage {

  private shoppingList: any;

  constructor(private navCtrl: NavController, private shoppingData: ShoppingData) {
    this.navCtrl = navCtrl;
    this.shoppingData = shoppingData;

    this.shoppingData.getShoppingList().on('value', snapshot => {
      let rawList = [];
      console.log(this.shoppingData.getShoppingList());

      snapshot.forEach(snap => {
        rawList.push({
          productName: snap.val().productName,
          addDate: snap.val().addDate,
          buyToDate: snap.val().buyToDate,
          description: snap.val().description,
          amount: snap.val().amount,
          customer: snap.val().customer,
          isBought: snap.val().isBought
        });
      });
      this.shoppingList = rawList;
    });
  }


  goToListDetail(itemDetail) {
    this.navCtrl.push(ShoppingDetailPage, {
      myItemDetail: itemDetail,
    });

  }
}