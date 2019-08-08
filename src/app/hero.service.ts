import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';

import { Observable, of, from} from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor( private messageService:MessageService) { }

  // getHeroes(): Hero[]{
  //   return HEROES;
  // }

  getHeroes(): Observable <Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }




}
