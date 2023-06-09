import { Component, OnInit } from '@angular/core';
import { Game } from 'src/modules/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickedCard = false;
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
    this.pickedCard = true;

  }

}
