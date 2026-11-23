package cinema.dto.response;

import cinema.model.Cinema;
import cinema.model.Salle;
import cinema.model.Type_Salle;

public record SalleResponse(
    Integer id,
    String nom,
    Integer capacite_max,
    Integer cinemaId,
    Type_Salle type
    
) {

    public static SalleResponse convert(Salle salle) {
        return new SalleResponse(
            salle.getId(),
            salle.getNom(),
            salle.getCapacite_max(),
            salle.getCinema().getId(),
            salle.getType()   
        );
    }
}
