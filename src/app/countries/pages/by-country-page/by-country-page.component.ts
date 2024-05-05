import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.inferface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent implements OnInit{

  public countriesList: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = "";

  constructor(
    private countriesService: CountriesService,
  ) {

  }

  ngOnInit(): void {
    this.countriesList = this.countriesService.cacheStore.byCountry.countries;
    this.initialValue = this.countriesService.cacheStore.byCountry.term;
  }

  searchByCountry(term: string): void {
    if(term === "") return;
    this.isLoading = true;
    this.countriesService.searchCountry(term).subscribe( response => {
      this.countriesList = response;
      this.isLoading = false;
    })
  }

}
