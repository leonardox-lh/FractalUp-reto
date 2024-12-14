import { Component } from '@angular/core';
import {Country} from "../../model/country";

@Component({
  selector: 'app-list-cards-countries',
  templateUrl: './list-cards-countries.component.html',
  styleUrls: ['./list-cards-countries.component.css']
})
export class ListCardsCountriesComponent {
  countries: Country[] = [
    {
      name: 'Argentina',
      capital: 'Buenos Aires',
      population: 44_938_712,
      flag: 'https://s1.significados.com/foto/bandera-argentina-sgdos.jpg?class=article',
      continent: 'America',
    },
    {
      name: 'Brazil',
      capital: 'Brasília',
      population: 206_135_893,
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/300px-Flag_of_Brazil.svg.png',
      continent: 'America',
    },
    {
      name: 'Colombia',
      capital: 'Bogotá',
      population: 49_066_438,
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/300px-Flag_of_Brazil.svg.png',
      continent: 'America',
    }
  ];

  selectedCountry: any = null;
  isShowCountry: boolean = false;
  onCountrySelected(country: Country) {
    this.selectedCountry = country;
    this.isShowCountry = true;
  }
  onCloseCountryDetail() {
    this.isShowCountry = false;
  }
}
