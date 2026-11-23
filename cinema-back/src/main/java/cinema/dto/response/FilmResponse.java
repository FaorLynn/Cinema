package cinema.dto.response;

import java.time.LocalDate;
import java.util.List;

import cinema.model.Film;
import cinema.model.Genre;

public record FilmResponse(
    Integer id,
    String nom,
    String synopsis,
    LocalDate sortie,
    Integer dureeMinutes,
    List<Genre> genres
) {

    public static FilmResponse convert(Film film) {
        return new FilmResponse(
            film.getId(),
            film.getNom(),
            film.getSynopsis(),
            film.getSortie(),
            film.getDureeMinutes(),
            film.getGenres()
        );
    }
}
