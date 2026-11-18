package cinema.dto.request;

import cinema.model.Adresse;

public record UpdateCinemaRequest(String nom, Adresse adresse, Integer responsableId) {

}
