import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatFormField, MatLabel, MatInputModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(); // Marca al usuario como logueado
    this.router.navigate(['/dashboard']); // Redirige a la ruta deseada (por ejemplo, Dashboard)
  }

  logout(): void {
    this.authService.logout(); // Marca al usuario como no logueado
    this.router.navigate(['/home']); // Redirige a la página de inicio
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Verifica si el usuario está logueado
  }
}
