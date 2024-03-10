import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../users'; 

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = []; 
  pageSize: number = 7; 
  currentPage: number = 1;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (response: any) => {
        if (response.success && response.users) { 
          this.users = response.users; 
        } else {
          console.error('Error fetching users: Response structure is incorrect');
        }
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  changePage(page: number): void {
    this.currentPage = page;
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.users.length / this.pageSize);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
}
