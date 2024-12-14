import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountriesImgService {
  private apiKey = '47634499-99c877ed012e17ebc65287a19';
  private apiUrl = 'https://pixabay.com/api/';
  constructor(private http: HttpClient) {}
  searchImg(countryName: string): Observable<any> {
    const query = encodeURIComponent(countryName);
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${query}&image_type=photo`;
    return this.http.get(url);
  }
}
