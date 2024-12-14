import { Injectable } from '@angular/core';
import {Apollo,gql} from "apollo-angular";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private apollo: Apollo) {}

  getCountries(): Observable<any> {
    return this.apollo.query({
      query: gql`
        {
          countries {
            code
            name
            capital
            continent {
              name
            }
            languages{
              name
            }
            currency
            states{
            name
            }
          }
        }
      `
    });
  }
}
