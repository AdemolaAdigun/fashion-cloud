import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { environment } from "../../environments/environment";
import { Product } from "../interfaces/product";
import { FilterOptions } from "../interfaces/filter-options";
import { ProductResponse } from "../interfaces/product-response";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * Fetch products based on the given filter options.
   * @param filterOptions Filter conditions.
   * @returns A promise containing a product response object.
   */
  public async getProducts(filterOptions: FilterOptions | null): Promise<ProductResponse> {
    try {
      let params: { [key: string]: string } = {};

      if (filterOptions) {
        params = this.buildParams(filterOptions);
      }

      const response = await lastValueFrom(
        this.http.get<Product[]>(`${environment.API_URL}products`, { params })
      );
      return { products: response, count: response.length };

    } catch (error) {
      console.error('Error fetching products:', error);
      return { products: [], count: 0 };
    }
  }

  /**
   * Fetch a list of filter options based on the given endpoint.
   * @param endpoint The endpoint for the filter option (e.g. 'brands', 'categories').
   * @returns A promise containing an array of filter options.
   */
  public async getFilterArray(endpoint: string): Promise<string[]> {
    try {
      const response = await lastValueFrom(this.http.get<string[]>(`${environment.API_URL}products/${endpoint}`));
      return response;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return [];
    }
  }

  /**
   * Build URL parameters from the given filter options.
   * @param options The filter options.
   * @returns A map of query parameters.
   */
  private buildParams(options: FilterOptions): { [key: string]: string } {
    return Object.entries(options)
      .filter(([_, value]) => value !== undefined)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as { [key: string]: string });
  }
}
