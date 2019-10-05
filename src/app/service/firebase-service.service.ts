import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  user: firebase.User;
  userName: Observable<string>;
  public username1;
  public username2;
  public keyword;
  private authState: any;
  public gameErrors = '';
  public loginErrors = '';

  constructor(public db: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
        this.getUser().subscribe( res => {
          console.log(res);
        });
      }
    });
  }

  getUser(userID?) {
    let userId;
    if (userID) {
      userId = userID;
    } else {
      userId = this.user.uid;
    }
    const path = `/users/${userId}`;
    return this.db.collection('users').doc(userId).valueChanges();
  }

  setTurnValues(keyword, counter, values, turn?, isWinner?) {
    this.db.collection('Game').doc(keyword).update({
      counter,
      turn,
      values,
      isWinner
    }).catch( error => {
      console.log('Update turn error' + error);
      this.gameErrors = 'Check Internet Connection and Retry';
    });
  }

  sendMessage(keyword, messages) {
    this.db.collection('Game').doc(keyword).update({
      messages
    }).catch( error => {
      console.log('send message error' + error);
    });
  }

  getUserTurns(keyword) {
    return this.db.collection('Game').doc(keyword).valueChanges();
  }

  setStatus(userID, userStatus) {
    this.db.collection('users').doc(userID).update({
      status : userStatus
    }).catch( error => {
      console.log('Update error' + error);
    });
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        console.log(this.authState);
        return this.authState;
      }).catch(error => {
        console.log(error);
        this.loginErrors = 'Invalid email or Password!!';
      });
  }
}
