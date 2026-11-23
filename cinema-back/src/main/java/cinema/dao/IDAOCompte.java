package cinema.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import cinema.model.Compte;

public interface IDAOCompte extends JpaRepository<Compte, Integer> {
    Optional<Compte> findByLogin(String login);

}