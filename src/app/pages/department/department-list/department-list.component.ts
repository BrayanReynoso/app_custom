import { Component, OnInit, ViewChild, AfterViewInit, inject } from '@angular/core';
import { DepartmetService } from '../../../services/department/departmet.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DepartmentDialogComponent } from '../department-dialog/department-dialog.component';
import { DepartmentDialogAddComponent } from '../department-dialog-add/department-dialog-add.component';
export interface Department {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
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
})
export class DepartmentListComponent implements OnInit, AfterViewInit {
  departments: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'status', 'actions'];
  dataSource = new MatTableDataSource<Department>();
  isLoading = false;
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private departmetService: DepartmetService) { }

  ngOnInit() {
    this.loadDepartments();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadDepartments(): void {
    this.isLoading = true;
    this.departmetService.getAllDepartments().subscribe({
      next: (response) => {
        const departments = response.data;
        this.departments = departments;
        this.dataSource.data = departments;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => {
        console.log('Error loading departments', error);
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeSatusDepartmentById(departmentById: any): void {
    this.isLoading = true;
    this.departmetService.changeSatusDeparmentById(departmentById).subscribe({
      next: (response) => {
        console.log('Department status changed', response);
        this.loadDepartments();
        this.isLoading = false;
      },
      error: (error) => {
        console.log('Error changing department status', error);
        this.isLoading = false;
      }
    });
  }

  editDepartment(departmentId: number): void {
    // Encuentra el departamento que se va a editar desde dataSource.data
    const departmentToEdit = this.dataSource.data.find(department => department.id === departmentId);

    if (departmentToEdit) {
      const dialogRef = this.dialog.open(DepartmentDialogComponent, {
        width: '500px',
        data: departmentToEdit // Pasa el departamento para editar al diálogo
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Departamento actualizado:', result);

          // Encuentra el índice del departamento actualizado en dataSource
          const updatedIndex = this.dataSource.data.findIndex(department => department.id === result.id);

          // Si se encuentra el departamento, actualiza el dataSource
          if (updatedIndex !== -1) {
            this.dataSource.data[updatedIndex] = result; // Actualiza el departamento en el array

            // Asegúrate de actualizar la vista asignando nuevamente el array a dataSource
            this.dataSource.data = [...this.dataSource.data]; // Fuerza la actualización de la vista
          }
        } else {
          console.log('Modal cerrado sin actualizar departamento');
        }
      });
    } else {
      console.error('Departamento no encontrado para editar');
    }
  }

  addDepartment(): void {
    const dialogRef = this.dialog.open(DepartmentDialogAddComponent, {
      width: '500px',
      data: null // Pasa null para indicar que se va a agregar un nuevo departamento
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Departamento agregado:', result);
        this.dataSource.data = [...this.dataSource.data, result]; // Agrega el nuevo departamento al array
      } else {
        console.log('Modal cerrado sin agregar departamento');
      }
    });
  }


}