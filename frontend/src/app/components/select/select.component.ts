import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { FilterOptionsService } from "../../services/filter-options.service";
import {FilterOptions} from "../../interfaces/filter-options";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {

  brandFilterArray: string[] = [];
  categoryFilterArray: string[] = [];
  orderFilterArray: string[] = ['ascending', 'descending'];

  filtersForm = new FormGroup({
    selectedCategory: new FormControl(''),
    selectedBrand: new FormControl(''),
    selectedOrder: new FormControl(''),
    selectedPage: new FormControl(1),
    selectedLimit: new FormControl(10)
  });

  constructor(private productService: ProductService, private filterOptionsService: FilterOptionsService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.brandFilterArray = await this.productService.getFilterArray('brands');
      this.categoryFilterArray = await this.productService.getFilterArray('categories');
    } catch (error) {
      console.error('Error initializing component:', error);
    }
  }

  submitForm() {
    const filterValues = this.filtersForm.value;
    const transformedFilter: FilterOptions = {
      category: filterValues.selectedCategory,
      brand: filterValues.selectedBrand,
      order: filterValues.selectedOrder,
      page: filterValues.selectedPage,
      limit: filterValues.selectedLimit
    };
    this.filterOptionsService.setFilterOptions(transformedFilter);
  }
}
