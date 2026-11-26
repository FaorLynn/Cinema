package cinema.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import cinema.model.Seance;

public interface IDAOSeance extends JpaRepository <Seance,Integer>{
    List<Seance> findBySalleId(Integer salleId);
    List<Seance> findByFilmId(Integer filmId);
    @Query("select s from Seance s where s.salle.cinema.id = :cinemaId order by s.date, s.heure")
    List<Seance> findByCinemaId(@Param("cinemaId") Integer cinemaId);
}
