import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country.inferface';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.css'
})
export class CountryTableComponent {

  @Input()
  public countriesList: Country[] = [];

}
