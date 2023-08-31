import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {FilterOptionsService} from "../../services/filter-options.service";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {

  brandFilterArray: string[];
  categoryFilterArray: string[];
  orderFilterArray: string[];

  selectedBrand: string;
  selectedCategory: string;
  selectedOrder: string;
  selectedPage: number;
  selectedLimit: number;


  constructor(private productService: ProductService, private filterOptionsService: FilterOptionsService) {
    this.brandFilterArray = [];
    this.categoryFilterArray = [];
    this.orderFilterArray = ['ascending', 'descending'];
    this.selectedBrand = '';
    this.selectedCategory = '';
    this.selectedOrder = '';
    this.selectedPage = 1;
    this.selectedLimit = 10;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.brandFilterArray = await this.productService.getFilterArray('brands');
      this.categoryFilterArray = await this.productService.getFilterArray('categories');
    } catch (error) {
      console.error('Error initializing component:', error);
    }
  }
  submitForm() {
    console.log('Form submitted');
    this.filterOptionsService.setFilterOptions({
      category: this.selectedCategory,
      brand: this.selectedBrand,
      order: this.selectedOrder,
      page: this.selectedPage,
      limit: this.selectedLimit,
    })
  }
}
