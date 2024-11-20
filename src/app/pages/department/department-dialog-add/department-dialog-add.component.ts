import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DepartmetService } from '../../../services/department/departmet.service';
import { MatIcon } from '@angular/material/icon';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-department-dialog-add',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogContent,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './department-dialog-add.component.html',
  styleUrl: './department-dialog-add.component.scss'
})
export class DepartmentDialogAddComponent implements OnInit {
  departmentAddForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DepartmentDialogAddComponent>,
    private departmentService: DepartmetService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertService.show("prueba", "success");
    this.departmentAddForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]], // Añadí minLength y maxLength con valores adecuados
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]], // Ajusté la longitud
      status: [true]
    });

  }

  onSubmit(): void {
    if (this.departmentAddForm.valid) {
      const formValue = this.departmentAddForm.value;
      const data = {
        name: formValue.name,
        description: formValue.description,
        status: true
      }

      this.departmentService.createdDepartment(data).subscribe(res => {
        if (res) {
          window.location.reload(); 
          this.dialogRef.close(true);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
