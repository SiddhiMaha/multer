import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../../product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];


  constructor(private router: Router, private productService: ProductService, private httpClient:HttpClient)  { }

 
  ngOnInit(): void {
  this.productService.getProducts().subscribe(
    (products: Product[]) => {
       console.log(products); 

      this.products = products;
       this.products.forEach(product => {
  
          console.log('Image:', product.image); // Change imageUrl to the desired property
        });
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
     
    },
    (error: any) => {
      console.log('Error deleting product:', error);
     
    }
  );
}
}