import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;
  successMessage: string = '';


  constructor(private fb: FormBuilder, private productService: ProductService,private httpclient:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      image: ['']
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.get('image')!.setValue(file);
    }
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }
  
    const productData = this.productForm.value;
    const formData = new FormData();
  
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('category', productData.category);
    formData.append('price', productData.price);
    formData.append('image', productData.image);
  
    this.productService.addProduct(formData).subscribe(
      (response) => {
        console.log('Product created successfully:', response);
        this.successMessage = 'Product added successfully!';
        this.router.navigate(['/product-list']);
      },
      (error) => {
        console.error('Error creating product:', error);
        // Handle error
      }
    );
  }
  
  }