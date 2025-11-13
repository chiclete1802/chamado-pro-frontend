import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly API_URL = '';

  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.API_URL}${url}`);
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.API_URL}${url}`, data);
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.API_URL}${url}`, data);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.API_URL}${url}`);
  }
}
