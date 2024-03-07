import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../admin/product.service';
@Component({
  selector: 'app-productspage',
  templateUrl: './productspage.component.html',
  styleUrl: './productspage.component.css'
})
export class ProductspageComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {

      
      this.products = products;
    });
  }

}


