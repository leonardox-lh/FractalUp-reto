import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Country} from "../../model/country";

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent {
  @Input() country!: Country;
  @Input() isShowCountry!: boolean;
  @Output() close = new EventEmitter<void>();
  closeDetail() {
    this.close.emit();  // Emitir evento de cierre
  }
}