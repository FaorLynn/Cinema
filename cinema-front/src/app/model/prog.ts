export interface ProgSeance {
  id: number;
  date: string;
  heure: string;
  filmNom: string;
  salleNom: string;
  typeSalle: string | null;
  capacite: number;
  placesDisponibles: number;
  complete: boolean;
}