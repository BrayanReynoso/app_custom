import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, AfterViewInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
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
    MatDialogModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  @Input() title: string = 'Tabla';
  @Input() placeholder: string = 'Buscar...';
  @Input() addButtonText: string = 'Agregar';
  @Input() isLoading: boolean = false;

  // Recibe un MatTableDataSource directamente para que funcione la paginación y el filtrado
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @Input() columns: { key: string; header: string }[] = [];
  @Input() pageSizeOptions: number[] = [5, 10, 25];
  @Input() actions: { icon: string; label: string; action: Function }[] = [];

  @Output() add = new EventEmitter<void>();
  @Output() filter = new EventEmitter<string>();
  @Output() rowClick = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.displayedColumns = this.columns.map((c) => c.key);
    if (this.actions.length > 0) {
      this.displayedColumns.push('actions');
    }
  }

  ngAfterViewInit(): void {
    // Configura paginación y ordenamiento
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Filtrado
    this.filter.emit(filterValue.trim().toLowerCase());
  }
}