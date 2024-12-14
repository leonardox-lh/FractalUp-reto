import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Country} from "../../model/country";

@Component({
  selector: 'app-card-country',
  templateUrl: './card-country.component.html',
  styleUrls: ['./card-country.component.css']
})
export class CardCountryComponent {
  @Input() isSelect: boolean = false;
  @Input() country!: Country;
  @Output() countrySelected = new EventEmitter<any>();


  selectCountry(country: Country) {
    this.countrySelected.emit(country);
    this.isSelect = true;
  }
}
