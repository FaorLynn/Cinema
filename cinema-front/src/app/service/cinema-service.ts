import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Cinema } from '../model/cinema';

@Service()
export class CinemaService {
    private http: HttpClient = inject(HttpClient);
    private apiUrl = "/api/cinema";

    public findAll(): Observable<Cinema[]> {
        return this.http.get<Cinema[]>(this.apiUrl);
    }

    public findById(id: number): Observable<Cinema> {
        return this.http.get<Cinema>(`${this.apiUrl}/${id}`);
    }

    public save(cinema: Cinema): Observable<Cinema> {
        if (!cinema.id) {
            return this.http.post<Cinema>(this.apiUrl, cinema);
        }
        return this.http.put<Cinema>(`${ this.apiUrl }/${ cinema.id }`, cinema);
    }

    public remove(cinema: Cinema): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${cinema.id}`);
    }
}
