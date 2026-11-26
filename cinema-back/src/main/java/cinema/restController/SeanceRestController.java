package cinema.restcontroller;

import java.security.Principal;
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
import cinema.dao.IDAOResponsable;
import cinema.dao.IDAOSalle;
import cinema.dao.IDAOSeance;
import cinema.dto.request.CreateSeanceRequest;
import cinema.dto.response.ProgSeanceResponse;
import cinema.dto.response.SeanceResponse;
import cinema.model.Cinema;
import cinema.model.Film;
import cinema.model.Responsable;
import cinema.model.Salle;
import cinema.model.Seance;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("api/seance")
public class SeanceRestController {

    private final IDAOSeance daoSeance;
    private final IDAOSalle daoSalle;
    private final IDAOFilm daoFilm;
    private final IDAODetailAchat daoDetAchat;
    private final IDAOResponsable daoResponsable;

    public SeanceRestController(IDAOSeance dao, IDAOSalle daoSalle, IDAOFilm daoFilm,
            IDAODetailAchat daoDetAchat, IDAOResponsable daoResponsable) {
    this.daoSeance = dao;
    this.daoSalle = daoSalle;
    this.daoFilm = daoFilm;
    this.daoDetAchat = daoDetAchat;
    this.daoResponsable = daoResponsable;
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


    @GetMapping("/film/{filmId}")
    public List<SeanceResponse> findByFilm(@PathVariable Integer filmId) {
        return daoSeance.findByFilmId(filmId).stream()
            .map(seance -> {
                int reservations = daoDetAchat.countBySeanceId(seance.getId());
                int disponibles = seance.getSalle().getCapacite_max() - reservations;
                return SeanceResponse.convert(seance, disponibles);
            })
            .toList();
    }

    @GetMapping("/programmation")
    @Transactional
    public List<ProgSeanceResponse> programmation(Principal principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        Responsable responsable = daoResponsable.findByLogin(principal.getName())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.FORBIDDEN, "Ce compte n'est pas un responsable"));

        Cinema cinema = responsable.getCinema();
        if (cinema == null) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Aucun cinéma lié à ce responsable");
        }

        return daoSeance.findByCinemaId(cinema.getId()).stream()
            .map(s -> {
                int capacite = s.getSalle().getCapacite_max();
                int disponibles = capacite - daoDetAchat.countBySeanceId(s.getId());
                return new ProgSeanceResponse(
                    s.getId(), s.getDate(), s.getHeure(),
                    s.getFilm().getNom(),
                    s.getSalle().getNom(),
                    s.getSalle().getType() != null ? s.getSalle().getType().name() : null,
                    capacite, disponibles, disponibles <= 0);
            })
            .toList();
    }
}
