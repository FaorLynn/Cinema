
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../service/auth-service';
import { UtilisateurService } from '../../service/utilisateur-service';
import { Utilisateur } from '../../model/utilisateur';

@Component({
  imports: [FormsModule],
  selector: 'app-parametres-page',
  styleUrl: './parametres-page.css',
  templateUrl: './parametres-page.html',
})
export class ParametresPage {
  private authService = inject(AuthService);
  private utilisateurService = inject(UtilisateurService);
  private title = inject(Title);

  protected utilisateur!: Utilisateur;
  private utilisateurInitial!: Utilisateur;

  protected nouveauPassword = '';
  protected confirmationPassword = '';

  protected message = signal('');
  protected erreur = signal('');
  protected chargement = signal(true);

  constructor() {
    this.title.setTitle('Mes paramètres');
    this.chargerUtilisateur();
  }

  private chargerUtilisateur(): void {
    this.utilisateurService.findById(this.authService.compteId)
      .subscribe({
        next: (data) => {
          this.utilisateur = {
            ...data,
            adresse: data.adresse ? { ...data.adresse } : {
              numero: '',
              voie: '',
              ville: '',
              cp: ''
            }
          };

          this.utilisateurInitial = structuredClone(this.utilisateur);
          this.chargement.set(false);
        },
        error: () => {
          this.erreur.set('Impossible de récupérer vos informations.');
          this.chargement.set(false);
        }
      });
  }

  protected get modifications(): boolean {
    return JSON.stringify(this.utilisateur) !== JSON.stringify(this.utilisateurInitial)
      || this.nouveauPassword !== ''
      || this.confirmationPassword !== '';
  }

  protected enregistrer(): void {
    this.message.set('');
    this.erreur.set('');

    if (!this.modifications) return;

    if (this.nouveauPassword !== this.confirmationPassword) {
      this.erreur.set('Les mots de passe ne correspondent pas.');
      return;
    }

    const donnees: Utilisateur = {...this.utilisateur,password: this.nouveauPassword || undefined};

    this.utilisateurService.save(donnees).subscribe({
      next: (data) => {
        this.utilisateur = { ...data };
        this.utilisateurInitial = structuredClone(this.utilisateur);
        this.nouveauPassword = '';
        this.confirmationPassword = '';
        this.message.set('Vos informations ont été enregistrées.');
      },
      error: () => {this.erreur.set('Une erreur est survenue lors de l’enregistrement.');}
    });
  }

  protected effacerMessage(): void {this.message.set('');}
}
