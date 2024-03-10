import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from '../order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl1 = 'http://localhost:3000/api/v1/orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl1);
  }
}