import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { start } from 'repl';
import { ProjectServiceService } from '../../../services/project/project-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-project-dialog-update',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,],
  templateUrl: './project-dialog-update.component.html',
  styleUrl: './project-dialog-update.component.scss'
})
export class ProjectDialogUpdateComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectServiceService,
    private dialogRef: MatDialogRef<ProjectDialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public project: any
  ) {
    this.project = { ...project };
  }
  ngOnInit(): void {
    this.initializeForm(this.project);
  }

  initializeForm(project: any): void {
    this.projectForm = this.fb.group({
      name: [project?.name || '', [Validators.required, Validators.minLength(2)]],
      description: [project?.description || '', [Validators.required, Validators.maxLength(255)]],
      startDate: [this.formatDate(project?.startDate) || '', Validators.required],
      endDate: [this.formatDate(project?.endDate) || '', Validators.required],
      budget: [project?.budget || '', Validators.required],
      status: [project?.status ? 'activo' : 'inactivo', Validators.required],
    })
  }

  formatDate(date: string | Date): string {
    if (date) {
      const formattedDate = new Date(date);
      return formattedDate.toISOString().split('T')[0]; // Devuelve solo la fecha en formato YYYY-MM-DD
    }
    return '';
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const formValue = this.projectForm.value;

      const projectData = {
        id: this.project?.id,
        name: formValue.name,
        description: formValue.description,
        startDate: formValue.startDate,
        endDate: formValue.endDate,
        budget: formValue.budget,
        status: formValue.status === 'activo',
      }
      console.log("proyecto a actualizar -> ", projectData);

      if (projectData.id) {
        this.projectService.updateProject(projectData).subscribe(
          (response) => {
            this.onClose();
          },
          (error) => {
            console.error("Error al actualizar el proyecto -> ", error);
          }
        )
      }
    }

  }

  onClose(): void {
    
    this.dialogRef.close(true);
  }
}
