import { inject, Injectable, Service } from '@angular/core';
import { Compte } from '../model/compte';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface CompteResponse {
  id: number;
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompteService {
    private apiUrl:string="/api/compte";
    private apiUrlSalle:string="/api/compte";
    private http: HttpClient = inject(HttpClient);
    
    public findAll(): Observable<Compte[]> {
        return this.http.get<CompteResponse[]>(this.apiUrl).pipe(
          map((accounts) =>
            accounts.map((account) => ({
              id: account.id,
              login: account.login,
              password: account.password,
            })),
          ),
        );
      }

    public save(account: Compte): Observable<Compte> {
       const request = { login: account.login, password: account.password };
       if (account.id === undefined) {
         return this.http.post<Compte>(this.apiUrl, request);
       }
       return this.http.put<Compte>(`${this.apiUrl}/${account.id}`, request);
     }
   
     public remove(account: Compte): Observable<void> {
       return this.http.delete<void>(`${this.apiUrl}/${account.id}`);
     }
   }
