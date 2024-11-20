import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContentComponent } from './pages/content/content.component';
import { HomeComponent } from './pages/home/home.component';
import { DepartmentListComponent } from './pages/department/department-list/department-list.component';
import { ProjectListComponent } from './pages/project/project-list/project-list.component';
import { EmployeeComponent } from './pages/employee/employee/employee.component';
import { AsigmentListComponent } from './pages/asigment/asigment-list/asigment-list.component';
import { TestListComponent } from './pages/test/test-list/test-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    {path: 'content', component: ContentComponent},
    {path: 'department', component: DepartmentListComponent},
    {path: 'projects', component: ProjectListComponent},
    {path: 'employee', component: EmployeeComponent},
    {path: 'assigment', component: AsigmentListComponent, canActivate: [authGuard]},
    {path: 'test', component: TestListComponent}
];
