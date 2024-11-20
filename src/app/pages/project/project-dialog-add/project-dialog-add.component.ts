import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DepartmentDialogAddComponent } from '../../department/department-dialog-add/department-dialog-add.component';
import { ProjectServiceService } from '../../../services/project/project-service.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TestService } from '../../../services/test/test.service';

@Component({
  selector: 'app-project-dialog-add',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogContent,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIcon,
    MatDatepickerModule
    
  ],
  templateUrl: './project-dialog-add.component.html',
  styleUrl: './project-dialog-add.component.scss'
})
export class ProjectDialogAddComponent implements OnInit{
  projectAddForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DepartmentDialogAddComponent>,
    private projectService: ProjectServiceService,
  ){}

  ngOnInit(): void {
    this.projectAddForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      budget: ['', [Validators.required, Validators.min(1)]],
      status: [true],
    })
  }

  onSubmit(): void {
    if(this.projectAddForm.valid){
      const formValue = this.projectAddForm.value;

      const data = {
        name: formValue.name,
        description: formValue.description,
        startDate: formValue.startDate,
        endDate: formValue.endDate,
        budget: formValue.budget,
        status: true,
        assignments: {}
      }

      this.projectService.createdProject(data).subscribe(res =>{
        if(res){
          this.dialogRef.close(true);
        }
      })
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
