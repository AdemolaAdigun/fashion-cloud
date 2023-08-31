import { Injectable } from '@angular/core';
import {FilterOptions} from "../interfaces/filter-options";

@Injectable({
  providedIn: 'root'
})
export class FilterOptionsService {
  private filterOptions: FilterOptions;
  constructor() {
    this.filterOptions = {};
  }

  setFilterOptions(options: FilterOptions) {
    this.filterOptions = options;
  }

  getFilterOptions() {
    return this.filterOptions;
  }
}
