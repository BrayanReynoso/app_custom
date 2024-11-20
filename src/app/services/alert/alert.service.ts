import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AlertComponent } from '../../components/alert/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) {}

  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration: number = 3000): void {
    const config: MatSnackBarConfig = {
      duration,
      data: { message, type },
      panelClass: ['snackbar-style'],
    };

    this.snackBar.openFromComponent(AlertComponent, config);
  }
}
