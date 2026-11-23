package cinema.dto.response;

import java.time.LocalDate;

import cinema.model.Achat;
import cinema.model.Utilisateur;

public record AchatResponse(
    Integer id,
    LocalDate dateAchat,
    Utilisateur utilisateur
) {

    public static AchatResponse convert(Achat achat){
        return new AchatResponse(
            achat.getId(),
            achat.getDateAchat(),
            achat.getUtilisateur()
        );
    }
}
