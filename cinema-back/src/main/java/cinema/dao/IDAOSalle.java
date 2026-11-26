package cinema.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cinema.model.Salle;

public interface IDAOSalle extends JpaRepository <Salle,Integer> {
    List<Salle> findByCinemaId(Integer cinemaId);
}
