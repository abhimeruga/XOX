import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { FirebaseServiceService } from '../service/firebase-service.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-game-init',
  templateUrl: './game-init.component.html',
  styleUrls: ['./game-init.component.css']
})
export class GameInitComponent implements OnInit, OnDestroy {

  public counter = 0;
  public eventValues: string[] = [];
  public isWinner = false;
  public winnerName = '';
  public messages = [];
  public titleHead = '';

  constructor(public firebaseService: FirebaseServiceService) { }

  ngOnInit() {
    let scrollEle: any;
    this.initValues();
    this.titleHead = this.firebaseService.username1 + 'Vs' + this.firebaseService.username2;
    scrollEle = document.getElementById('messageScroll');
    scrollEle.scrollTop = Math.max(0, scrollEle.scrollHeight - scrollEle.offsetHeight);
  }

  ngOnDestroy() { }

  initValues() {
    for (let i = 0; i < 9; i++) {
      this.eventValues[i] = ' ';
    }
    let scrollEle: any;
    this.firebaseService.getUserTurns(this.firebaseService.keyword).subscribe(result => {
      this.eventValues = result['values'];
      this.isWinner = result['isWinner'];
      this.winnerName = result['turn'];
      this.messages = result['messages']
      scrollEle = document.getElementById('messageScroll');
      scrollEle.scrollTop = Math.max(0, scrollEle.scrollHeight - scrollEle.offsetHeight);
    });
  }
  changeEleValues(event) {
    this.firebaseService.getUserTurns(this.firebaseService.keyword).pipe(take(1)).subscribe(res => {
      if (res['turn'] === this.firebaseService.username1) {
        if (!res['isWinner'] && (event.value !== 'X') && (event.value !== 'O')) {
          if ((res['counter'] % 2) === 0) {
            event.value = 'X';
          } else {
            event.value = 'O';
          }
          res['counter']++;
          console.log('change events');
          this.insertIntoArray(event);
          this.checkWinner(this.eventValues, res['turn']);
          this.firebaseService.setTurnValues(this.firebaseService.keyword,
            res['counter'], this.eventValues, this.firebaseService.username2, this.isWinner);
        }
      }
    });
    return;
  }

  send(message, messageList) {
    if (message.value !== '') {
      const messageValues: any = {};
      messageValues.message = message.value;
      messageValues.username = this.firebaseService.username1;
      this.messages.push(messageValues);
      this.firebaseService.sendMessage(this.firebaseService.keyword, this.messages);
      message.value = '';
    }
  }


  public checkWinner(event, winner) {
    if (event[0] === 'X' && event[1] === 'X' && event[2] === 'X') {
      this.isWinner = true;
      this.winnerName = winner;
    } else if (event[3] === 'X' && event[4] === 'X' && event[5] === 'X') {
      this.isWinner = true;
      this.winnerName = winner;
    } else if (event[6] === 'X' && event[7] === 'X' && event[8] === 'X') {
      this.isWinner = true;
      this.winnerName = winner;
    } else if (event[0] === 'X' && event[3] === 'X' && event[6] === 'X') {
      this.isWinner = true;
      this.winnerName = winner;
    } else if (event[1] === 'X' && event[4] === 'X' && event[7] === 'X') {
      this.isWinner = true;
      this.winnerName = winner;
    } else if (event[2] === 'X' && event[5] === 'X' && event[8] === 'X') {
      this.isWinner = true;
      this.winnerName = winner;
    } else if (event[0] === 'X' && event[4] === 'X' && event[8] === 'X') {
      this.isWinner = true;
      this.winnerName = winner;
    } else if (event[2] === 'X' && event[4] === 'X' && event[6] === 'X') {
      this.isWinner = true;
      this.winnerName = winner;
    } else if (event[0] === 'O' && event[1] === 'O' && event[2] === 'O') {
      this.isWinner = true;
      this.winnerName = winner;
    } else if (event[3] === 'O' && event[4] === 'O' && event[5] === 'O') {
      this.isWinner = true;
      this.winnerName = winner;
    } else if (event[6] === 'O' && event[7] === 'O' && event[8] === 'O') {
      this.isWinner = true;
      this.winnerName = winner;
    } else if (event[0] === 'O' && event[3] === 'O' && event[6] === 'O') {
      this.isWinner = true;
      this.winnerName = winner;
    } else if (event[1] === 'O' && event[4] === 'O' && event[7] === 'O') {
      this.isWinner = true;
      this.winnerName = winner;
    } else if (event[2] === 'O' && event[5] === 'O' && event[8] === 'O') {
      this.isWinner = true;
      this.winnerName = winner;
    } else if (event[0] === 'O' && event[4] === 'O' && event[8] === 'O') {
      this.isWinner = true;
      this.winnerName = winner;
    } else if (event[2] === 'O' && event[4] === 'O' && event[6] === 'O') {
      this.isWinner = true;
      this.winnerName = winner;
    }
  }

  insertIntoArray(event) {
    if (event.id === 'button-one') {
      this.eventValues[0] = event.value;
    } else if (event.id === 'button-two') {
      this.eventValues[1] = event.value;
    } else if (event.id === 'button-three') {
      this.eventValues[2] = event.value;
    } else if (event.id === 'button-four') {
      this.eventValues[3] = event.value;
    } else if (event.id === 'button-five') {
      this.eventValues[4] = event.value;
    } else if (event.id === 'button-six') {
      this.eventValues[5] = event.value;
    } else if (event.id === 'button-seven') {
      this.eventValues[6] = event.value;
    } else if (event.id === 'button-eight') {
      this.eventValues[7] = event.value;
    } else if (event.id === 'button-nine') {
      this.eventValues[8] = event.value;
    }
  }

  public reset(one, two, three, four, five, six, seven, eight, nine) {
    one.value = ' ';
    two.value = ' ';
    three.value = ' ';
    four.value = ' ';
    five.value = ' ';
    six.value = ' ';
    seven.value = ' ';
    eight.value = ' ';
    nine.value = ' ';
    this.initValues();
    this.isWinner = false;
    this.winnerName = '';
    this.counter = 0;
  }
}
