import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule} from '@angular/material/toolbar'
import { MatButtonModule, } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { CustomSidenavComponent } from "./components/custom-sidenav/custom-sidenav.component";
import {ToastrModule} from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AlertComponent } from "./components/alert/alert/alert.component";
import { MatList, MatNavList } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CustomSidenavComponent,
    ToastrModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    AlertComponent,
    MatNavList
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app_custom';

  collapsed =signal(false)

  sidenavWidth = computed(()=> this.collapsed() ? '65px' : '250px');
}
