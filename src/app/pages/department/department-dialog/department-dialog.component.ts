import { ChangeDetectionStrategy, Component, Inject, NgModule, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DepartmetService } from '../../../services/department/departmet.service';

@Component({
  selector: 'app-department-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.scss'],
})
export class DepartmentDialogComponent implements OnInit {
  departmentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DepartmentDialogComponent>,
    private departmentService: DepartmetService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { this.data = { ...data }; }

  ngOnInit(): void {
    this.initializeForm(this.data);
  }
  onSave(): void {
    this.dialogRef.close(this.data);
  }
  initializeForm(data: any): void {
    this.departmentForm = this.fb.group({
      name: [data?.name || '', [Validators.required, Validators.minLength(2)]],
      description: [data?.description || '', [Validators.required, Validators.maxLength(255)]],
      status: [data?.status ? 'activo' : 'inactivo', Validators.required], // Si 'status' es un booleano, ajusta el valor
    });
  }

  onSubmit(): void {
    if (this.departmentForm.valid) {
      const formValue = this.departmentForm.value;

      const departmentData = {
        id: this.data?.id, // Agregar el id si está presente en los datos
        name: formValue.name,
        description: formValue.description,
        status: formValue.status === 'activo', // Si el status es 'activo', lo mandamos como true, si es 'inactivo' como false
      }
      // Si el id está presente, hacemos una actualización, de lo contrario, podrías manejar la creación
      if (departmentData.id) {
        this.departmentService.updateDepartment(departmentData).subscribe(
          (response) => {
            window.location.reload(); 
            this.dialogRef.close();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}