package cinema.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import cinema.model.Responsable;

public interface IDAOResponsable  extends JpaRepository<Responsable, Integer> {
    Optional<Responsable> findByLogin(String login);

}
