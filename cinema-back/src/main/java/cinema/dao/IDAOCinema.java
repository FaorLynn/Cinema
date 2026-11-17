package cinema.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import cinema.model.Cinema;

public interface IDAOCinema extends JpaRepository<Cinema, Integer> {

}