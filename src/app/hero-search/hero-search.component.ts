import { Component, OnInit } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
 heroes$:Observable<Hero[]>;
 private searchTerms=new Subject<String>();
  constructor(private heroService:HeroService) { }
  
  /**Push a search term into Observable stream */
  search(term:string):void{
    this.searchTerms.next(term);
  }

  ngOnInit():void {
    this.heroes$=this.searchTerms.pipe(
      //wait 300ms for each keystroke before considering the term.
      debounceTime(300),

      //ignore new term if same as privious term.
      distinctUntilChanged(),

      //switch to new search Observable each time the term changes.
      switchMap((term:string)=> this.heroService.searchHeroes(term)),
    );
  }
}
