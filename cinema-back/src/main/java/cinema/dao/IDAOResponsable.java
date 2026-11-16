package cinema.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import cinema.model.Responsable;

public interface IDAOResponsable  extends JpaRepository<Responsable, Integer> {

}
