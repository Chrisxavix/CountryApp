import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.inferface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent implements OnInit {

  public countriesList: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  public selectedRegion?: Region;

  constructor(
    private countriesService: CountriesService,
  ) {

  }

  ngOnInit(): void {
    this.countriesList = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
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
