import { Responsable } from "./responsable";

export interface AdresseCinema {
  numero: string;
  voie: string;
  ville: string;
  cp: string;
}

export interface Cinema {
  id?: number;
  nom: string;
  adresse: AdresseCinema | null;
  responsableId: number;
}