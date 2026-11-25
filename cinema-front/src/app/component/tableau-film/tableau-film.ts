import { Component, HostListener, OnInit, signal } from '@angular/core';
import { Film } from '../../model/film';
import { Seance } from '../../model/seance';
import { FilmService } from '../../service/film-service';
import { SeanceService } from '../../service/seance-service'; // adapte le chemin

@Component({
  selector: 'app-tableau-film',
  standalone: true,
  templateUrl: './tableau-film.html',
  styleUrl: './tableau-film.css',
  providers: [FilmService]
})
export class TableauFilmComponent implements OnInit {
  films = signal<Film[]>([]);
  filmSelectionne = signal<Film | null>(null); // null = pop-up fermé
  seances = signal<Seance[]>([]);
  chargementSeances = signal(false);

  constructor(
    private filmService: FilmService,
    private seanceService: SeanceService
  ) {}

  ngOnInit(): void {
    this.filmService.findAll().subscribe({
      next: (data) => this.films.set(data),
      error: (err) => console.error('Erreur de chargement des films', err)
    });
  }

  ouvrirReservation(film: Film): void {
    this.filmSelectionne.set(film);
    this.seances.set([]);

    if (film.id == null) return;

    this.chargementSeances.set(true);
    this.seanceService.findByFilm(film.id).subscribe({
      next: (data) => {
        this.seances.set(data);
        this.chargementSeances.set(false);
      },
      error: (err) => {
        console.error('Erreur de chargement des séances', err);
        this.chargementSeances.set(false);
      }
    });
  }

  fermerReservation(): void {
    this.filmSelectionne.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.fermerReservation();
  }

  choisirSeance(seance: Seance): void {
    console.log('Séance choisie', this.filmSelectionne()?.nom, seance);
    // étape suivante : choix des sièges
  }

  // "14:15:00" -> "14:15"
  heureFormatee(heure: string): string {
    return heure ? heure.slice(0, 5) : '';
  }

  // "2026-11-24" -> "24/11/2026"
  dateFormatee(date: string): string {
    if (!date) return '';
    const [annee, mois, jour] = date.split('-');
    return `${jour}/${mois}/${annee}`;
  }

  dureeFormatee(minutes?: number): string {
    if (!minutes) return '';
    const h = Math.floor(minutes / 60);
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}h ${m}`;
  }

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
    const defaut = '/affiches/defaut.jpg';
    if (img.src.endsWith(defaut)) return;
    img.src = defaut;
  }
}