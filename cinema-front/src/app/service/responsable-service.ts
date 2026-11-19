import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Responsable } from '../model/responsable';

interface ResponsableResponse {
  id: number;
  login: string;
  cinema?: { id: number; nom: string } | null;
}

@Injectable({ providedIn: 'root' })
export class ResponsableService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/responsable';

  public findAll(): Observable<Responsable[]> {
    return this.http.get<ResponsableResponse[]>(this.apiUrl).pipe(
      map((accounts) =>
        accounts.map((account) => ({
          id: account.id,
          login: account.login,
          cinemaId: account.cinema?.id,
          cinemaNom: account.cinema?.nom,
        })),
      ),
    );
  }

  public save(account: Responsable): Observable<Responsable> {
    const request = { login: account.login, password: account.password };
    if (account.id === undefined) {
      return this.http.post<Responsable>(this.apiUrl, request);
    }
    return this.http.put<Responsable>(`${this.apiUrl}/${account.id}`, request);
  }

  public remove(account: Responsable): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${account.id}`);
  }
}
