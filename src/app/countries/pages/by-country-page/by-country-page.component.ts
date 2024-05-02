import { Component } from '@angular/core';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {

  searchByCountry(term: string): void {
    console.log("Desde ByCountryPage");
    console.log({ term });
  }
}
