import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AsigmentService {

  constructor(private http: HttpClient) { }

  getAllAsigments(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/assignment/`);
  }

  changeSatusAssigmentById(assignmentId: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/assignment/status/${assignmentId}`);
  }

  addAssignment(assignment: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/assignment/register`, assignment);
  }

  updateAssignment(assignment: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/assignment/update`, assignment);
  }
}
