package cinema.dto.response;

import cinema.model.Adresse;
import cinema.model.Cinema;

public record CinemaResponse(
    Integer id, 
    String nom, 
    Adresse adresse, 
    Integer responsableId) {
        
        public static CinemaResponse convert(Cinema cinema) {
            Integer responsableId = null;

            if(cinema.getResponsable() != null){
                responsableId = cinema.getResponsable().getId();
            }
            return new CinemaResponse(
                cinema.getId(),
                cinema.getNom(),
                cinema.getAdresse(),
                responsableId
            );
    }
}