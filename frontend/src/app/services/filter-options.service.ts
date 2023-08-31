import { Injectable } from '@angular/core';
import { FilterOptions } from "../interfaces/filter-options";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilterOptionsService {
  private filterOptions = new BehaviorSubject<FilterOptions | null>(null);
  filterOptions$: Observable<FilterOptions | null> = this.filterOptions.asObservable();

  setFilterOptions(options: FilterOptions) {
    this.filterOptions.next(options);
    console.log("Filter options updated", this.filterOptions$);
  }

}
