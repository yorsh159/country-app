import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public region:Region[] = ['Africa','Americas','Asia','Europe','Oceania'];
  public regionActive?:Region;


  constructor (private countryService: CountriesService){}
  
  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byRegion.countries;
    this.regionActive = this.countryService.cacheStore.byRegion.q;
  }

  searchByRegion(value:Region):void{

    this.regionActive = value;

    this.countryService.searchRegion(value)
    .subscribe( countries => { 
      this.countries = countries;
    })

  }
}
