import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getAllTest(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/employee/`);
  }

  registerTest(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/employee/register`, data);
  }
}
