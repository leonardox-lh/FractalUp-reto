import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchText = '';
  items = ['Angular', 'React', 'Vue', 'Svelte', 'JavaScript', 'TypeScript'];
  filteredItems: string[] = [];

  onSearch() {
    const query = this.searchText.toLowerCase();
    this.filteredItems = this.items.filter(item =>
      item.toLowerCase().includes(query)
    );
  }
}
