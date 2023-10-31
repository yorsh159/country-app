import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';


@Injectable({
  providedIn: 'root'
})

export class CountriesService {

  private url_base: string = 'https://restcountries.com/v3.1'

  public cacheStore: CacheStore = {
    byCapital:  {q:'', countries:[]},
    byCountries:{q:'', countries:[]},
    byRegion:   {q:'' , countries:[]},
  }


  constructor( private httpClient: HttpClient) { 
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore',JSON.stringify( this.cacheStore ))
  }

  private loadFromLocalStorage(){
    if(localStorage.getItem('cacheStore')){
      this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
    }else{
      return;
    }
  }

  private getCountriesRequest( url:string ): Observable<Country[]>{
    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(err=>{
        return of([])
      }),
      delay(1000)

    )
  }

  searchCapital( q: string ): Observable<Country[]>{

    const url = `${this.url_base}/capital/${q}`
    
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCapital = { q , countries }),
      tap(()=>this.saveToLocalStorage()),
    );
    
  }

  searchCountry(q:string):Observable<Country[]>{
    return this.httpClient.get<Country[]>(`${this.url_base}/name/${q}`)
    .pipe(
      catchError(err=>{
        return of([])
      }),
      tap(countries => this.cacheStore.byCountries = { q , countries}),
      tap(()=>this.saveToLocalStorage()),
    )
  }

  searchRegion(q:Region): Observable<Country[]>{
    return this.httpClient.get<Country[]>(`${this.url_base}/region/${q}`)
    .pipe(
      catchError(err=>{
        return of([])
      }),
      tap(countries => this.cacheStore.byRegion = {q, countries}),
      tap(()=>this.saveToLocalStorage()),
    )
  }

  searchById(id:string): Observable<Country | null>{
    return this.httpClient.get<Country[]>(`${this.url_base}/alpha/${id}`)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError(()=>of(null))
    );
  }
}
