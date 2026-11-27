import { inject, Injectable } from '@angular/core';
import { Cinema } from '../model/cinema';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Salle } from '../model/salle';

interface SalleResponse {
    id? : number;
    nom : string ;
    capacite_max : number ;
    Cinema : Cinema ;
    type:string;
}

@Injectable({
  providedIn: 'root',
})

export class SalleService {
  private apiUrl:string="/api/salle";
  private apiUrlSalle:string="/api/salle";
  private http: HttpClient = inject(HttpClient);
  
  public findAll(): Observable<Salle[]> {
    return this.http.get<SalleResponse[]>(this.apiUrl).pipe(
      map((accounts) =>
        accounts.map((account) => ({
          id: account.id,
          nom: account.nom,
          capacite_max: account.capacite_max,
          Cinema : account.Cinema,
          type:account.type
        })),
      ),
    );
  }

  public save(account: Salle): Observable<Salle> {
    const request = { id: account.id, nom: account.nom, capacite_max: account.capacite_max, cinemaId  : account.Cinema.id,type :account.type};
    if (account.id === undefined) {
      return this.http.post<Salle>(this.apiUrl, request);
    }
    return this.http.put<Salle>(`${this.apiUrl}/${account.id}`, request);
  }

  public remove(account: Salle): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${account.id}`);
  }

  public findSallesDisponibles(): Observable<Salle[]> {
    return this.findAll().pipe(
        map(salles => salles.filter(salle => salle.capacite_max > 0))
    );
  }
  public findSallesByCinemaId(id: number): Observable<Salle[]>{
    return this.http.get<Salle[]>(`${this.apiUrl}/cinema/${id}`); 

  }

}