import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery: string = '';
  isFilterContinentVisible: boolean = false;
  selectedContinent: string | null = null;

  continents = [
    { name: 'Europa', image: 'assets/img/europa-map.png' },
    { name: 'África', image: 'assets/img/africa-map.png' },
    { name: 'América', image: 'assets/img/america-map.png' },
    { name: 'Asia', image: 'assets/img/asia-map.png' },
    { name: 'Oceanía', image: 'assets/img/oceania-map.png' },
  ];

  toggleFilterContinent() {
    this.isFilterContinentVisible = !this.isFilterContinentVisible;
  }

  selectContinent(continent: string) {
    this.selectedContinent = continent;
    console.log('Continente seleccionado:', continent);
    this.isFilterContinentVisible = false;
  }

  clearFilter() {
    this.selectedContinent = null;
    console.log('Filtro eliminado');
  }

  search() {
    console.log('Buscando:', this.searchQuery);
  }
}
