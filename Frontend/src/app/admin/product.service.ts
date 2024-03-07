import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/api/v1/products';
  private imageUploadUrl = 'http://localhost:3000/api/upload';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(productId: string): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<Product>(url);
  }

  addProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, productData);
  }

  

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product._id}`, product);
  }

  deleteProduct(productId: string): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<any>(url);
  }
}
