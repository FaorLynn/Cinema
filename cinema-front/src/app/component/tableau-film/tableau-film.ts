import { Component, OnInit, signal } from '@angular/core';
import { Film } from '../../model/film';
import { FilmService } from '../../service/film-service';

@Component({
  selector: 'app-tableau-film',
  standalone: true,
  templateUrl: './tableau-film.html',
  styleUrl: './tableau-film.css',
  providers: [FilmService]
})
export class TableauFilmComponent implements OnInit {
  films = signal<Film[]>([]);

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.filmService.findAll().subscribe({
      next: (data) => this.films.set(data),
      error: (err) => console.error('Erreur de chargement des films', err)
    });
  }


  // 128 -> "2h 08"
  dureeFormatee(minutes?: number): string {
    if (!minutes) return '';
    const h = Math.floor(minutes / 60);
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}h ${m}`;
  }

  // ["SCIENCE_FICTION", "ACTION"] -> "Science fiction, Action"
  genresTexte(film: Film): string {
    return film.genres
      .map((g) => {
        const texte = String(g).replace(/_/g, ' ').toLowerCase();
        return texte.charAt(0).toUpperCase() + texte.slice(1);
      })
      .join(', ');
  }

  afficheParDefaut(event: Event): void {
  const img = event.target as HTMLImageElement;
  img.onerror = null; 
  img.src = 'affiches/defaut.jpg';
}
}