import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  public getProducts(filters?: {brand?: string, category?: string}, sortOrder?: 'ascending' | 'descending', page?: number): Observable<Response> {
    let params = new HttpParams();

    // Add filter parameters if they exist
    if (filters) {
      if (filters.brand) {
        params = params.set('brand', filters.brand);
      }

      if (filters.category) {
        params = params.set('category', filters.category);
      }
    }

    // Add sort order parameter if it exists
    if (sortOrder) {
      params = params.set('order', sortOrder);
    }

    // Add pagination parameter if it exists
    if (page) {
      params = params.set('page', page.toString());
    }

    return this.http.get<Response>(`${environment.API_URL}products`, { params: params });
  }
}
