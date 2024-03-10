import { Component, OnInit } from '@angular/core';
import { Order } from '../../order';
import { OrderService } from '../order.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      (response: any) => {
        if (response.orders) { 
          this.orders = response.orders; 
        } else {
          console.error('Error fetching orders: Response structure is incorrect');
        }
      },
      (error: any) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.orders.length / this.pageSize);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
}