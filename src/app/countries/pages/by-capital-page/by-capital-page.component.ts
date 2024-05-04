import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.inferface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {

  public countriesList: Country[] = [];

  constructor(
    private countriesService: CountriesService,
  ) {

  }

  searchByCapital(term: string): void {
    this.countriesService.searchCapital(term).subscribe( response => {
      this.countriesList = response;
    })
  }
}
