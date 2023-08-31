import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {environment} from "../../environments/environment";
import {Product} from "../interfaces/product";
import {FilterOptions} from "../interfaces/filter-options";
import {ProductResponse} from "../interfaces/product-response";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  public async getProducts(filterOptions: FilterOptions | null): Promise<ProductResponse> {
    try {

      let params: { [key: string]: string } = {};

      if (filterOptions) {
        params = this.buildParams(filterOptions);
      }

      const response = await lastValueFrom(
        this.http.get<Product[]>(`${environment.API_URL}products`, { params  })
      );
      return { products: response, count: response.length };

    } catch (error) {
      console.error('Error fetching products:', error);
      return { products: [], count: 0 };
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
