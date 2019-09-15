import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-init',
  templateUrl: './game-init.component.html',
  styleUrls: ['./game-init.component.css']
})
export class GameInitComponent implements OnInit {

  public counter = 0;
  public eventValues: string[][] = [];
  public isWinner = false;
  public winnerName = '';

  constructor() { }

  ngOnInit() {
    this.initValues();
  }
  initValues() {
    for (let i = 0; i < 3; i++) {
      this.eventValues[i] = [];
      for (let j = 0; j < 3; j++) {
        this.eventValues[i][j] = '';
      }
    }
  }
  changeEleValues(event) {
    if ( !this.isWinner && (event.value !== 'X') && (event.value !== 'O')) {
      if ((this.counter % 2) === 0) {
        event.value = 'X';
      } else {
        event.value = 'O';
      }
      this.counter++;
    }
    this.insertIntoArray(event);
    this.checkWinner(this.eventValues);
  }

  public checkWinner(event) {
    if (event[0][0] === 'X' && event[0][1] === 'X' && event[0][2] === 'X') {
      this.isWinner = true;
      this.winnerName = 'Player 1 Wins!!';
    } else if (event[1][0] === 'X' && event[1][1] === 'X' && event[1][2] === 'X') {
      this.isWinner = true;
      this.winnerName = 'Player 1 Wins!!';
    } else if (event[2][0] === 'X' && event[2][1] === 'X' && event[2][2] === 'X') {
      this.isWinner = true;
      this.winnerName = 'Player 1 Wins!!';
    } else if (event[0][0] === 'X' && event[1][0] === 'X' && event[2][0] === 'X') {
      this.isWinner = true;
      this.winnerName = 'Player 1 Wins!!';
    } else if (event[0][1] === 'X' && event[1][1] === 'X' && event[2][1] === 'X') {
      this.isWinner = true;
      this.winnerName = 'Player 1 Wins!!';
    } else if (event[0][2] === 'X' && event[1][2] === 'X' && event[2][2] === 'X') {
      this.isWinner = true;
      this.winnerName = 'Player 1 Wins!!';
    } else if (event[0][0] === 'X' && event[1][1] === 'X' && event[2][2] === 'X') {
      this.isWinner = true;
      this.winnerName = 'Player 1 Wins!!';
    } else if (event[0][2] === 'X' && event[1][1] === 'X' && event[2][0] === 'X') {
      this.isWinner = true;
      this.winnerName = 'Player 1 Wins!!';
    } else if (event[0][0] === 'O' && event[0][1] === 'O' && event[0][2] === 'O') {
      this.isWinner = true;
      this.winnerName = 'Player 2 Wins!!';
    } else if (event[1][0] === 'O' && event[1][1] === 'O' && event[1][2] === 'O') {
      this.isWinner = true;
      this.winnerName = 'Player 2 Wins!!';
    } else if (event[2][0] === 'O' && event[2][1] === 'O' && event[2][2] === 'O') {
      this.isWinner = true;
      this.winnerName = 'Player 2 Wins!!';
    } else if (event[0][0] === 'O' && event[1][0] === 'O' && event[2][0] === 'O') {
      this.isWinner = true;
      this.winnerName = 'Player 2 Wins!!';
    } else if (event[0][1] === 'O' && event[1][1] === 'O' && event[2][1] === 'O') {
      this.isWinner = true;
      this.winnerName = 'Player 2 Wins!!';
    } else if (event[0][2] === 'O' && event[1][2] === 'O' && event[2][2] === 'O') {
      this.isWinner = true;
      this.winnerName = 'Player 2 Wins!!';
    } else if (event[0][0] === 'O' && event[1][1] === 'O' && event[2][2] === 'O') {
      this.isWinner = true;
      this.winnerName = 'Player 2 Wins!!';
    } else if (event[0][2] === 'O' && event[1][1] === 'O' && event[2][0] === 'O') {
      this.isWinner = true;
      this.winnerName = 'Player 2 Wins!!';
    }
  }

  insertIntoArray(event) {
    if (event.id === 'button-one') {
      this.eventValues[0][0] = event.value;
    } else if (event.id === 'button-two') {
      this.eventValues[0][1] = event.value;
    } else if (event.id === 'button-three') {
      this.eventValues[0][2] = event.value;
    } else if (event.id === 'button-four') {
      this.eventValues[1][0] = event.value;
    } else if (event.id === 'button-five') {
      this.eventValues[1][1] = event.value;
    } else if (event.id === 'button-six') {
      this.eventValues[1][2] = event.value;
    } else if (event.id === 'button-seven') {
      this.eventValues[2][0] = event.value;
    } else if (event.id === 'button-eight') {
      this.eventValues[2][1] = event.value;
    } else if (event.id === 'button-nine') {
      this.eventValues[2][2] = event.value;
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
