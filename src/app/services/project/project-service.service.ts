import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/project/`);
  }

  changeStatusProjectById(projectId: number): Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/project/status/${projectId}`);
  }

  createdProject(project: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/project/register`, project);
  }

  updateProject(project: any): Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}/project/update`, project);
  }
}
