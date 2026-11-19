package cinema.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cinema.model.Seance;

public interface IDAOSeance extends JpaRepository <Seance,Integer>{
    List<Seance> findBySalleId(Integer salleId);
    List<Seance> findByFilmId(Integer filmId);
}
