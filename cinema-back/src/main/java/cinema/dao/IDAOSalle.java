package cinema.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import cinema.model.Salle;

public interface IDAOSalle extends JpaRepository <Salle,Integer> {

}
