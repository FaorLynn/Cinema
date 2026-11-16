package cinema.dto.response;

import java.time.LocalDate;

import cinema.model.Achat;

public record AchatResponse(
    Integer id,
    LocalDate dateAchat
) {

    public static AchatResponse convert(Achat achat){
        return new AchatResponse(
            achat.getId(),
            achat.getDateAchat()
        );
    }
}
