import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inyecta el Router
  const isLoggedIn = !!localStorage.getItem('user'); // Simula autenticación (puedes reemplazarlo por tu lógica real)

  if (isLoggedIn) {
    return true; // Permitir acceso si está logueado
  } else {
    // Redirigir al login con la URL a la que intentó acceder
    router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
    return false; // Bloquear acceso
  }
};
