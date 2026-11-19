package cinema.dto.request;

import java.time.LocalDate;
import java.time.LocalTime;

public record CreateSeanceRequest(
        LocalDate date,
        LocalTime heure,
        Integer salleId,
        Integer filmId) 
{
}
