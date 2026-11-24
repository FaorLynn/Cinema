import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../model/auth';
import { AuthResponse } from '../model/auth-response';
import { Register } from '../model/register';
import { RegisterResponse } from '../model/register-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private _token: string = sessionStorage.getItem('token') ?? "";

    public get token(): string {
    return this._token;
  }

  public set token(value: string) {
    this._token = value;
  }

  constructor(private http: HttpClient) {
  }

  public login(auth: Auth): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/compte/auth', auth);
  }

  public register(register:Register):Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>("/api/compte/subscribe",register);
  }

  public logout(){
    
    this._token = "";
    
    sessionStorage.removeItem('token');
  }

}
