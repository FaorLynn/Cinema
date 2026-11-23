package cinema.dto.request;

import java.time.LocalDate;

import cinema.model.Utilisateur;

public record CreateAchatRequest(
    LocalDate dateAchat,
    Utilisateur utilisateur
) {

}
