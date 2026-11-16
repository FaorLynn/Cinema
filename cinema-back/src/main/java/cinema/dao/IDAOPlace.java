package cinema.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import cinema.model.Place;

public interface IDAOPlace extends JpaRepository<Place, Integer> {

}
