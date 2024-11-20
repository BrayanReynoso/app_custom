import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { TestService } from '../../../services/test/test.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogActions } from '@angular/material/dialog';
import { TestFormAddComponent } from '../test-form-add/test-form-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../../services/alert/alert.service';
import { TestFormUpdateComponent } from '../test-form-update/test-form-update.component';
import test from 'node:test';

export interface Test {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  salary: string;
  hireDate: Date;
  status: boolean;
  department: any
}

@Component({
  selector: 'app-test-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSort,
    MatPaginatorModule,
    MatFormField,
    MatInput,
    MatButton,
    MatIcon,
    ReactiveFormsModule
  ],
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.scss'
})
export class TestListComponent implements OnInit, AfterViewInit{
  test: any[] = [];
  isLoading: boolean = false;
  dataSource = new MatTableDataSource<Test>();
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'salary', 'hireDate', 'status', 'department', 'actions'];
  private dialog = inject(MatDialog);
  constructor (private serviceTest: TestService, private alert: AlertService){}
  
  ngAfterViewInit(): void {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;  
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadTest();
  }

  loadTest(): void {
     this.isLoading = true;

     this.serviceTest.getAllTest().subscribe({
      next: (response) => {
        const testData = response.data;
        this.dataSource.data = testData;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
        console.log("Datos cargados en el get All -> ",this.test)
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

  openedModalAddTest(): void {
    const dialogRef = this.dialog.open(TestFormAddComponent,{
      width: '500px'
    })

    dialogRef.afterClosed().subscribe(
      {
        next: (res) => {
          if(res){
            this.alert.show("Test Add", "success");
            this.loadTest();
          }else {
            this.alert.show("Ocurrio un error", "error");
          }
        }
      }
    )
  }

  openedUpdateDialog(id: number): void {
    const dataToEdit = this.dataSource.data.find(test => test.id === id);
    if(dataToEdit){
      const dialogRef = this.dialog.open(TestFormUpdateComponent, {
        width: '500px',
        data: dataToEdit
      })
    }
   
  }

}
