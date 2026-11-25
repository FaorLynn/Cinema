package cinema.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

public interface ReservationDetail {
    Integer getAchatId();
    LocalDate  getDateAchat();
    Integer getDetailAchatId();
    Double getPrixAchat();
    Integer getPlaceId();
    Integer getSalleId();
    String getSalleNom();
    Integer getCinemaId();
    String getCinemaNom();
    String getFilmNom();
    LocalDate getSeanceDate();
    LocalTime  getSeanceHeure();
    String getCinemaVille();
    
            

    
}
