import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/modules/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private router: Router,private firestore: AngularFirestore) {

  }


  newGame() {
    let game = new Game();
    this.firestore.collection('games')
    .add(game.toJson())
    .then((gameInfo)=>{
      console.log(gameInfo);
      this.router.navigateByUrl('/game/' + gameInfo.id);
      
    })
    
  }

}


