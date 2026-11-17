package cinema.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import cinema.model.Film;

public interface IDAOFilm extends JpaRepository<Film, Integer> {
}
