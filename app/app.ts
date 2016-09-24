import { Component } from '@angular/core';
import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from './pages/tabs/tabs';

// import { LoginPage } from './pages/login/login';
import { LandingPage } from './pages/landing/landing';

import * as firebase from 'firebase';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  public config = {
    apiKey: "AIzaSyAtiKrP1VwYM9fd0IODPOzFukYPJKuoRls",
    authDomain: "floristbase.firebaseapp.com",
    databaseURL: "https://floristbase.firebaseio.com",
    storageBucket: "floristbase.appspot.com",
    messagingSenderId: "964934824258"
  };

  public rootPage: any;

  constructor(private platform: Platform) {
    firebase.initializeApp(this.config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user && !firebase.auth().signInAnonymously) {
        // If there's a user take him to the home page.
        this.rootPage = TabsPage;
        // unsubscribe();
        // this.rootPage = HomePage;
      } else {
        // If there's no user logged in send him to the LoginPage
        this.rootPage = LandingPage;
        // unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
