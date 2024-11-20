import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProjectServiceService } from '../../../services/project/project-service.service';
import { Observable } from 'rxjs';
import { ProjectDialogAddComponent } from '../project-dialog-add/project-dialog-add.component';
import { AlertService } from '../../../services/alert/alert.service';
import { ProjectDialogUpdateComponent } from '../project-dialog-update/project-dialog-update.component';

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: string;
  assignments: any;
}

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule,

  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit, AfterViewInit {
  constructor(private projectService: ProjectServiceService, private alertService: AlertService){}
  projects: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'startDate', 'endDate', 'budget', 'assignments', 'status', 'actions'];
  dataSource = new MatTableDataSource<Project>();
  isLoading = false;
  readonly dialog = inject(MatDialog);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
   this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.projectService.getAllProjects().subscribe({
      next: (response) => {
        const projects = response.data;
        this.projects = projects;
        this.dataSource.data = projects;
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

  changeStatusProjectById(projectId: number): void {
    this.isLoading = true;
    this.projectService.changeStatusProjectById(projectId).subscribe({
      next: (response) => {
        this.loadProjects();
        this.isLoading = false;
        this.alertService.show('Estado del proyecto actualizado', 'info');
      },
      error: (error) => {
        console.error('Error changing status project', error);
        this.isLoading = false;
        this.alertService.show('Error al actualizar el estado del proyecto', 'error');
      }
    });
  }

  registerProject(): void {
    const dialogRef = this.dialog.open(ProjectDialogAddComponent, {
      width: '600px',
      height: '600px'
    });
  
    dialogRef.afterClosed().subscribe({
      next: (response) => {
        // Verificamos si la respuesta es exitosa
        if (response) {
          this.loadProjects();  // Cargamos los proyectos después de agregar uno nuevo
          this.alertService.show("Se ha registrado con éxito el proyecto", "success");
        } else {
          this.alertService.show("Error al registrar el proyecto", "error");
        }
      },
      error: (error) => {
        console.error("Error al abrir el diálogo para registrar el proyecto", error);
        this.alertService.show("Hubo un error al registrar el proyecto", "error");
      },
      complete: () => {
        // Este bloque se ejecuta siempre al cerrar el diálogo
        console.log("Proceso de registro de proyecto terminado.");
      }
    });
  }

  updateProject(projectId: number): void {
    const projectToEdit = this.dataSource.data.find(project => project.id === projectId);
    if(projectToEdit){
      const dialogRef = this.dialog.open(ProjectDialogUpdateComponent, {
        width: '600px',
        height: '600px',
        data: projectToEdit
      });
    dialogRef.afterClosed().subscribe({
      next: (response) => {
        if (response) {
          this.loadProjects();
          this.alertService.show("Se ha actualizado con éxito el proyecto", "success");
        } else {
          this.alertService.show("Error al actualizar el proyecto", "error");
        }
      },
      error: (error) => {
        console.error("Error al abrir el diálogo para actualizar el proyecto", error);
        this.alertService.show("Hubo un error al actualizar el proyecto", "error");
      },
      complete: () => {
        console.log("Proceso de actualización de proyecto terminado.");
      }
    })
    }
  }

}
