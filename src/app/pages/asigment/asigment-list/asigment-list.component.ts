import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { AsigmentService } from '../../../services/asigment/asigment.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AlertService } from '../../../services/alert/alert.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AsigmentDialogAddComponent } from '../asigment-dialog-add/asigment-dialog-add.component';
import { AsigmentDialogUpdateComponent } from '../asigment-dialog-update/asigment-dialog-update.component';

export interface Asigment {
  id: number;
  role: string;
  assignmentDate: Date;
  status: boolean;
  employee: any;
}

@Component({
  selector: 'app-asigment-list',
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
    MatButtonModule,
    MatDialogModule,
    MatDialogContent
  ],
  templateUrl: './asigment-list.component.html',
  styleUrl: './asigment-list.component.scss'
})
export class AsigmentListComponent implements OnInit, AfterViewInit{
  asigments: any[] = [];
  isLoading: boolean = false;
  displayedColumns: string[] = ['id', 'role', 'assignmentDate', 'status', 'employee', 'department', 'actions'];  dataSource = new MatTableDataSource<Asigment>();
  private dialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: AsigmentService, private alertService: AlertService) { }
  ngAfterViewInit(): void {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
   this.loadAssigments();
  }

  loadAssigments() {
    this.isLoading = true;
    this.service.getAllAsigments().subscribe({
      next: (response)=>{
        const assignments = response.data;
        this.asigments = assignments;
        this.dataSource.data = assignments;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false
      },error: (error)=>{
        this.alertService.show(`Error al obtener los datos del servidor`, "error");
        this.isLoading = false
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

  changeStatusAssignmentById(assignmentId: number): void {
    const assignment = this.dataSource.data.find(assigment => assigment.id === assignmentId);
    const data = assignment?.role;
    this.isLoading = true;
    this.service.changeSatusAssigmentById(assignmentId).subscribe({
      next: (response)=>{
        this.alertService.show(`Estado de la asignación ${data} se ha actualizado exitosamente`, "success");
        this.loadAssigments();
      },
      error: (error)=>{
        this.alertService.show(`Error al actualizar el estado de la asignación`, "error");
        this.isLoading = false;
      }
    })
  }

  openDialogAddAssignment(): void {
    const dialogRef = this.dialog.open(AsigmentDialogAddComponent, {
      width: '600px',
      data: null
    })

    dialogRef.afterClosed().subscribe({
      next: (response)=>{
        if(response){
          this.loadAssigments();
          this.alertService.show('Asignación creada exitosamente', 'success');
        }else {
          this.alertService.show("El proceso de creación de la asignación ha sido cancelado", "warning");
        }
      }
        
    })
  }

  openUpdateDialog(assigId: number): void {
    const assigToEdit = this.dataSource.data.find(assigment => assigment.id === assigId);
    const dialogRef = this.dialog.open(AsigmentDialogUpdateComponent,{
      width: '600px',
      data: assigToEdit
    }); 

    dialogRef.afterClosed().subscribe({
      next: (response)=>{
        if(response){
          this.loadAssigments();
          this.alertService.show('Asignación actualizada exitosamente', 'success');
        }else {
          this.alertService.show("Error al actualizar la asignación", "warning");
        }
      }
    })
    
  }

  onClose(): void {
    this.dialog.closeAll();
  }
}
