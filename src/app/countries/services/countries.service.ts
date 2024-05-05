import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.inferface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1";
  public cacheStore: CacheStore = {
    byCapital: {term: "", countries: []},
    byCountry: {term: "", countries: []},
    byRegion: {region: "", countries: []},
  }

  constructor(
    private http: HttpClient,
  ) {
    this.loadFromLocalStorage();
  }

  getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( error => {
          console.log("CONTROLADO" , error);
          return of([])
        }),
        /* delay(2000), */
      )
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( error => {
          console.log("CONTROLADO" , error);
          return of(null)
        })
      )
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCapital = {
        term: term,
        countries: countries
      }
      ),
      tap( () => this.saveLocalStorage())
    )

  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCountry = {
        term: term,
        countries: countries
      }
      ),
      tap( () => this.saveLocalStorage())
    )
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion = {
        region: region,
        countries: countries
      }
      ),
      tap( () => this.saveLocalStorage())
    )
  }

  private saveLocalStorage(): void {
    localStorage.setItem("cacheStore", JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(): void {
    if(!localStorage.getItem("cacheStore")) return;
    this.cacheStore = JSON.parse(localStorage.getItem("cacheStore")!);
  }

}
