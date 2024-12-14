import {Component, OnInit} from '@angular/core';
import {Country} from "../../model/country";
import {CountriesService} from "../../services/countries.service";
import {CountriesImgService} from "../../services/countries-img.service";
import {catchError, forkJoin, of} from "rxjs";
import {CountriesImgFlagService} from "../../services/countries-img-flag.service";

@Component({
  selector: 'app-list-cards-countries',
  templateUrl: './list-cards-countries.component.html',
  styleUrls: ['./list-cards-countries.component.css']
})
export class ListCardsCountriesComponent implements OnInit{
  countries: Country[] = [];

  selectedCountry: any = null;
  isShowCountry: boolean = false;
  constructor(private countriesService: CountriesService,
              private countriesImgService: CountriesImgService,
              private countriesImgFlagService: CountriesImgFlagService
  ) {}

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe((result: any) => {
      this.countries = result.data.countries.slice(0, 20);
      this.fetchFlags(this.countries);
      this.fetchImgCountry(this.countries);
    });
  }

  fetchFlags(countries: any[]): void {
    this.countries = countries.map((country) => {
      const flagUrl = this.countriesImgFlagService.searchFlag(country.code);
      return {
        ...country,
        flag: flagUrl
      };
    });
    console.log('Updated countries:', this.countries);
  }

  fetchImgCountry(countries: any[]): void {
    const requests = countries.map((country) =>
      this.countriesImgService.searchImg(country.name).pipe(
        catchError((error) => {
          console.error(`Error fetching flag for ${country.name}:`, error);
          return of(null); // Continuamos con null si ocurre un error
        })
      )
    );

    forkJoin(requests).subscribe((responses: any[]) => {
      this.countries = countries.map((country, index) => {
        const response = responses[index];
        const imgUrl = response && response.hits && response.hits.length > 0
          ? response.hits[0].webformatURL
          : null;

        return {
          ...country,
          img: imgUrl
        };
      });
      console.log('Updated countries:', this.countries);
    });
  }

  onCountrySelected(country: Country) {
    this.selectedCountry = country;
    this.isShowCountry = true;
  }
  onCloseCountryDetail() {
    this.isShowCountry = false;
  }
}
