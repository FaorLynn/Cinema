import { Salle } from "./salle";
import { Film } from "./film";

export interface Seance {
  id?: number;
  date: string;    
  heure: string;   

  salle?: Salle;
  film?: Film;

  salleId?: number;
  filmId?: number;
}