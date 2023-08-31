import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {

  brandFilterArray: string[];
  categoryFilterArray: string[];
  orderFilterArray: string[];

  constructor(private productService: ProductService) {
    this.brandFilterArray = [];
    this.categoryFilterArray = [];
    this.orderFilterArray = [];
  }

  async ngOnInit(): Promise<void> {
    try {
      this.brandFilterArray = await this.productService.getFilterArray('brands');
      this.categoryFilterArray = await this.productService.getFilterArray('categories');
      this.orderFilterArray = await this.productService.getFilterArray('order');
    } catch (error) {
      console.error('Error initializing component:', error);
    }
  }


}
