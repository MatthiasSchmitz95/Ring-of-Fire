import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/modules/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerComponent } from '../add-player/add-player.component';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  gamesCollection: AngularFirestoreCollection<any>;
  games: Observable<any[]>;

  gameId: string;
  game !: Game;


  constructor(private route: ActivatedRoute, public dialog: MatDialog, public firestore: AngularFirestore) {


  }

  ngOnInit(): void {
    this.newGame();
    console.log(this.game);

    this.route.params.subscribe(async (params) => {
      this.gameId = params['id'];
      console.log('params', params);
      this.firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          console.log(game);
          this.game.players = game.players;
          this.game.currentPlayer = game.currentPlayer;
          this.game.stack = game.stack;
          this.game.playedCards = game.playedCards;
          this.game.pickedCard = game.pickedCard;
          this.game.currentCard = game.currentCard;

        });

    });

  }

  saveGame() {
    this.firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson())
  }

  newGame() {
    this.game = new Game();
  }

  pickCard() {
    if (this.game.players.length >1) {
      if (!this.game.pickedCard) {
        this.game.currentCard = this.game.stack.pop();
        console.log(this.game.currentCard);
        this.game.pickedCard = true;
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        console.log(this.game.currentPlayer);
        this.saveGame();
        setTimeout(() => {
          this.game.playedCards.push(this.game.currentCard);
          this.game.pickedCard = false;
          this.saveGame();
        }, 1250);
  
      }
    


  }    else {
    alert("please enter atleast 2 players to play the Game");

}}


  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerComponent, {

    });

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        console.log('The dialog was closed');
        this.game.players.push(name);
        this.saveGame();

      }

    });
  }
}



