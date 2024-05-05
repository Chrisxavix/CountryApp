import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.inferface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent implements OnInit {

  public countriesList: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = "";

  constructor(
    private countriesService: CountriesService,
  ) {

  }

  ngOnInit(): void {
    this.countriesList = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital(term: string): void {
    if(term === "") return;
    this.isLoading = true;
    this.countriesService.searchCapital(term).subscribe( response => {
      this.countriesList = response;
      this.isLoading = false;
    })
  }
}
