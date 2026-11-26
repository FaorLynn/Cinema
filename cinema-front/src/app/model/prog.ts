export interface ProgSeance {
  id: number;
  date: string;
  heure: string;
  filmId: number;
  filmNom: string;
  salleId: number;
  salleNom: string;
  capacite: number;
  placesDisponibles: number;
  complete: boolean;
}