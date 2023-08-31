import {Product} from "./product";

export interface ProductResponse {
  products: Product[];
  count: number;
}
