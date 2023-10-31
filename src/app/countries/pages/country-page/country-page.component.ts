import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

  constructor( private activedRoute: ActivatedRoute,
              private countryService: CountriesService,
              private router:Router){}

  ngOnInit(): void {
    this.activedRoute.params
    .pipe(
      switchMap( ({id})=> this.countryService.searchById(id))
    )
    .subscribe( country =>{
      if(!country) return this.router.navigateByUrl(''); 
      
      return this.country = country;
    })
  }

}
