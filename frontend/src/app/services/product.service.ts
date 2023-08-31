import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Product} from "../interfaces/product";
import {FilterOptions} from "../interfaces/filter-options";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  /**
   * Product service should take in 3 properties: brands, categories, order. All optional and default
   */
  public async getProducts(filterOptions: FilterOptions): Promise<Product[]> {
    try {
      const params = this.buildParams(filterOptions);

      const response = await lastValueFrom(
        this.http.get<Product[]>(`${environment.API_URL}products`, { params })
      );

      return response;

    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  public async getFilterArray(endpoint: string): Promise<string[]> {
    try {
      const response = await lastValueFrom(this.http.get<string[]>(`${environment.API_URL}products/${endpoint}`));
      return response;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return [];
    }
  }

  private buildParams(options: FilterOptions): { [key: string]: string } {
    return Object.entries(options)
      .filter(([_, value]) => value !== undefined)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as { [key: string]: string });
  }
}
