import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {FilterOptionsService} from "../../services/filter-options.service";
import {ProductResponse} from "../../interfaces/product-response";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.less']
})
export class ProductsListComponent implements OnInit {

  public products: ProductResponse

  constructor(private productService: ProductService, private filterOptionsService: FilterOptionsService) {
    this.products = {
      products: [],
      count: 0
    };
  }

  async ngOnInit(): Promise<void> {
    this.filterOptionsService.filterOptions$.subscribe(options => {
      this.productService.getProducts(options).then((response: ProductResponse) => {
        this.products = response;
        console.log(response);
      });
    });
  }

}
