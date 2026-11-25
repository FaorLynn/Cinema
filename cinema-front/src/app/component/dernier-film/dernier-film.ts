import { Component, OnInit, signal } from '@angular/core';
import { FilmService } from '../../service/film-service';
import { Film } from '../../model/film';

@Component({
  selector: 'app-dernier-film',
  standalone: true,
  imports: [],
  styleUrl: './dernier-film.css',
  templateUrl: './dernier-film.html',
})
export class DernierFilm implements OnInit {

  film = signal<Film | null>(null);
  chargement = signal(true);

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.filmService.findDernierFilm().subscribe({
      next: (data) => {
        this.film.set(data);
        this.chargement.set(false);
        console.log('Film affiché :', this.film());
      },
      error: (err) => {
        console.error('Erreur de chargement', err);
        this.chargement.set(false);
      }
    });
  }
}