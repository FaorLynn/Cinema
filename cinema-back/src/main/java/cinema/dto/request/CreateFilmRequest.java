package cinema.dto.request;

import java.time.LocalDate;
import java.util.List;

import cinema.model.Genre;

public record CreateFilmRequest(
    String nom,
    String synopsis,
    LocalDate sortie,
    Integer dureeMinutes,
    List<Genre> genres
) {
}
