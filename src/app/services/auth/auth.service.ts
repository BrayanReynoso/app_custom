import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(): void {
    localStorage.setItem('user', 'loggedIn'); // Simula que el usuario está logueado
  }

  logout(): void {
    localStorage.removeItem('user'); // Elimina el estado de autenticación
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user'); // Verifica si el usuario está logueado
  }
}
