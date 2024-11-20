import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmetService {

  constructor(private http: HttpClient) { }

  getAllDepartments(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/department/`);
  }

  changeSatusDeparmentById(departmentId: any): Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/department/status/${departmentId}`);
  }

  createdDepartment(data: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/department/register`, data);
  }

  updateDepartment(data: any): Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}/department/update`, data);
  }
}
