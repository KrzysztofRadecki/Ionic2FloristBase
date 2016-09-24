import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

/*
  Generated class for the AuthData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthData {

  public fireAuth: firebase.auth.Auth;

  public userProfile: firebase.database.Reference;

  public floristSupply: any;

  constructor() {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');
    this.floristSupply = firebase.database().ref('toSupply');
  }

  /**
     * [loginUser We'll take an email and password and log the user into the firebase app]
     * @param  {string} email    [User's email address]
     * @param  {string} password [User's password]
     */
  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password).then((user) => {
      this.logUserActivity('Login');
    });
    // return this.fireAuth.signInWithEmailAndPassword(email, password);
  }


  /**
     * [signupUser description]
     * This function will take the user's email and password and create a new account on the Firebase app, once it does
     * it's going to log the user in and create a node on userProfile/uid with the user's email address, you can use
     * that node to store the profile information.
     * @param  {string} email    [User's email address]
     * @param  {string} password [User's password]
     */
  signupUser(email: string, password: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      this.fireAuth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {
        this.userProfile.child(authenticatedUser.uid).set({
          email: email,
        });
        // todo add logg user login time
        this.logUserActivity('Register');

      });
    });
  }

  /**
     * [resetPassword description]
     * This function will take the user's email address and send a password reset link, then Firebase will handle the
     * email reset part, you won't have to do anything else.
     *
     * @param  {string} email    [User's email address]
     */
  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return this.logUserActivity('LogOut').then(() => {
      this.fireAuth.signOut().then(() =>
      { console.log('wylogowany'); });
    }
    );

    // return this.fireAuth.signOut().then(() => {
    //   console.log('wylogowany');
    // });
  }

  logUserActivity(activity: string): any {
    if (this.getUser().isAnonymous == false) {
      console.log(this.getUser());
      let datetime = new Date().toLocaleString();
      return this.userProfile.child(this.getUser() + '/activityLog').push({
        userActivity: activity,
        actionDate: datetime.toLocaleString(),
      });
    }
    //  return this.userProfile.child(this.currentUser.uid).set({
    // datetime: activity,

  }

  getUser() {
    return this.fireAuth.currentUser;
  }

  createAnonymousUser(): any {
    return this.fireAuth.signInAnonymously().then((user) => {
      this.logUserActivity('LoginAnonymously');
    });
  }

  linkAccount(email, password): any {
    var credential = (<any>firebase.auth.EmailAuthProvider).credential(email, password);
    return this.fireAuth.currentUser.link(credential).then((user) => {
      this.userProfile.child(user.uid).update({
        email: email,
      });
    }, (error) => {
      console.log("Account linking error", error);
    });
  }
}

