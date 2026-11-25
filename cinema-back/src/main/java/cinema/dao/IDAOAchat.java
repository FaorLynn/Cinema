package cinema.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import cinema.dto.response.ReservationDetail;
import cinema.model.Achat;

public interface IDAOAchat extends JpaRepository<Achat, Integer> {

    @Query(value = """
        SELECT
            a.id AS achat_id,
            a.date_achat,
            da.id AS detail_achat_id,
            da.prix_achat,
            p.id AS place_id,
            s.id AS salle_id,
            s.nom AS salle_nom,
            c.id AS cinema_id,
            c.nom AS cinema_nom,
            c.ville AS cinema_ville,
            se.date AS seance_date,
            se.heure AS seance_heure,
            f.nom AS film_nom

        FROM achat a
        JOIN detail_achat da ON da.achat_id = a.id
        JOIN place p ON da.place_id = p.id
        JOIN salle s ON p.salle_id = s.id
        JOIN cinema c ON s.cinema_id = c.id
        JOIN seance se ON da.seance_id = se.id
        JOIN film f ON se.film_id = f.id
        WHERE a.utilisateur_id = :userId
        """, nativeQuery = true)
    List<ReservationDetail> findReservationByUserId(@Param("userId") Integer userId);

}
