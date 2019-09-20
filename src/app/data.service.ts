import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(data: any) {
    return this.http.post(`${environment.apiUrl}v1/account`, data);
  }

  auth(data: any) {
    return this.http.post(`${environment.apiUrl}v1/account/login`, data);
  }

  getContatos() {
    return this.http.get(`${environment.apiMockonUrl}/contatos`);
  }

  getContato(id: string) {
    return this.http.get(`${environment.apiMockonUrl}/contatos/${id}`);
  }

  resetPassword(data: any) {
    return this.http.post(`${environment.apiMockonUrl}/contatos/resetpassword`, data);
  }


}
