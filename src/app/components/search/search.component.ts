import {Component, EventEmitter, HostListener, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  isMobile: boolean = false;
  searchQuery: string = '';
  isFilterContinentVisible: boolean = false;
  selectedContinents: string[] = [];

  @Output() searchChanged = new EventEmitter<string>();
  @Output() continentsChanged = new EventEmitter<string[]>();

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 860;
  }

  continents = [
    { name: 'Europe', image: 'assets/img/europa-map.png' },
    { name: 'Africa', image: 'assets/img/africa-map.png' },
    { name: 'America', image: 'assets/img/america-map.png' },
    { name: 'Asia', image: 'assets/img/asia-map.png' },
    { name: 'Oceania', image: 'assets/img/oceania-map.png' },
  ];

  constructor() {
    this.onResize();
  }
  onSearch() {
    this.searchChanged.emit(this.searchQuery);
  }
  toggleFilterContinent() {
    this.isFilterContinentVisible = !this.isFilterContinentVisible;
  }

  selectContinent(continent: string) {
    if (!this.selectedContinents.includes(continent)) {
      this.selectedContinents.push(continent);
    } else {
      // Si el continente ya está seleccionado, lo eliminamos
      this.selectedContinents = this.selectedContinents.filter(c => c !== continent);
    }

    console.log('Continentes seleccionados:', this.selectedContinents);

    // Emitir los continentes seleccionados
    this.continentsChanged.emit(this.selectedContinents);
  }

  clearFilter() {
    this.selectedContinents = [];
    console.log('Filtro eliminado');
    this.continentsChanged.emit(this.selectedContinents);
  }

  search() {
    console.log('Buscando:', this.searchQuery);
  }
}
