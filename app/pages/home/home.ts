import {Component} from '@angular/core';
import {Platform, MenuController, NavController} from 'ionic-angular';
import {GamePage} from '../game/game';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  theme: any;
  difficulty: any;
  strDiff: any;
  strTheme: any;

  constructor(platform: Platform, public navController: NavController, public menu: MenuController) {
    this.difficulty = 4;
    this.theme = 'sport';
    this.strDiff = "normal";
    this.strTheme = "Sport";
  }

  changeTheme(theme) {
    this.theme = theme;
    switch(theme) {
      case 'sport':
        this.strTheme = "Sport";
        break;
      case 'science':
        this.strTheme = "Science";
        break;
      case 'env':
        this.strTheme = "Environment";
        break;
      case 'astro':
        this.strTheme = "Astronomy";
        break;
    }
  }

  changeDifficulty(difficulty) {
    this.difficulty = difficulty;
    switch(difficulty) {
      case 3:
        this.strDiff = "easy";
        break;
      case 4:
        this.strDiff = "normal";
        break;
      case 5:
        this.strDiff = "hard";
        break;
    }
    
  }

  push() {
    this.navController.push(GamePage, { difficulty: this.difficulty, theme: this.theme }, {animate: true, duration: 500});
  }
}
