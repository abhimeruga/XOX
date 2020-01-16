import { Component } from '@angular/core';
import { FirebaseServiceService } from './service/firebase-service.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public firebase: FirebaseServiceService, private router: Router) { }
  title = 'XOX';
  public matchFound = false;
  public userName = '';
  public errorMsg = '';
  public userSignIn = false;
  public friendUserSignIn = false;
  public userName1 = '';
  public userName2 = '';
  public isLoading = false;
  public loginLoading = 'Login';

  public login(user, key, event) {
    event.preventDefault();
    this.loginLoading = 'Loading...';
    this.isLoading = true;
    this.firebase.login(user.value, key.value).
      then(res => {
        if (res !== undefined) {
          this.userSignIn = true;
          this.firebase.setStatus(res.user.uid, this.userSignIn);
          this.firebase.getUser(res.user.uid).pipe(take(1)).subscribe(data => {
            if (data) {
              this.firebase.username1 = data['username'];
              this.firebase.getUser(data['fuid']).pipe(take(1)).subscribe(fuid => {
                if (fuid['status'] === true && this.userSignIn) {
                  this.firebase.username2 = fuid['username'];
                  this.matchFound = true;
                  this.firebase.keyword = fuid['key'];
                  this.userName = data['displayName'] + " Vs " + fuid['displayName']
                  console.log('login in');
                  this.setInitialValues(fuid['key'], fuid['username']);
                  if (this.matchFound) {
                    this.firebase.isLoggedIn = true;
                    this.isLoading = false;
                    this.router.navigate(['/game']);
                  }
                }
              });
            }
          });
        } else {
          this.errorMsg = this.firebase.loginErrors;
          this.isLoading = false;
          this.loginLoading = 'Login';
        }
      })
      .catch(error => {
      this.errorMsg = error.message;
      console.log(this.errorMsg);
      user.value = '';
      key.value = '';
      }
      );
  }

  setInitialValues(key, un) {
    const eventVlaues = [];
    for (let i = 0; i < 9; i++) {
      eventVlaues[i] = ' ';
    } // need chnge the logic for 1st person
    this.firebase.setTurnValues(key, 0, eventVlaues, un, false);
  }

  flipCoin(coin) {
    const flipResult = Math.random();
    setTimeout(() => {
      if (flipResult <= 0.5) {
      } else {
        coin.srcElement.classList.remove('tails');
        console.log('it is tails');
      }
    }, 100);
  }
}
