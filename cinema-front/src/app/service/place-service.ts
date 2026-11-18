import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../model/place';
import { Salle } from '../model/salle';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
    private apiUrl:string="/api/place";
    private apiUrlSalle:string="/api/salle/place";
    private http: HttpClient = inject(HttpClient);
    
    public findAll(): Observable<Place[]> {
        console.log("service find all ")
    return this.http.get<Place[]>(this.apiUrl);
    }


    public findSalle(place: Place):Observable<Salle[]>{
      return this.http.get<Salle[]>(`${ this.apiUrlSalle }/${ place.id }`);
    }

    public save(place: Place): Observable<Place> {
    if (!place.id) {
      return this.http.post<Place>(this.apiUrl, place);
    }

        return this.http.put<Place>(`${ this.apiUrl }/${ place.id }`, place);
    }

    public remove(place: Place): Observable<void> {
        return this.http.delete<void>(`${ this.apiUrl }/${ place.id }`);
    }

}
