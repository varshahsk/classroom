import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Credentials {
  id: String,
  name: String,
  password: String,
  userType: String
}
interface userData {
  id: String,
  name: String,
  password: String,
  userType: String
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; 
  constructor(private http: HttpClient) { }
  signUp(userData:userData): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }
login(credentials: Credentials): Observable<any> {
 return this.http.post(`${this.apiUrl}/login`, credentials);}
}
