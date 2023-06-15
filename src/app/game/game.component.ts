import { Component, OnInit } from '@angular/core';
import { Game } from 'src/modules/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerComponent } from '../add-player/add-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickedCard: boolean = false;
  currentCard: string = '';
  game !: Game;

  constructor(public dialog: MatDialog) {

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
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      console.log(this.game.currentPlayer);
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickedCard = false;
      }, 1250);


    }

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerComponent, {

    });

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length >0) {
        console.log('The dialog was closed');
        this.game.players.push(name);
        
      }

    });
  }
}



