import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompatibilityService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  submitUserData(name: string, answers: number[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit`, { name, answers });
  }

  calculateCompatibility(name1: string, answers1: number[], name2: string, answers2: number[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/compatibility`, { name1, answers1, name2, answers2 });
  }
}
