import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
export interface Employee {
  id: number;
  name: string;
  lastName: string;
  email: string;
  salary: number;
  hireDate: string;
  department: string;
  status: string;
}
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit, AfterViewInit{
  employees: any[] = [];
  isLoading: boolean = false;
  displayedColumns: string[] = [
    'id',          // Coincide con matColumnDef="id"
    'firstName',   // Coincide con matColumnDef="firstName"
    'lastName',    // Coincide con matColumnDef="lastName"
    'email',       // Coincide con matColumnDef="email"
    'salary',      // Coincide con matColumnDef="salary"
    'hireDate',    // Coincide con matColumnDef="hireDate"
    'department',  // Coincide con matColumnDef="department"
    'status',      // Coincide con matColumnDef="status"
    'actions'      // Coincide con matColumnDef="actions"
  ]; 
  dataSource = new MatTableDataSource<Employee>();
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: EmployeeService) { }

  ngAfterViewInit(): void {
   this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
   this.loadEmployees();
  }

  loadEmployees() {
   this.isLoading = true;
    this.service.getAllEmployee().subscribe({
      next: (response) => {
        const employees = response.data;
        this.employees = employees;
        this.dataSource.data = employees;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  changeStatusEmployeeById(employeeId: number): void {

  }

  editEmployee(employeeId: number): void {

  }

 
}
