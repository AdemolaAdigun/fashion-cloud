import { Injectable } from '@angular/core';
import { FilterOptions } from "../interfaces/filter-options";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilterOptionsService {
  // The private BehaviorSubject that will hold the current filter options.
  private filterOptions = new BehaviorSubject<FilterOptions | null>(null);

  // Public observable for other parts of the application to subscribe to.
  // Components can listen to changes in the filter options via this observable.
  filterOptions$: Observable<FilterOptions | null> = this.filterOptions.asObservable();

  /**
   * Set the current filter options.
   * @param options The new filter options.
   */
  setFilterOptions(options: FilterOptions) {
    this.filterOptions.next(options);
  }

}
