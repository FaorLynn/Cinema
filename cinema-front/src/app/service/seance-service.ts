import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Seance } from '../model/seance';
import { Salle } from '../model/salle';

@Injectable({
  providedIn: 'root',
})
export class SeanceService {
    private apiUrl:string="/api/place";
    private apiUrlSalle:string="/api/salle/place";
    private http: HttpClient = inject(HttpClient);
    
    public findAll(): Observable<Seance[]> {
        console.log("service find all ")
    return this.http.get<Seance[]>(this.apiUrl);
    }


    public findSalle(seance: Seance):Observable<Salle[]>{
      return this.http.get<Salle[]>(`${ this.apiUrlSalle }/${ seance.id }`);
    }

    public save(seance: Seance): Observable<Seance> {
    if (!seance.id) {
      return this.http.post<Seance>(this.apiUrl, seance);
    }

        return this.http.put<Seance>(`${ this.apiUrl }/${ seance.id }`, seance);
    }

    public remove(seance: Seance): Observable<void> {
        return this.http.delete<void>(`${ this.apiUrl }/${ seance.id }`);
    }

}
