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
import { forkJoin, Subscription } from 'rxjs';

import { Place } from '../../model/place';
import { Seance } from '../../model/seance';
import { AuthService } from '../../service/auth-service';
import { DisponibilitePlacesService } from '../../service/disponibilite-places-service';
import { PlaceService } from '../../service/place-service';

@Component({
  selector: 'app-choisir-places',
  templateUrl: './choisir-places.html',
  styleUrl: './choisir-places.css',
})
export class ChoisirPlaces implements OnChanges, OnDestroy {
  readonly seance = input.required<Seance>();
  readonly retour = output<void>();
  readonly selectionModifiee = output<void>();
  readonly continuer = output<Place[]>();

  private readonly placesService = inject(PlaceService);
  private readonly detailsService = inject(DisponibilitePlacesService);
  private readonly auth = inject(AuthService);
  private requete?: Subscription;

  readonly places = signal<Place[]>([]);
  readonly occupees = signal<number[]>([]);
  readonly selection = signal<Place[]>([]);
  readonly chargement = signal(false);
  readonly erreur = signal('');
  readonly rangees = computed(() =>
    [...new Set(this.places().map((p) => p.range))].sort((a, b) => a - b),
  );

  get lectureSeule(): boolean {
    return this.auth.role.toUpperCase() === 'ADMIN';
  }

  ngOnChanges(): void {
    this.charger();
  }

  ngOnDestroy(): void {
    this.requete?.unsubscribe();
  }

  charger(): void {
    this.requete?.unsubscribe();
    this.selection.set([]);
    this.places.set([]);
    this.occupees.set([]);
    this.erreur.set('');
    const seance = this.seance();
    const salleId = seance.salleId ?? seance.salle?.id;

    if (seance.id == null || salleId == null) {
      this.chargement.set(false);
      this.erreur.set('La séance ou sa salle est introuvable. Revenez au choix de la séance.');
      return;
    }

    this.chargement.set(true);
    this.requete = forkJoin({
      places: this.placesService.findAll(),
      details: this.detailsService.findAll(),
    }).subscribe({
      next: ({ places, details }) => {
        this.places.set(
          places
            .filter((p) => (p.salleId ?? p.salle?.id) === salleId && p.id != null)
            .sort((a, b) => a.range - b.range || a.col - b.col),
        );
        this.occupees.set(details.filter((d) => d.seanceId === seance.id).map((d) => d.placeId));
        this.chargement.set(false);
      },
      error: () => {
        this.erreur.set(
          'Impossible de vérifier les places disponibles. Réessayez avant de choisir un siège.',
        );
        this.chargement.set(false);
      },
    });
  }

  placesDeRangee(rangee: number): Place[] {
    return this.places().filter((p) => p.range === rangee);
  }

  estOccupee(place: Place): boolean {
    return place.id != null && this.occupees().includes(place.id);
  }

  estSelectionnee(place: Place): boolean {
    return this.selection().some((p) => p.id === place.id);
  }

  choisir(place: Place): void {
    if (
      this.lectureSeule ||
      this.chargement() ||
      this.erreur() ||
      this.estOccupee(place) ||
      !this.places().some((p) => p.id === place.id)
    )
      return;

    this.selectionModifiee.emit();
    this.selection.update((selection) =>
      this.estSelectionnee(place)
        ? selection.filter((p) => p.id !== place.id)
        : [...selection, place],
    );
  }

  valider(): void {
    if (!this.lectureSeule && !this.chargement() && !this.erreur() && this.selection().length > 0) {
      this.continuer.emit([...this.selection()]);
    }
  }
}
