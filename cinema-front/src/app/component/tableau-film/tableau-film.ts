import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { RecapitulatifReservation } from '../recapitulatif-reservation/recapitulatif-reservation';
import { ChoisirPlaces } from '../choisir-places/choisir-places';
import { Place } from '../../model/place';
import { Film } from '../../model/film';
import { Seance } from '../../model/seance';
import { FilmService } from '../../service/film-service';
import { SeanceService } from '../../service/seance-service'; // adapte le chemin

@Component({
  selector: 'app-tableau-film',
  standalone: true,
  imports: [ChoisirPlaces, RecapitulatifReservation],
  templateUrl: './tableau-film.html',
  styleUrl: './tableau-film.css',
  providers: [FilmService],
})
export class TableauFilmComponent implements OnInit {
  private readonly auth = inject(AuthService);
  readonly afficherRecapitulatif = signal(false);
  films = signal<Film[]>([]);
  seanceSelectionnee = signal<Seance | null>(null);
  placesSelectionnees = signal<Place[]>([]);
  filmSelectionne = signal<Film | null>(null); // null = pop-up fermé
  seances = signal<Seance[]>([]);
  chargementSeances = signal(false);

  constructor(
    private filmService: FilmService,
    private seanceService: SeanceService,
  ) {}

  ngOnInit(): void {
    this.filmService.findAll().subscribe({
      next: (data) => this.films.set(data),
      error: (err) => console.error('Erreur de chargement des films', err),
    });
  }

  ouvrirReservation(film: Film): void {
    this.seanceSelectionnee.set(null);
    this.afficherRecapitulatif.set(false);
    this.placesSelectionnees.set([]);
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
      },
    });
  }

  fermerReservation(): void {
    this.filmSelectionne.set(null);
    this.seanceSelectionnee.set(null);
    this.afficherRecapitulatif.set(false);
    this.placesSelectionnees.set([]);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.fermerReservation();
  }

  choisirSeance(seance: Seance): void {
    this.afficherRecapitulatif.set(false);
    this.placesSelectionnees.set([]);
    this.seanceSelectionnee.set(seance);
  }

  retourAuxSeances(): void {
    this.seanceSelectionnee.set(null);
    this.afficherRecapitulatif.set(false);
    this.placesSelectionnees.set([]);
  }

  preparerConfirmation(places: Place[]): void {
    if (this.auth.hasRole('ADMIN') || !this.seanceSelectionnee() || places.length === 0) return;
    this.placesSelectionnees.set([...places]);
    this.afficherRecapitulatif.set(true);
  }

  retourAuxSieges(): void {
    this.afficherRecapitulatif.set(false);
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
