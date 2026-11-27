import {
  Component,
  computed,
  inject,
  input,
  OnChanges,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

import { Cinema } from '../../model/cinema';
import { Film } from '../../model/film';
import { Place } from '../../model/place';
import { Seance } from '../../model/seance';
import { AuthService } from '../../service/auth-service';
import { CinemaService } from '../../service/cinema-service';

@Component({
  selector: 'app-recapitulatif-reservation',
  imports: [DatePipe],
  providers: [CinemaService],
  templateUrl: './recapitulatif-reservation.html',
  styleUrl: './recapitulatif-reservation.css',
})
export class RecapitulatifReservation implements OnChanges, OnDestroy {
  readonly film = input.required<Film>();
  readonly seance = input.required<Seance>();
  readonly places = input.required<Place[]>();
  readonly retour = output<void>();
  readonly fermer = output<void>();

  private readonly auth = inject(AuthService);
  private readonly cinemaService = inject(CinemaService);
  private requete?: Subscription;

  readonly cinema = signal<Cinema | null>(null);
  readonly chargement = signal(false);
  readonly erreur = signal('');
  readonly placesTriees = computed(() =>
    [...this.places()].sort((a, b) => a.range - b.range || a.col - b.col),
  );

  get estAdmin(): boolean {
    return this.auth.hasRole('ADMIN');
  }

  ngOnChanges(): void {
    this.chargerCinema();
  }

  ngOnDestroy(): void {
    this.requete?.unsubscribe();
  }

  chargerCinema(): void {
    this.requete?.unsubscribe();
    this.cinema.set(null);
    this.erreur.set('');
    this.chargement.set(false);
    if (this.estAdmin) return;

    const salle = this.seance().salle;
    const cinemaId = salle?.cinemaId ?? salle?.Cinema?.id;
    if (cinemaId == null) return;

    this.chargement.set(true);
    this.requete = this.cinemaService.findById(cinemaId).subscribe({
      next: (cinema) => {
        this.cinema.set(cinema);
        this.chargement.set(false);
      },
      error: () => {
        this.erreur.set('Le cinéma ne peut pas être chargé pour le moment.');
        this.chargement.set(false);
      },
    });
  }
}
