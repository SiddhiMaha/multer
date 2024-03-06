import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../../product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup;

  constructor(private productService: ProductService, private fb: FormBuilder ,private httpclient:HttpClient) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, Validators.required],
      
      // Initialize with null for file input
    });
  }
  upload(event: any) {
    console.log(event); // Check the event object
    const file = event.target.files[0];
    console.log(file); // Check if file is retrieved correctly
    const formData = new FormData();
    formData.append('file', file);
    this.httpclient.post('http://localhost:3000/api/upload', formData).subscribe((d) => {
      console.log(d); // Log the response from the backend
    },(error:any) => {
      console.error(error);
    });
  }
  
  
  onSubmit(): void {
    if (this.productForm.valid) {
      // If the form is valid, you can extract the form data and submit it
      const productData = this.productForm.value; // Extracting form data
      this.productService.addProduct(productData).subscribe(
        (response:any) => {
          console.log('Product created successfully', response);
          // Optionally, you can reset the form after successful submission
          this.productForm.reset();
        },
        (error:any) => {
          console.error('Error creating product', error);
        }
      );
    }
  }

  ngOnInit(): void {}
}
