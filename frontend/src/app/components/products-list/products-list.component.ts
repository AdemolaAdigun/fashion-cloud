import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../classes/product";
import {ConverterService} from "../../services/converter.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.less']
})
export class ProductsListComponent implements OnInit {

  private products: Product[];

  constructor(private productService: ProductService, private converter: ConverterService) {
    this.products = [];
    this.productService.getProducts().subscribe((response: any) => {
      this.products = this.converter.convertToProductsArray(response);
    });
  }

  ngOnInit(): void {
  }

}
