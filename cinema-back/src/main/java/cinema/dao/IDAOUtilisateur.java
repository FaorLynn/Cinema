package cinema.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import cinema.model.Utilisateur;

public interface IDAOUtilisateur  extends JpaRepository<Utilisateur, Integer> {

}
