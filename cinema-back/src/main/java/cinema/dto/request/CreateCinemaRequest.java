package cinema.dto.request;

import cinema.model.Adresse;

public record CreateCinemaRequest(String nom, Adresse adresse, Integer responsableId) {

}
