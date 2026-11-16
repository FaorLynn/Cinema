package cinema.dto.request;

import java.time.LocalDate;

public record CreateAchatRequest(
    LocalDate dateAchat
) {

}
