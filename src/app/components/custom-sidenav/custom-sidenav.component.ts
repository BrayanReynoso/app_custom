import { CommonModule } from '@angular/common';
import { Component, computed, Input, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss'
})
export class CustomSidenavComponent {

  sideNavCollapsed = signal(false);
  
  @Input()  set collapsed(val: boolean){
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    { icon: 'home', label: 'Home', route: 'home' },
    { icon: 'people', label: 'Empleados', route: 'employee' },
    { icon: 'dashboard', label: 'Dashboard', route: 'dashboard' },
    { icon: 'people', label: 'Departamentos', route: 'department' },
    {icon: 'folder_copy', label: 'Proyectos', route: 'projects'},
    {icon: 'assignment', label: 'Asignaciones', route: 'assigment'},
    {icon:'settings', label: 'Prueba', route: 'test'},
  ])

  profilePicSize = computed(()=> this.sideNavCollapsed() ? '40' : '100');
}
