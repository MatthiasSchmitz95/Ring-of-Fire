import { Component, OnInit } from '@angular/core';
import { Game } from 'src/modules/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickedCard: boolean = false;
  currentCard: string = '';
  game !: Game;

  constructor() {

  }

  ngOnInit(): void {
    this.newGame();
    console.log(this.game);
  }

  newGame() {
    this.game = new Game();
  }

  pickCard() {
    if (!this.pickedCard) {
      this.currentCard = this.game.stack.pop();
      console.log(this.currentCard);
      this.pickedCard = true;
      

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickedCard = false;
      }, 1250);
    }
  }

}
