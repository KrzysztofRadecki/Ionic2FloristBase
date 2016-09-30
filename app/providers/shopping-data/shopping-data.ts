import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import * as moment from 'moment';

@Injectable()
export class ShoppingData {
  public currentUser: any;
  public shoppingList: any;

  constructor() {
    this.currentUser = firebase.auth().currentUser.uid;
    this.shoppingList = firebase.database().ref('ShpppingList/' + this.currentDate().format('YYYY_MM_DD'));

  }

  currentDate() {
    return moment(new Date());
  }

  createItem(productName: string, buyToDate: string, description: string, amount: string): any {
    return this.shoppingList.push({
      productName: productName,
      addDate: this.currentDate().format(),
      buyToDate: buyToDate,
      description: description,
      amount: amount,
      customer: this.currentUser,
      isBought: false
    }).then(newEvent => {
      this.shoppingList.child(newEvent.key).child('id').set(newEvent.key);
    });
  }


  getShoppingList(): any {
    return this.shoppingList;
  }
}