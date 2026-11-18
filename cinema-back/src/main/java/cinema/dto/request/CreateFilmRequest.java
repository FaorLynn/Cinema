package cinema.dto.request;

import java.time.LocalDate;

public record CreateFilmRequest(
    String nom,
    String synopsis,
    LocalDate sortie,
    Integer dureeMinutes
) {
}
