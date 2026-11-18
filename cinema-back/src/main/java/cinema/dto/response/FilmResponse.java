package cinema.dto.response;

import java.time.LocalDate;

import cinema.model.Film;

public record FilmResponse(
    Integer id,
    String nom,
    String synopsis,
    LocalDate sortie,
    Integer dureeMinutes
) {

    public static FilmResponse convert(Film film) {
        return new FilmResponse(
            film.getId(),
            film.getNom(),
            film.getSynopsis(),
            film.getSortie(),
            film.getDureeMinutes()
        );
    }
}
