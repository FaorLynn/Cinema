import { Component, inject, model } from '@angular/core';
import { AuthService } from '../../service/auth-service';

export type Onglet =
  | 'utilisateurs'
  | 'films'
  | 'seances'
  | 'billetterie'
  | 'cinema'
  | 'responsable';

@Component({
  selector: 'app-gestion-equipe',
  styleUrl: './gestion-equipe.css',
  templateUrl: './gestion-equipe.html',
})
export class GestionEquipe {
  protected authService = inject(AuthService);

  // onglet actif, partagé avec le composant parent (liaison à double sens)
  actif = model<Onglet>('utilisateurs');

  protected onglets: { id: Onglet; libelle: string; adminSeulement: boolean }[] = [
    { id: 'utilisateurs', libelle: 'Utilisateurs', adminSeulement: false },
    { id: 'films',        libelle: 'Films',        adminSeulement: false },
    { id: 'seances',      libelle: 'Séances',      adminSeulement: false },
    { id: 'billetterie',  libelle: 'Billetterie',  adminSeulement: false },
    { id: 'cinema',       libelle: 'Cinéma',       adminSeulement: true },
    { id: 'responsable',  libelle: 'Responsable',  adminSeulement: true },
  ];

  protected get isAdmin(): boolean {
    return this.authService.hasRole('ADMIN');
  }
}