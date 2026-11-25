package cinema.restcontroller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import cinema.dao.IDAODetailAchat;
import cinema.dao.IDAOFilm;
import cinema.dao.IDAOSeance;
import cinema.dto.request.CreateFilmRequest;
import cinema.dto.response.FilmResponse;
import cinema.model.Film;
import cinema.model.Seance;

@RestController
@RequestMapping("api/film")
public class FilmRestController {

    private final IDAOFilm dao;
    private final IDAOSeance daoSeance;
    private final IDAODetailAchat daoDetAchat;

    public FilmRestController(IDAOFilm dao, IDAOSeance daoSeance,IDAODetailAchat daoDetAchat) {
        this.dao = dao;
        this.daoSeance = daoSeance;
        this.daoDetAchat = daoDetAchat;
    }

    @GetMapping
    public List<FilmResponse> findAll() {
        return dao.findAll().stream()
            .map(FilmResponse::convert)
            .toList();
    }

    @GetMapping("/{id}")
    public FilmResponse findById(@PathVariable Integer id) {
        Film film = dao.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Film introuvable : " + id));

        return FilmResponse.convert(film);
    }

    @PostMapping
    public FilmResponse create(@RequestBody CreateFilmRequest request) {
        Film film = new Film();
        film.setNom(request.nom());
        film.setSynopsis(request.synopsis());
        film.setSortie(request.sortie());
        film.setDureeMinutes(request.dureeMinutes());
        film.setGenres(request.genres());

        return FilmResponse.convert(dao.save(film));
    }

    @PutMapping("/{id}")
    public FilmResponse update(@PathVariable Integer id,
            @RequestBody CreateFilmRequest request) {
        Film film = dao.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Film introuvable : " + id));

        film.setNom(request.nom());
        film.setSynopsis(request.synopsis());
        film.setSortie(request.sortie());
        film.setDureeMinutes(request.dureeMinutes());
        film.setGenres(request.genres());

        return FilmResponse.convert(dao.save(film));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        dao.deleteById(id);
    }

    @GetMapping("/dernier-film")
    public FilmResponse dernierFilm() {
        LocalDateTime maintenant = LocalDateTime.now();
        for (Film film : dao.findAllByOrderByIdDesc()) {
            List<Seance> seances = daoSeance.findByFilmId(film.getId());
            for (Seance seance : seances) {
                LocalDateTime dateHeureSeance =
                    LocalDateTime.of(seance.getDate(), seance.getHeure());
                if (!dateHeureSeance.isAfter(maintenant)) {continue;}

                int reservations = daoDetAchat.countBySeanceId(seance.getId());
                int disponibles = seance.getSalle().getCapacite_max() - reservations;

                if (disponibles > 0) { return FilmResponse.convert(film);}
            }
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Aucun film avec une séance réservable");
    }
}
