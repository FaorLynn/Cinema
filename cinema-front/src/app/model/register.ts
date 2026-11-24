import { Adresse } from "./adresse";

export interface Register {
    login: string;
    password: string;
    nom: string;
    prenom: string;
    adresse:Adresse;
}
