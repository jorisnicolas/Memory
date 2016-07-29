import {Component, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import {Platform, MenuController, NavController, NavParams, Toast} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/game/game.html'
})
export class GamePage {

  difficulty: any;
  theme: any;
  counter = Array;
  col: any;
  ligne: any;
  resolves = 0;

  try = 0;

  solucTab = [];

  imgArray = [];

  constructor(platform: Platform, public navController: NavController, navParams: NavParams, elem: ElementRef) {
    this.difficulty = navParams.get('difficulty');
    this.theme = navParams.get('theme');
    this.setGame();
  }
  

  public setGame() {

      this.resolves = 0;
      var state = false;

      //reset the array
      this.imgArray = [];


      this.ligne = 6;
      this.col = 3;
      var random = 0;
      var numbers = [];

      if(this.difficulty === 5) {
        this.try = 20;
      } else if (this.difficulty === 3){
        this.try = 40;
      } else {
        this.try = 30;
      }


      for(let i=0; i < this.ligne; i++) {
        this.imgArray.push([]);
        this.imgArray[i].push( new Array(this.col));
      }

      for(let i=0; i < (this.ligne/2); i++) {

        for(let j=0; j < this.col; j++) {

          random = Math.floor(Math.random() * 29);
           
          while(numbers.indexOf(random) !== -1) {
            random = Math.floor(Math.random() * 29);
          }
          numbers.push(random);

          this.imgArray[i][j] = {img: "assets/freebies/" + this.theme + "/" + random + ".png", 
                                 rnd: random, 
                                 state: state, 
                                 nbr: i+''+j};          
          this.imgArray[i+((this.ligne/2))][j] = {img: "assets/freebies/" + this.theme + "/" + random + ".png", 
                                                  rnd: random, 
                                                  state: state, 
                                                  nbr: (i+(this.ligne/2))+''+j};
          setTimeout(() => {
            document.getElementById(i + '' + j).setAttribute('src', "assets/img/"+ this.theme +".png");
            document.getElementById((i+(this.ligne/2)) + '' + j).setAttribute('src', "assets/img/"+ this.theme +".png");
            this.changeBorder(i, j);
          }, 100);
        }
      }
      this.shuffle();
  }

  shuffle() {
    var rndLigne, rndCol, x, y;
    for (let i = this.ligne - 1; i; i--) {
      for(let j = this.col - 1; j; j--) {
         rndLigne = Math.floor(Math.random() * this.ligne);
         rndCol = Math.floor(Math.random() * this.col);

         x = this.imgArray[i][j].img;       
         this.imgArray[i][j].img = this.imgArray[rndLigne][rndCol].img;

         this.imgArray[rndLigne][rndCol].img = x;
         
         y = this.imgArray[i][j].rnd;
         this.imgArray[i][j].rnd = this.imgArray[rndLigne][rndCol].rnd;
         this.imgArray[rndLigne][rndCol].rnd = y;
      }
    }
  } 

  changeImg(i, j){
      if(!this.imgArray[i][j].state) {
        this.imgArray[i][j].state = true;

        if(this.solucTab.length > 0) {
          if(this.solucTab[0].nbr !== this.imgArray[i][j].nbr) {
            this.solucTab.push(this.imgArray[i][j]); 
          }
        } else {
          this.solucTab.push(this.imgArray[i][j]); 
        }
        
        document.getElementById(this.imgArray[i][j].nbr).setAttribute('src', this.imgArray[i][j].img);
        document.getElementById('card' + this.imgArray[i][j].nbr).setAttribute('style', "background-color: white;");
        
        if(this.solucTab.length === 2) {
          if(this.solucTab[0].rnd !== this.solucTab[1].rnd) {
            this.try--;
            if(this.try === 0) {
              this.presentToast('Dommage !')
            }
            setTimeout(() => {
                document.getElementById('card' + this.solucTab[0].nbr).setAttribute('style', "background-color: #E8E8E6;");
                document.getElementById(this.solucTab[0].nbr).setAttribute('src', "assets/img/"+ this.theme +".png");
                document.getElementById('card' + this.solucTab[1].nbr).setAttribute('style', "background-color: #E8E8E6;");
                document.getElementById(this.solucTab[1].nbr).setAttribute('src', "assets/img/"+ this.theme +".png");   

                this.imgArray[i][j].state = false;
                setTimeout(() => {
                  this.solucTab = [];
                }, 100);
            }, 700);
          }
          else{
            this.resolves++;
            if(this.try !== 0 && this.resolves === (this.ligne*this.col)/2) {
              this.presentToast('Bravo, tu as reussi')
            }
            console.log(this.resolves);
            setTimeout(() => {
                  this.solucTab = [];
            }, 100);
          }
        } else {
          if(this.imgArray[i][j].state){
            this.imgArray[i][j].state = false;
          }
        }
      }
      else{
          this.solucTab = [];
      }
  }


  presentToast(message) {
    let toast = Toast.create({
      message: message,
      position: 'middle',
      showCloseButton: true
    });
    toast.onDismiss(() => {
      this.setGame();
    });
    this.navController.present(toast);
  }

  changeBorder(i, j) {
    switch(this.theme) {
      case "sport":
        document.getElementById('card' + i + '' + j).setAttribute('style', "border-color: rgb(32,67,83)");
        document.getElementById('card' + (i+(this.ligne/2)) + '' + j).setAttribute('style', "border-color: rgb(32,67,83)");
        document.getElementById('cnt').setAttribute('style', "background-color: rgb(137,51,62)");
        break;
      case "science":
        document.getElementById('card' + i + '' + j).setAttribute('style', "border-color: rgb(67,82,91)");
        document.getElementById('card' + (i+(this.ligne/2)) + '' + j).setAttribute('style', "border-color: rgb(67,82,91)");
        document.getElementById('cnt').setAttribute('style', "background-color: rgb(253,116,0)");
        break;
      case "env":
        document.getElementById('card' + i + '' + j).setAttribute('style', "border-color: rgb(0,164,166)");
        document.getElementById('card' + (i+(this.ligne/2)) + '' + j).setAttribute('style', "border-color: rgb(0,164,166)");
        document.getElementById('cnt').setAttribute('style', "background-color: rgb(31,138,112)");
        break;
      case "astro":
        document.getElementById('card' + i + '' + j).setAttribute('style', "border-color: rgb(241,180,48)");
        document.getElementById('card' + (i+(this.ligne/2)) + '' + j).setAttribute('style', "border-color: rgb(241,180,48)");
        document.getElementById('cnt').setAttribute('style', "background-color: rgb(29,126,208)");
        break;
    }
  }

  goBack() {
    this.navController.pop();
  } 
}
