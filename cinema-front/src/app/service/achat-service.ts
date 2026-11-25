import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Achat } from '../model/achat';
import { Observable } from 'rxjs';
import { Reservation } from '../component/reservation/reservation';
import {  ReservationModel } from '../model/reservationModel';

@Injectable({
  providedIn: 'root',
})
export class AchatService {
    private apiUrl: string = "api/achat";
    private http: HttpClient = inject(HttpClient);
    public findAll(): Observable<Achat[]> {
    return this.http.get<Achat[]>(this.apiUrl);
  }

  public save(achat: Achat): Observable<Achat> {
    if (!achat.id) {
      return this.http.post<Achat>(this.apiUrl, achat);
    }

    return this.http.put<Achat>(`${ this.apiUrl }/${ achat.id }`, achat);
  }

  public remove(achat: Achat): Observable<void> {
    return this.http.delete<void>(`${ this.apiUrl }/${ achat.id }`);
  }

  public getReservations(idUser : number): Observable<ReservationModel[]>{
    return this.http.get<ReservationModel[]>(`${ this.apiUrl }/reservation/${idUser}`);
  }


}
