import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProgSeanceComponent } from '../../component/prog-seance/prog-seance'
import { GestionEquipe, Onglet } from '../../component/gestion-equipe/gestion-equipe';
import { CinemaGestion } from '../../component/cinema-gestion/cinema-gestion';
import { PlacePage } from '../../page/place-page/place-page';
import { ResponsablePage } from '../../page/responsable-page/responsable-page';
import { UtilisateurPage } from '../../page/utilisateur-page/utilisateur-page';
import { GestionFilm } from '../../component/gestion-film/gestion-film';
import { Cinema } from '../../model/cinema';
import { CinemaService } from '../../service/cinema-service';

@Component({
  imports: [RouterLink,RouterLinkActive, ProgSeanceComponent, 
    GestionEquipe, UtilisateurPage, 
    GestionFilm, ProgSeanceComponent, 
    PlacePage, CinemaGestion, ResponsablePage],
  selector: 'app-equipe-page',
  styleUrl: './equipe-page.css',
  templateUrl: './equipe-page.html',
})
export class EquipePage implements OnInit {

  // onglet affiché, lié à la barre gestion-equipe
  protected onglet = signal<Onglet>('utilisateurs');

  protected authService = inject(AuthService);

  private cinemaService = inject(CinemaService);

  // liste du select et cinéma choisi (ADMIN)
  protected cinemas = signal<Cinema[]>([]);
  protected cinemaId = signal<number | null>(null);

  // utilisé par le template : @if (isAdmin)
  protected get isAdmin(): boolean {
    return this.authService.hasRole('ADMIN');
  }

ngOnInit(): void {
  if (this.isAdmin) {
    this.cinemaService.findAll().subscribe(liste => {
      this.cinemas.set(liste);
      this.cinemaId.set(liste[0]?.id ?? null);
    });
  }
}

  protected onCinemaChange(event: Event) {
    this.cinemaId.set(Number((event.target as HTMLSelectElement).value));
  }
}

