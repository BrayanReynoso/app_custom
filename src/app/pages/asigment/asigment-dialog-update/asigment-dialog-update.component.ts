import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContainer, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { AsigmentService } from '../../../services/asigment/asigment.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../../services/employee/employee.service';

@Component({
  selector: 'app-asigment-dialog-update',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
  
  ],
  templateUrl: './asigment-dialog-update.component.html',
  styleUrl: './asigment-dialog-update.component.scss'
})
export class AsigmentDialogUpdateComponent implements OnInit {
  assigmentForm!: FormGroup;
  employees: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceAssigments: AsigmentService, 
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AsigmentDialogUpdateComponent>
  ) { this.data = { ...data }; }

  ngOnInit(): void {
    this.initializeForm(this.data);
    this.loadEmployees();
  }
  initializeForm(asigment: any): void {
    this.assigmentForm = this.fb.group({
      role: [asigment?.role || '',],
      assignmentDate: [this.formatDate(asigment?.assignmentDate) || '',],
      status: [asigment?.status || '',],
      employee: [asigment?.employee?.id || '',]
    })
  }
  loadEmployees(): void {
    // Llama al servicio para obtener la lista de empleados
    this.employeeService.getAllEmployee().subscribe({
      next: (response) => {
        this.employees = response.data; // Ajusta según la estructura de tu respuesta
        console.log("Empleados cargados -> ", this.employees);
      },
      error: (error) => {
        console.error('Error al cargar empleados:', error);
      }
    });
  }
  formatDate(assignmentDate: any): any {
    if (assignmentDate) {
      const formattedDate = new Date(assignmentDate);
      return formattedDate.toISOString().split('T')[0];
    }
    return '';
  }
  
  onSubmit(){
    if(this.assigmentForm.valid){
      const assigUpdate = this.assigmentForm.value;

      const data = {
        id: this.data.id,
        role: assigUpdate.role,
        assignmentDate: assigUpdate.assignmentDate,
        status: true,
        employee:{id: assigUpdate.employee}

      }

      this.serviceAssigments.updateAssignment(data).subscribe({
        next: (response) => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error al actualizar la asignación:', error);
        }
      });
    }
  }
  onClose(){
    this.dialogRef.close();
  }
}
