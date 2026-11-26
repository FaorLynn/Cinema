package cinema.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

public record ProgSeanceResponse(
        Integer id,
        LocalDate date,
        LocalTime heure,
        String filmNom,
        String salleNom,
        String typeSalle,
        int capacite,
        int placesDisponibles,
        boolean complete) {
}