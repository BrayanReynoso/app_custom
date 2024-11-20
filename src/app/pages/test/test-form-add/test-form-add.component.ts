import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { TestService } from '../../../services/test/test.service';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { DepartmetService } from '../../../services/department/departmet.service';
import { response } from 'express';

@Component({
  selector: 'app-test-form-add',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    MatFormField,
    MatLabel,
    MatInputModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption
  
  ],
  templateUrl: './test-form-add.component.html',
  styleUrl: './test-form-add.component.scss'
})
export class TestFormAddComponent implements OnInit{
  formTest!: FormGroup;
  departments: { id: number, name: string, description: string, status: boolean }[] = [];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TestFormAddComponent>,
    private serviceTest: TestService,
    private departmentService: DepartmetService
  ){}

  ngOnInit(): void {
    this.formTest = this.fb.group({
      firstName:['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['',[Validators.required, Validators.email]],
      salary: ['',[Validators.required, Validators.min(1)]],
      hireDate: ['',[Validators.required]],
      status: [true],
      department: ['',[Validators.required]]
    })

    this.loadDepartments();
  }
  loadDepartments(): void {
    this.departmentService.getAllDepartments().subscribe(
      response => {
        this.departments = response.data;
      }
    )
  }
  onSubmit(): void {
    if(this.formTest.valid){
      const formValue = this.formTest.value;

      const data = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        salary: formValue.salary,
        hireDate: formValue.hireDate,
        status: true,
        department: {id: formValue.department}
      }

      this.serviceTest.registerTest(data).subscribe({
        next: (res) => {
          this.dialogRef.close(true);
        }
      })
    }
  }
  onClose(): void {
    this.dialogRef.close();
  }

}
