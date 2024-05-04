import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.inferface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {

  public countriesList: Country[] = [];

  constructor(
    private countriesService: CountriesService,
  ) {

  }

  searchByCountry(term: string): void {
    this.countriesService.searchCountry(term).subscribe( response => {
      this.countriesList = response;
    })
  }

}
