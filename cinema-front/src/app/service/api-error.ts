import { HttpErrorResponse } from '@angular/common/http';

export function apiError(error: HttpErrorResponse): string {
  if (error.status === 0 || error.status === 502 || error.status === 504) {
    return 'Le serveur est indisponible. Vérifiez que le backend est démarré.';
  }
  if (error.status === 401 || error.status === 403) {
    return 'Accès refusé : connectez-vous avec un compte autorisé.';
  }
  if (error.status === 404) {
    return 'Ce compte n’existe plus. Actualisez la liste.';
  }
  if (error.status === 409) {
    return 'Cette opération est impossible : le compte est déjà utilisé ou lié à une autre donnée.';
  }
  return 'L’opération a échoué. Vérifiez les données ou les journaux du backend.';
}
