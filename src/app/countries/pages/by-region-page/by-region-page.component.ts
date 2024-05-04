import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.inferface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {

  public countriesList: Country[] = [];

  constructor(
    private countriesService: CountriesService,
  ) {

  }

  searchByRegion(region: string): void {
    this.countriesService.searchRegion(region).subscribe( response => {
      this.countriesList = response;
    })
  }
}
