import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.inferface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent  implements OnInit {

  public country?: Country;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
  ) {

  }

  ngOnInit(): void {
    this.activateRoute.params.
    pipe(
      /* Recibe parámetros */
      switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode(id) )
    )
    .subscribe( ( country ) => {
      if(!country) return this.router.navigateByUrl("");
      console.log(country);
      return  this.country = country;
    })
  }

}
