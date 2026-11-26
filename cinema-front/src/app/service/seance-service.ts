import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seance } from '../model/seance';
import { ProgSeance } from '../model/prog';
import { SalleOption } from '../model/salle-option';

@Injectable({
  providedIn: 'root',
})
export class SeanceService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl = '/api/seance';

  public findAll(): Observable<Seance[]> {
    return this.http.get<Seance[]>(this.apiUrl);
  }

  public findById(id: number): Observable<Seance> {
    return this.http.get<Seance>(`${this.apiUrl}/${id}`);
  }

  // Séances d'un film (nécessite l'endpoint ajouté à l'étape 3)
  public findByFilm(filmId: number): Observable<Seance[]> {
    return this.http.get<Seance[]>(`${this.apiUrl}/film/${filmId}`);
  }

  public save(seance: Seance): Observable<Seance> {
    // Correspond à CreateSeanceRequest côté back : date, heure, salleId, filmId
    const body = {
      date: seance.date,
      heure: seance.heure,
      salleId: seance.salleId,
      filmId: seance.filmId,
    };

    if (!seance.id) {
      return this.http.post<Seance>(this.apiUrl, body);
    }
    return this.http.put<Seance>(`${this.apiUrl}/${seance.id}`, body);
  }

  public remove(seance: Seance): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${seance.id}`);
  }

  public findProgrammation(): Observable<ProgSeance[]> {
  return this.http.get<ProgSeance[]>(`${this.apiUrl}/programmation`);
}

public findSallesCinema(): Observable<SalleOption[]> {
  return this.http.get<SalleOption[]>(`${this.apiUrl}/programmation/salles`);
}

public creerSeance(body: { date: string; heure: string; salleId: number; filmId: number }): Observable<ProgSeance> {
  return this.http.post<ProgSeance>(`${this.apiUrl}/programmation`, body);
}

public modifierSeance(id: number, body: { date: string; heure: string; salleId: number; filmId: number }): Observable<ProgSeance> {
  return this.http.put<ProgSeance>(`${this.apiUrl}/programmation/${id}`, body);
}

public supprimerSeance(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/programmation/${id}`);
}
}