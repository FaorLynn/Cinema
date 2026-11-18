import { Salle } from "./salle";

export interface Place {
  id?: number;
  range: number;
  col: number;


  salleId?: number;
  salleNom?: number;

  salle?: Salle;
}
