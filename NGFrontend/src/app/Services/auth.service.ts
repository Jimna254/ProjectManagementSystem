import { Injectable } from '@angular/core';
import { loginDetails, registerDetails } from '../Interfaces/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerUser(register_details: registerDetails) {
    return this.http.post<{
      message: string;
      error: string;
      messageerror: string;
    }>('http://localhost:3001/users', register_details);
  }

  loginUser(user_details: loginDetails) {
    return this.http.post<{ message: string; token: string; error: string }>(
      'http://localhost:3001/users/login',
      user_details
    );
  }
  readToken(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token,
      }),
    };
    return this.http.post<{
      info: { user_id: string; name: string; email: string; role: string };
    }>('http://localhost:3001/users/checkdetails', {}, httpOptions);
  }
}
