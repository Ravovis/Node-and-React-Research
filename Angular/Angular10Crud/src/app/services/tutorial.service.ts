import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/about';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl+'/all');
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/id?id=${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl+'/create', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update?id=${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete?id=${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByText(text: any): Observable<any> {
    return this.http.get(`${baseUrl}?text=${text}`);
  }
}