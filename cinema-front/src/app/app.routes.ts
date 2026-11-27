import { Routes } from '@angular/router';
import { PlacePage } from './page/place-page/place-page';
import { SeancePage } from './page/seance-page/seance-page';
import { ComptePage } from './page/compte-page/compte-page';
import { FilmsPage } from './pages/films-page/films-page';
import { EquipePage } from './pages/equipe-page/equipe-page';
import { ReservationsPage } from './pages/reservations-page/reservations-page';
import { LoginPage } from './pages/login-page/login-page';
import { authGuard } from './guard/auth-guard';
import { CinemaGestion } from './component/cinema-gestion/cinema-gestion';

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
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {path:'login',component:LoginPage},
  { path: 'places', component: PlacePage,canActivate: [authGuard]},
  { path: 'seances', component: SeancePage,canActivate: [authGuard]},
  { path: 'comptes', component: ComptePage,canActivate: [authGuard]},

  { path: 'films', component: FilmsPage ,canActivate: [authGuard]},
  { path: 'reservations', component: ReservationsPage,canActivate: [authGuard]},
  { path: 'equipe', component: EquipePage,canActivate: [authGuard]},
  
  
];
