export interface Film {
  id?: number;
  nom: string;
  synopsis?: string;
  sortie?: string; 
  dureeMinutes?: number;
  genres: Genre[];
}

export enum Genre {
    ROMANCE = 'ROMANCE',
    POLICIER = 'POLICIER',
    SCIENCE_FICTION = 'SCIENCE_FICTION',
    ACTION = 'ACTION',
    COMEDIE = 'COMEDIE',
    DRAME = 'DRAME',
    HORREUR = 'HORREUR',
    ANIMATION = 'ANIMATION',
    AVENTURE = 'AVENTURE',
    FANTASTIQUE = 'FANTASTIQUE',
    THRILLER = 'THRILLER',
    DOCUMENTAIRE = 'DOCUMENTAIRE'
}