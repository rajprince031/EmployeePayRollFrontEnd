import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employees.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  imports: [FormsModule], // Required for ngModel
})
export class AddEmployeeComponent {
  employee = {
    id:'',
    name: '',
    gender: '',
    department: '',
    salary: '',
    joiningDate: '',
  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private http: HttpClient
  ) {}

  addEmployee() {
    // console.log("adding Employee------",this.employee);
    this.http.post('http://localhost:8080/user', this.employee).subscribe({
      error: () => {
        alert('try again!!!');
        // console.log("try again")
      },
      complete: () => {
        this.router.navigateByUrl('/');
        alert('new employee added successfully');
        // console.log("new employee added successfully")
      },
    });
  }
}
