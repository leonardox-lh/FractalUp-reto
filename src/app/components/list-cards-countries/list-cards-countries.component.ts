import {Component, HostListener, OnInit} from '@angular/core';
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
  isMobile: boolean = false;
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  searchTerm: string = '';
  selectedCountry: any = null;
  isShowCountry: boolean = false;
  selectedContinents: string[] = [];
  isLoading: boolean = false;

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 860;
  }
  constructor(private countriesService: CountriesService,
              private countriesImgService: CountriesImgService,
              private countriesImgFlagService: CountriesImgFlagService
  ) {
    this.onResize();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.countriesService.getCountries().subscribe((result: any) => {
      this.countries = result.data.countries.slice(0, 50);
      this.fetchFlags(this.countries);
      this.fetchImgCountry(this.countries);
    });
  }

  filterCountries(): void {
    this.filteredCountries = this.countries.filter(country =>
        country.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.selectedContinents.length > 0
            ? this.selectedContinents.some(continent => country.continent.name.toLowerCase().includes(continent.toLowerCase()))
            : true)
    );
  }
  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filterCountries(); // Llama a la función de filtrado
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
    // Crear una lista de observables para obtener las imágenes
    const requests = countries.map((country) =>
        this.countriesImgService.searchImg(country.name).pipe(
            catchError((error) => {
              console.error(`Error fetching image for ${country.name}:`, error);
              return of(null); // Continuamos con null si ocurre un error
            })
        )
    );

    // Usamos forkJoin para esperar que todas las solicitudes de imágenes se completen
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

      this.filteredCountries = [...this.countries];
      this.isLoading = false;
      console.log('Updated countries with images:', this.countries);
    });
  }

  isSelected(country: Country): boolean {
    return this.selectedCountry === country;
  }
  onCountrySelected(country: Country) {
    this.selectedCountry = country;
    this.isShowCountry = true;
  }
  onCloseCountryDetail() {
    this.isShowCountry = false;
    this.selectedCountry = null;
  }

  onContinentsChanged(continents: string[]): void {
    this.selectedContinents = continents;
    this.filterCountries();
  }
}
