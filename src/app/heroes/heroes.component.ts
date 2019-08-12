import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import { InMemoryDataService } from '../in-memory-data.service'
import { HeroService } from '../hero.service';

import { from } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  
})
export class HeroesComponent implements OnInit {
 
  //heroes=HEROES;
 // selectedHero:Hero;
  heroes:Hero[];
  

  constructor(private heroService:HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  /* onSelect(hero : Hero): void{
    this.selectedHero=hero;
  } */

  /* getHeroes():void{
    this.heroes = this.heroService.getHeroes();
  } */

  getHeroes():void{
    this.heroService.getHeroes()
    .subscribe(heroes=>this.heroes = heroes);
   }

   add(name:string):void{
     name=name.trim();
     if(! name){return; }
     this.heroService.addHero({name} as Hero)
      .subscribe(hero=>{this.heroes.push(hero);
      });
   }
}
