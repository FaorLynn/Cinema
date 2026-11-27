import { Cinema } from "./cinema";

export interface Salle {
    id? : number;
    nom : string ;
    capacite_max : number ;
    Cinema : Cinema ;
    type?:string;
}
