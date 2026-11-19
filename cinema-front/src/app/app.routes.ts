import { Routes } from '@angular/router';

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
];
