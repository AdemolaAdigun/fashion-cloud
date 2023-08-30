import { Injectable } from '@angular/core';
import {Product} from "../classes/product";

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  public convertToProductsArray(response: any): Product[] {
    return response as Product[];
  }
}
