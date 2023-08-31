import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { FilterOptionsService } from "../../services/filter-options.service";
import { ProductResponse } from "../../interfaces/product-response";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.less']
})
export class ProductsListComponent implements OnInit {

  // Holds the current products and their count.
  public products: ProductResponse;

  /**
   * @param productService - Service to fetch products.
   * @param filterOptionsService - Service to obtain the current filter options.
   */
  constructor(private productService: ProductService, private filterOptionsService: FilterOptionsService) {
    // Initialize with an empty products array and count of zero.
    this.products = {
      products: [],
      count: 0
    };
  }

  /**
   * On component initialization, subscribe to filter options changes.
   * When a new filter option is provided, fetch products based on those options.
   */
  async ngOnInit(): Promise<void> {
    this.filterOptionsService.filterOptions$.subscribe(options => {
      this.productService.getProducts(options).then((response: ProductResponse) => {
        this.products = response;
        console.log(response);
      });
    });
  }
}
