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
  productForm!: FormGroup; // Declare productForm property of type FormGroup
  product!:Product
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder // Inject FormBuilder
  ) { }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (product: Product) => {
          this.productForm.patchValue(product); // Populate form with product data
        },
        (error: any) => {
          console.log('Error fetching product:', error);
        }
      );
    }

    // Initialize the form group
    this.productForm = this.formBuilder.group({
      _id: [''], // Assuming _id is part of the product data
      name: [''], // Assuming name is part of the product data
      price: [0], // Assuming price is part of the product data
      description: [''], // Assuming description is part of the product data
      category: [''],
      image: [''] // Assuming image is part of the product data
    });
  }

  // Define method to handle form submission
  onSubmit() {
    
    const updatedProduct: Product = { ...this.product, ...this.productForm.value };

    this.productService.updateProduct(updatedProduct).subscribe(
      (updatedProduct: Product) => {
        console.log('Product updated successfully:', updatedProduct);
        // Optionally, navigate to a different page or display a success message
      },
      (error: any) => {
        console.log('Error updating product:', error);
        // Handle error cases, e.g., display an error message
      }
    );

  }
}
