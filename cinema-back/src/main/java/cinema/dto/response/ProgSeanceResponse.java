package cinema.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

public record ProgSeanceResponse(
        Integer id,
        LocalDate date,
        LocalTime heure,
        Integer filmId,
        String filmNom,
        Integer salleId,
        String salleNom,
        int capacite,
        int placesDisponibles,
        boolean complete) {
}