import { Routes } from '@angular/router';
import { PlacePage } from './page/place-page/place-page';
import { SeancePage } from './page/seance-page/seance-page';
import { ComptePage } from './page/compte-page/compte-page';
import { FilmsPage } from './pages/films-page/films-page';
import { EquipePage } from './pages/equipe-page/equipe-page';
import { ReservationsPage } from './pages/reservations-page/reservations-page';
import { LoginPage } from './pages/login-page/login-page';

export const routes: Routes = [
  {
    path: 'utilisateurs',
    loadComponent: () =>
      import('./page/utilisateur-page/utilisateur-page').then((m) => m.UtilisateurPage),
  },
  {
    path: 'responsables',
    loadComponent: () =>
      import('./page/responsable-page/responsable-page').then((m) => m.ResponsablePage),
  },
  { path: '', pathMatch: 'full', redirectTo: 'utilisateurs' },
  { path: 'places', component: PlacePage},
  { path: 'seances', component: SeancePage},
  { path: 'comptes', component: ComptePage},

  { path: 'films', component: FilmsPage },
  { path: 'reservations', component: ReservationsPage},
  { path: 'equipe', component: EquipePage},
  {path:'login',component:LoginPage}
];
