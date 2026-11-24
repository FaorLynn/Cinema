import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../model/film';

@Injectable()
export class FilmService {
    private http: HttpClient = inject(HttpClient);
    private apiUrl = "/api/film";

    public findAll(): Observable<Film[]> {
        return this.http.get<Film[]>(this.apiUrl);
    }

    public findById(id: number): Observable<Film> {
        return this.http.get<Film>(`${this.apiUrl}/${id}`);
    }

    public save(film: Film): Observable<Film> {
        if (!film.id) {
            return this.http.post<Film>(this.apiUrl, film);
        }
        return this.http.put<Film>(`${this.apiUrl}/${film.id}`, film);
    }

    public remove(film: Film): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${film.id}`);
    }
}