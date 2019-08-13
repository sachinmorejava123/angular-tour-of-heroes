import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, from } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { catchError, map,tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getHero(id: number): Observable <Hero> {
    const url= `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_=>this.log(`fetched hero id: ${id}`)),
      catchError(this.handleError<Hero>(`getHero id:${id}`))
    );
  } 

  private log(message: string) {
    this.messageService.add(`HeroService:${message}`);
  };

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_=>this.log('featched heroes')),
       catchError(this.handleError<Hero[]>('getHeroes',[]))
    );
  }

  private handleError<T> (operation='operation',result?:T){
    return (error:any):Observable<T>=>{
      console.error(error);
      this.log(`${operation} failed : ${error.message}`);
      return of(result as T);
    }
}

 updateHero (hero : Hero): Observable<any>{
   return this.http.put(this.heroesUrl,hero, this.httpOptions).pipe(
     tap(_=>this.log(`updated hero id=${hero.id}`)),
     catchError(this.handleError<any>('updateHero'))
   );
 }

 /**POST: add the new hero to the server */
 addHero(hero:Hero):Observable<Hero> {
          return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions).pipe(
            tap((newHero:Hero)=>this.log(`added hero w/ id=${newHero.id}`)),
            catchError(this.handleError<Hero>('addHero'))
          );
 }

 /**DELETE: delete the hero from the server*/
 deleteHero(hero:Hero | number):Observable<Hero>{
   const id =typeof hero === 'number'? hero : hero.id;
   const url = `${this.heroesUrl}/${id}`;

   return this.http.delete<Hero>(url,this.httpOptions).pipe(
     tap(_=> this.log(`deleted hero id=${id}`)),
     catchError(this.handleError<Hero>('deleteHero'))
   );
 }

 /**GET heroes whose name contains search term */
 searchHeroes(term : string):Observable<Hero[]>{
   if(!term.trim()){
     //if not search term, return empty array
     return of([]);
   }else{
   return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
     //tap(_=>this.log(`found heroes matching "${term}"`)),
     catchError(this.handleError<Hero[]>('searchHeroes',[]))
   );
  }
 }
}
