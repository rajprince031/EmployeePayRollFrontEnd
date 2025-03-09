import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employees.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees',
  imports: [CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
  standalone: true,
})
export class EmployeesComponent {
  employeeInfo: any[] = [];
  showConfirmation: any = false;
  itemToDelete: any = null;
  constructor(
    private employeeService: EmployeeService,
    private http: HttpClient,
    private router: Router
  ) {
    this.getInformation();
  }
  getInformation() {
    this.http.get('http://localhost:8080/user').subscribe((result: any) => {
      this.employeeInfo = result;
    });
  }
  navigateToAddEmployee() {
    this.router.navigateByUrl('/add');
  }

  onClickUpdate(item: any) {
    console.log('I am update');
  }

  onClickDelete(item: any) {
    this.showConfirmation = true;
    this.itemToDelete = item;
    console.log('I am delete');
  }

  deleteEmployee(id: number) {
    console.log('I am delete', id);
    this.employeeInfo.filter(employee => employee.id !== id);
    this.http.delete('http://localhost:8080/user/' + id).subscribe({
      complete: () => {
        alert('Employee deleted successfully');
        this.getInformation();
      },
      error: (error) => {
        console.error('Error deleting employee from server', error);
      },
    });
    this.showConfirmation = false;
  }

  confirmDelete(response: boolean) {
    if (!response) {
      this.showConfirmation = false;
      return;
    }
    this.deleteEmployee(this.itemToDelete.id);
  }
}
