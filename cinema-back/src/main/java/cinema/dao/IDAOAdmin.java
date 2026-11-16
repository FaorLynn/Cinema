package cinema.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import cinema.model.Admin;

public interface IDAOAdmin   extends JpaRepository<Admin, Integer>{

}
