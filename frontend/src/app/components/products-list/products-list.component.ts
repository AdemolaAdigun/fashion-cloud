import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../interfaces/product";
import {ConverterService} from "../../services/converter.service";
import {FilterOptions} from "../../interfaces/filter-options";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.less']
})
export class ProductsListComponent implements OnInit {

  private products: Product[];

  constructor(private productService: ProductService, private converter: ConverterService) {
    this.products = [];
  }

  async ngOnInit(): Promise<void> {
    try {
      this.products = await this.productService.getProducts({});
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

}
