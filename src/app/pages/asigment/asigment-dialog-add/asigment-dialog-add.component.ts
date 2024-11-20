import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsigmentService } from '../../../services/asigment/asigment.service';
import { error } from 'console';
import { MatOption, MatSelect } from '@angular/material/select';
import { DepartmetService } from '../../../services/department/departmet.service';
import { EmployeeService } from '../../../services/employee/employee.service';

@Component({
  selector: 'app-asigment-dialog-add',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogActions,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepicker,
    MatDialogContent,
    MatSelect,
    MatOption
  ],
  templateUrl: './asigment-dialog-add.component.html',
  styleUrl: './asigment-dialog-add.component.scss'
})
export class AsigmentDialogAddComponent implements OnInit {
  assigmentForm!: FormGroup;
  //departments: { id: number, name: string, description: string, status: boolean }[] = [];
  employees: { id: number, firstName: string, lastName: string, email: string, status: boolean}[] = [];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AsigmentDialogAddComponent>,
    private service: AsigmentService,
    private departmentService: DepartmetService,
    private employeeService: EmployeeService
  ) {

  }

  ngOnInit(): void {
    this.assigmentForm = this.fb.group({
      role: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      assignmentDate: ['', [Validators.required]],
      status: [true],
      employee: [null],
      department: [null]
    });

   // this.loadDepartments();
    this.loadEmployees();
  }
  /*
  loadDepartments(): void {
    this.departmentService.getAllDepartments().subscribe(
      response => {
        console.log('Departamentos cargados:', response);
        this.departments = response.data;
      },
      error => {
        console.error('Error al cargar departamentos:', error);
      }
    );
  }
  */
  

  loadEmployees(): void {
    this.employeeService.getAllEmployee().subscribe(
      response => {
        this.employees = response.data;
      },
      error => {
        console.log(error);
      }
    )
  }



  onSubmit(): void {
    if (this.assigmentForm.valid) {
      const formValue = this.assigmentForm.value;

      const data = {
        role: formValue.role,
        assignmentDate: formValue.assignmentDate,
        status: true,
        employee: {id: formValue.employee},
       // department: {id: formValue.department}
      }
      this.service.addAssignment(data).subscribe
        (response => {
          this.dialogRef.close(true);
        }
        )
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
