export interface AdresseUtilisateur {
  numero: string;
  voie: string;
  ville: string;
  cp: string;
}

export interface Utilisateur {
  id?: number;
  login: string;
  password?: string;
  nom: string;
  prenom: string;
  adresse: AdresseUtilisateur | null;
}
