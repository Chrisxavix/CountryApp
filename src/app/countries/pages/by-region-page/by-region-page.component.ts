import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.inferface';
import { CountriesService } from '../../services/countries.service';

type Region = "Africa"|"Americas"|"Asia"|"Europe"|"Oceania";

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {

  public countriesList: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  public selectedRegion?: Region;

  constructor(
    private countriesService: CountriesService,
  ) {

  }

  searchByRegion(region: Region): void {
    this.selectedRegion = region;
    this.isLoading = true;
    this.countriesService.searchRegion(region).subscribe( response => {
      this.countriesList = response;
      this.isLoading = false;
    })
  }
}
