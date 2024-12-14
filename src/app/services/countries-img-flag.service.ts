import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

/** Servicio para obtener imágenes de banderas de países con flagcdn. */

export class CountriesImgFlagService {

  private apiUrl =  'https://flagcdn.com';
  private flagSize = 'w160';
  constructor(private http: HttpClient) {}
  searchFlag(code: string): string{
    return `${this.apiUrl}/${this.flagSize}/${code.toLowerCase()}.png`;
  }
}
