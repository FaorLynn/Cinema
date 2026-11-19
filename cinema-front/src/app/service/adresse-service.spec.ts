import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adresse } from '../model/adresse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdresseService {
  private apiUrl: string = "/api/adresse";
  private http: HttpClient = inject(HttpClient);

  public findAll(): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(this.apiUrl);
  }

  public save(adresse: Adresse): Observable<Adresse> {
    if (!adresse.id) {
      return this.http.post<Adresse>(this.apiUrl, adresse);
    }

    return this.http.put<Adresse>(`${ this.apiUrl }/${ adresse.id }`, adresse);
  }

  public remove(adresse: Adresse): Observable<void> {
    return this.http.delete<void>(`${ this.apiUrl }/${ adresse.id }`);
  }
}

