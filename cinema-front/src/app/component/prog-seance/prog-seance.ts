import { Component, HostListener, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Film } from '../../model/film';
import { ProgSeance } from '../../model/prog';
import { SalleOption } from '../../model/salle-option';
import { FilmService } from '../../service/film-service';
import { SeanceService } from '../../service/seance-service';

@Component({
  selector: 'app-prog-seance',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './prog-seance.html',
  styleUrl: './prog-seance.css',
  providers: [FilmService]
})
export class ProgSeanceComponent implements OnInit {
  seances = signal<ProgSeance[]>([]);
  chargement = signal(true);
  erreur = signal<string | null>(null);

  // Pop-up création / modification
  popupOuvert = signal(false);
  idEdition = signal<number | null>(null);   // null = création, sinon id de la séance modifiée
  salles = signal<SalleOption[]>([]);
  films = signal<Film[]>([]);
  enregistrement = signal(false);
  erreurForm = signal<string | null>(null);
  form = { date: '', heure: '', salleId: null as number | null, filmId: null as number | null };

  // Confirmation de suppression
  seanceASupprimer = signal<ProgSeance | null>(null);
  suppression = signal(false);
  erreurSuppression = signal<string | null>(null);

  constructor(
    private seanceService: SeanceService,
    private filmService: FilmService
  ) {}

  ngOnInit(): void {
    this.chargerProgrammation();

    this.seanceService.findSallesCinema().subscribe({
      next: (data) => this.salles.set(data),
      error: (err) => console.error('Erreur de chargement des salles', err)
    });

    this.filmService.findAll().subscribe({
      next: (data) => this.films.set(data),
      error: (err) => console.error('Erreur de chargement des films', err)
    });
  }

  chargerProgrammation(): void {
    this.seanceService.findProgrammation().subscribe({
      next: (data) => {
        this.seances.set(data);
        this.chargement.set(false);
      },
      error: (err) => {
        console.error('Erreur de chargement de la programmation', err);
        this.erreur.set(
          err.status === 403 ? "Ce compte n'est pas un responsable de cinéma."
          : err.status === 401 ? 'Veuillez vous connecter.'
          : 'Impossible de charger la programmation.'
        );
        this.chargement.set(false);
      }
    });
  }

  // ----- Création / modification -----
  ouvrirCreation(): void {
    this.idEdition.set(null);
    this.form = { date: '', heure: '', salleId: null, filmId: null };
    this.erreurForm.set(null);
    this.popupOuvert.set(true);
  }

  ouvrirModification(s: ProgSeance): void {
    this.idEdition.set(s.id);
    this.form = {
      date: s.date,
      heure: this.heureFormatee(s.heure),   // "14:00:00" -> "14:00" pour <input type="time">
      salleId: s.salleId,
      filmId: s.filmId
    };
    this.erreurForm.set(null);
    this.popupOuvert.set(true);
  }

  fermerPopup(): void {
    this.popupOuvert.set(false);
  }

  enregistrer(): void {
    const { date, heure, salleId, filmId } = this.form;
    if (!date || !heure || salleId == null || filmId == null) {
      this.erreurForm.set('Merci de remplir tous les champs.');
      return;
    }

    this.enregistrement.set(true);
    this.erreurForm.set(null);

    const body = { date, heure, salleId, filmId };
    const id = this.idEdition();
    const requete = id === null
      ? this.seanceService.creerSeance(body)
      : this.seanceService.modifierSeance(id, body);

    requete.subscribe({
      next: () => {
        this.enregistrement.set(false);
        this.popupOuvert.set(false);
        this.chargerProgrammation();
      },
      error: (err) => {
        console.error("Erreur d'enregistrement", err);
        const detail = err.error?.message || '';
        this.erreurForm.set(
          err.status === 403 ? "Cette salle n'appartient pas à votre cinéma."
          : err.status === 409 ? (detail || 'Conflit avec des réservations existantes.')
          : "Impossible d'enregistrer la séance."
        );
        this.enregistrement.set(false);
      }
    });
  }

  // ----- Suppression -----
  demanderSuppression(s: ProgSeance): void {
    this.erreurSuppression.set(null);
    this.seanceASupprimer.set(s);
  }

  annulerSuppression(): void {
    this.seanceASupprimer.set(null);
  }

  confirmerSuppression(): void {
    const s = this.seanceASupprimer();
    if (!s) return;

    this.suppression.set(true);
    this.erreurSuppression.set(null);

    this.seanceService.supprimerSeance(s.id).subscribe({
      next: () => {
        this.suppression.set(false);
        this.seanceASupprimer.set(null);
        this.chargerProgrammation();
      },
      error: (err) => {
        console.error('Erreur de suppression', err);
        this.erreurSuppression.set(
          err.status === 409 ? 'Impossible : des places sont déjà réservées pour cette séance.'
          : err.status === 403 ? "Cette séance n'appartient pas à votre cinéma."
          : 'Impossible de supprimer la séance.'
        );
        this.suppression.set(false);
      }
    });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.fermerPopup();
    this.annulerSuppression();
  }

  // ----- Affichage -----
  heureFormatee(heure: string): string {
    return heure ? heure.slice(0, 5) : '';
  }

  dateFormatee(date: string): string {
    if (!date) return '';
    const [annee, mois, jour] = date.split('-');
    return `${jour}/${mois}/${annee}`;
  }
}