package cinema.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import cinema.model.Achat;

public interface IDAOAchat extends JpaRepository<Achat, Integer> {

}
