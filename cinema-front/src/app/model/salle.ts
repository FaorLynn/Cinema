import { Cinema } from "./cinema";

export interface Salle {
    id? : number;
    cinemaId?: number;
    nom : string ;
    capacite_max : number ;
    Cinema : Cinema ;
}
