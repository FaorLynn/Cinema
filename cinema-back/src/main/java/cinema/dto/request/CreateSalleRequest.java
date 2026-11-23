package cinema.dto.request;

import cinema.model.Cinema;
import cinema.model.Type_Salle;

public record CreateSalleRequest(
    String nom,
    int capacite_max,
    Integer cinemaId,
    Type_Salle type

) {

}
