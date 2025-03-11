import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employees.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update-employee',
  imports: [FormsModule],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css',
  standalone:true,
})
export class UpdateEmployeeComponent {

  employee = {
    id: '',
    name: '',
    gender: '',
    department: '',
    salary: '',
    joiningDate: '',
  };
  data:any;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
  ) {

    this.data = this.router.getCurrentNavigation()?.extras.state?.['response'];
    if (!this.data) {
      this.router.navigate(['']);
      alert("something went wrong!!!");
    }
    this.employee = this.data;
  }


  updateEmployeDetails() {
    this.http.put('http://localhost:8080/user/'+this.employee.id, this.employee).subscribe({
      next:(response)=>{
        console.log("Printing the response after put : ",response)
      },
      complete:()=>{
        this.router.navigate(['']);
        alert("Employee Detail updated");
      },
      error:(err)=>{
        alert("something went wrong");
        console.log("Error while updating the employee details : ",err);
      }
    })
  }
  
}
