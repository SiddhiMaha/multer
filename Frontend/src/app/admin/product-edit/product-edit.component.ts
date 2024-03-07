import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../product';
import { FormBuilder, FormGroup } from '@angular/forms'; // Import FormBuilder and FormGroup

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm!: FormGroup; 
  product!:Product
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder 
  ) { }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (product: Product) => {
          this.productForm.patchValue(product); 
        },
        (error: any) => {
          console.log('Error fetching product:', error);
        }
      );
    }

    
    this.productForm = this.formBuilder.group({
      _id: [''], 
      name: [''],
      price: [0], 
      description: [''], 
      category: [''],
      image: [''] 
    });
  }

  onSubmit() {
    
    const updatedProduct: Product = { ...this.product, ...this.productForm.value };

    this.productService.updateProduct(updatedProduct).subscribe(
      (updatedProduct: Product) => {
        console.log('Product updated successfully:', updatedProduct);
     
      },
      (error: any) => {
        console.log('Error updating product:', error);
      
      }
    );

  }
}

