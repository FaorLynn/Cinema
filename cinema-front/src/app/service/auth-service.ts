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



  public get role(): string {
  if (!this._token) return '';

  try {
    const payload = this._token.split('.')[1];
    // base64url → base64
    const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));

    const scope: string = json.scope ?? '';
    const role = scope.split(' ').find(s => s.startsWith('ROLE_'));
    return role ? role.replace('ROLE_', '') : '';
  } catch {
    return '';
  }
  
}
public get compteId(): number {
  if (!this._token) return 0;

  try {
    const payload = this._token.split('.')[1];
    const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));

    return Number(json.compteId) || 0;
  } catch {
    return 0;
  }

}
  public isLoggedIn(): boolean {
    return this._token !== '';
  }

  public hasRole(...roles: string[]): boolean {
    return roles.includes(this.role);
}
}
