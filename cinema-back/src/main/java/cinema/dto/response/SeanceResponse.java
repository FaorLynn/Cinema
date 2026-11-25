package cinema.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

import cinema.model.Seance;

public record SeanceResponse(
        Integer id,
        LocalDate date,
        LocalTime heure,
        SalleResponse salle,
        FilmResponse film,
        int placesDisponibles
) 
{
    public static SeanceResponse convert(Seance seance, int placesDisponibles) {
        return new SeanceResponse(
                seance.getId(),
                seance.getDate(),
                seance.getHeure(),
                SalleResponse.convert(seance.getSalle()),
                FilmResponse.convert(seance.getFilm()),
                placesDisponibles
            );

    }

}
