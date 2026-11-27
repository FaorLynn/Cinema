import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Utilisateur } from '../model/utilisateur';

interface UtilisateurResponse {
  Id: number;
  login: string;
  nom: string;
  prenom: string;
  adresse: Utilisateur['adresse'];
}

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/utilisateur';

  public findAll(): Observable<Utilisateur[]> {
    return this.http.get<UtilisateurResponse[]>(this.apiUrl).pipe(
      map((accounts) =>
        accounts.map((account) => ({
          id: account.Id,
          login: account.login,
          nom: account.nom,
          prenom: account.prenom,
          adresse: account.adresse,
        })),
      ),
    );
  }

  public findById(id: number): Observable<Utilisateur> {
    return this.http.get<UtilisateurResponse>(`${this.apiUrl}/${id}`).pipe(
      map((account) => ({
        id: account.Id,
        login: account.login,
        nom: account.nom,
        prenom: account.prenom,
        adresse: account.adresse,
      }))
    );
  }

  public save(account: Utilisateur): Observable<Utilisateur> {
    const request = {
      login: account.login,
      password: account.password,
      nom: account.nom,
      prenom: account.prenom,
      adresse: account.adresse,
    };
    if (account.id === undefined) {
      return this.http.post<Utilisateur>(this.apiUrl, request);
    }
    return this.http.put<UtilisateurResponse>(`${this.apiUrl}/${account.id}`, request).pipe(
      map(response => ({ ...response, id: response.Id }))
    );
  }

  public remove(account: Utilisateur): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${account.id}`);
  }
}
