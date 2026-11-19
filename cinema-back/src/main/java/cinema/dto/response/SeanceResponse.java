package cinema.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

import cinema.model.Salle;
import cinema.model.Seance;

public record SeanceResponse(
        Integer id,
        LocalDate date,
        LocalTime heure,
        Salle salle,
        FilmResponse film
) 
{
    public static SeanceResponse convert(Seance seance) {
        return new SeanceResponse(
                seance.getId(),
                seance.getDate(),
                seance.getHeure(),
                seance.getSalle(),
                FilmResponse.convert(seance.getFilm()));

    }

}
