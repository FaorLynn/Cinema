import { Salle } from "./salle";

export interface Seance {
  id?: number;
  date: string;
  heure: string;

  salleId?: number;
  salleNom?: number;

  salle?: Salle;
}