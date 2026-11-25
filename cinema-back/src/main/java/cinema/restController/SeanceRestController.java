package cinema.restcontroller;

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
import cinema.dao.IDAOSalle;
import cinema.dao.IDAOSeance;
import cinema.dto.request.CreateSeanceRequest;
import cinema.dto.response.SeanceResponse;
import cinema.model.Film;
import cinema.model.Salle;
import cinema.model.Seance;

@RestController
@RequestMapping("api/seance")
public class SeanceRestController {

    private final IDAOSeance daoSeance;
    private final IDAOSalle daoSalle;
    private final IDAOFilm daoFilm;
    private final IDAODetailAchat daoDetAchat;

    public SeanceRestController(IDAOSeance dao, IDAOSalle daoSalle, IDAOFilm daoFilm, IDAODetailAchat daoDetAchat) {
        this.daoSeance = dao;
        this.daoSalle = daoSalle;
        this.daoFilm = daoFilm;
        this.daoDetAchat = daoDetAchat;
    }

    @GetMapping
    public List<SeanceResponse> findAll() {
        return daoSeance.findAll().stream()
            .map(seance -> SeanceResponse.convert(
                seance,
                seance.getSalle().getCapacite_max() - daoDetAchat.countBySeanceId(seance.getId())
            ))
            .toList();
    }

    @GetMapping("/{id}")
    public SeanceResponse findById(@PathVariable Integer id) {
        Seance seance = daoSeance.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Séance introuvable : " + id));

        int reservations = daoDetAchat.countBySeanceId(id);
        int disponibles = seance.getSalle().getCapacite_max() - reservations;

        return SeanceResponse.convert(seance, disponibles);
    }

    @PostMapping
    public SeanceResponse create(@RequestBody CreateSeanceRequest request) {
        Salle salle = daoSalle.findById(request.salleId())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Salle introuvable : " + request.salleId()));
        Film film = daoFilm.findById(request.filmId())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Film introuvable : " + request.filmId()));

        Seance seance = new Seance();
        seance.setDate(request.date());
        seance.setHeure(request.heure());
        seance.setSalle(salle);
        seance.setFilm(film);

        Seance seanceSauvee = daoSeance.save(seance);

        int reservations = daoDetAchat.countBySeanceId(seanceSauvee.getId());
        int disponibles = seanceSauvee.getSalle().getCapacite_max() - reservations;

        return SeanceResponse.convert(seanceSauvee, disponibles);
    }

    @PutMapping("/{id}")
    public SeanceResponse update(@PathVariable Integer id, @RequestBody CreateSeanceRequest request) {
        Seance seance = daoSeance.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Séance introuvable : " + id));
        Salle salle = daoSalle.findById(request.salleId())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Salle introuvable : " + request.salleId()));
        Film film = daoFilm.findById(request.filmId())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Film introuvable : " + request.filmId()));

        seance.setDate(request.date());
        seance.setHeure(request.heure());
        seance.setSalle(salle);
        seance.setFilm(film);

        Seance seanceSauvee = daoSeance.save(seance);

        int reservations = daoDetAchat.countBySeanceId(seanceSauvee.getId());
        int disponibles = seanceSauvee.getSalle().getCapacite_max() - reservations;

        return SeanceResponse.convert(seanceSauvee, disponibles);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        daoSeance.deleteById(id);
    }

    @GetMapping("/{id}/disponibilite")
    public SeanceResponse disponibilite(@PathVariable Integer id) {

        Seance seance = daoSeance.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Séance introuvable : " + id));

        int reservations = daoDetAchat.countBySeanceId(id);

        int disponibles = seance.getSalle().getCapacite_max() - reservations;

        return SeanceResponse.convert(seance, disponibles);
    }
}
