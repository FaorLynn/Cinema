import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Film } from '../../model/film';
import { FilmService } from '../../service/film-service';

@Component({
  selector: 'app-gestion-film',
  imports: [FormsModule],
  styleUrl: './gestion-film.css',
  templateUrl: './gestion-film.html',
})
export class GestionFilm implements OnInit {
  private filmService = inject(FilmService);

  protected films = signal<Film[]>([]);
  protected formulaireOuvert = signal(false);
  protected erreur = signal('');

  // données saisies dans le pop-up (pas encore un Film complet : pas d'id)
  protected nouveauFilm: Partial<Film> = { nom: '', dureeMinutes: undefined };

  ngOnInit(): void {
    this.charger();
  }

  private charger() {
    this.filmService.findAll().subscribe(liste => this.films.set(liste));
  }

  protected ouvrirFormulaire() {
    this.nouveauFilm = { nom: '', dureeMinutes: undefined };
    this.erreur.set('');
    this.formulaireOuvert.set(true);
  }

  protected fermerFormulaire() {
    this.formulaireOuvert.set(false);
  }

  protected ajouter() {
    if (!(this.nouveauFilm.nom ?? '').trim()) {
      this.erreur.set('Le nom du film est obligatoire.');
      return;
    }
    // pas d'id : save() fait un POST
    this.filmService.save(this.nouveauFilm as Film).subscribe({
      next: () => {
        this.fermerFormulaire();
        this.charger();
      },
      error: () => this.erreur.set("Erreur lors de l'ajout du film."),
    });
  }

  protected supprimer(film: Film) {
    if (!film.id) return;
    if (!confirm(`Supprimer « ${film.nom} » du catalogue ?`)) return;
    this.filmService.remove(film).subscribe(() => this.charger());
  }
}