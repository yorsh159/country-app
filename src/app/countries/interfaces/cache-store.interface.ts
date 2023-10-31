import { Country } from "./country.interface";
import { Region } from "./region.type";

export interface CacheStore{

    byCapital:  TermCountries;
    byCountries:TermCountries;
    byRegion:   RegionCountries;

    //byCapital:{
    //    term:string,
    //    countries: Country[]
    //},
    //byCountries:{
    //    term:string,
    //    countries: Country[]
    //},
    //byRegion:{
    //    term:string,
    //    countries: Region[]
    //},

    
}

export interface TermCountries{
    q:string,
    countries: Country[]
}

export interface RegionCountries{
    q?:    Region,
    countries:  Country[]
}