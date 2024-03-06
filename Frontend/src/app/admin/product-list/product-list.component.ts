import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private router: Router, private productService: ProductService) { }

  // ngOnInit(): void {
  //   this.productService.getProducts().subscribe(
  //     (products: Product[]) => {
  //       this.products = products;
  //     },
  //     (error: any) => {
  //       console.log('Error fetching products:', error);
  //     }
  //   );
  // }
  ngOnInit(): void {
  this.productService.getProducts().subscribe(
    (products: Product[]) => {
      // console.log(products); 
      this.products = products;
    },
    (error: any) => {
      console.log('Error fetching products:', error);
    }
  );
}


editProduct(productId: string) {
  this.router.navigate(['/edit-product', productId]);
}

deleteProduct(productId: string): void {
  this.productService.deleteProduct(productId).subscribe(
    () => {
      console.log('Product deleted successfully');
      // Optionally, update the products list to reflect the deletion
    },
    (error: any) => {
      console.log('Error deleting product:', error);
      // Handle error cases, e.g., display an error message
    }
  );
}

  
}
