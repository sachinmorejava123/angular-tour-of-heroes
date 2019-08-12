import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  

  createDb() {
      const heroes= [
        {id:11,name:'Dr Nice'},
        {id:12,name:'Narco'},
        {id:13,name:'Bambosto'},
        {id:14,name:'Clearitas'},
        {id:15,name:'Magneta'},
        {id:16,name:'Rubberman'},
        {id:17,name:'Dynama'},
        {id:18,name:'Dr IQ'},
        {id:19,name:'Magma'},
        {id:20,name:'Tornado'}
      ];
      return {heroes};
   }

   getId(heroes: Hero[]): number{
     return heroes.length > 0 ? Math.max(...heroes.map(heroes=>heroes.id))+1 : 11;
   }

}
