import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/modules/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerComponent } from '../add-player/add-player.component';
import { Firestore, collection, collectionData, addDoc, getDoc, doc, getFirestore, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  games: Observable<any[]>;


  pickedCard: boolean = false;
  currentCard: string = '';
  game !: Game;


  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    const aCollection = collection(this.firestore, 'games');
    this.games = collectionData(aCollection);





  }

  ngOnInit(): void {
    this.newGame();
    console.log(this.game);

    this.route.params.subscribe(async(params) => {
      console.log('params', params);
      this.firestore
      .collection('games')
      .valueChange()
      .subscribe((game) =>{
        console.log(game)

      });



    }
   );

  }

  newGame() {
    this.game = new Game();
     //addDoc(collection(this.firestore, 'games'), this.game.toJson());
  }

  pickCard() {
    if (this.game.players.length != 0) {
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
    else {
      alert("please enter a Plyer to play the Game");

    }

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerComponent, {

    });

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        console.log('The dialog was closed');
        this.game.players.push(name);

      }

    });
  }
}



