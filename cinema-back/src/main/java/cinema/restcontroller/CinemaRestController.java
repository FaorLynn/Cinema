package cinema.restcontroller;

import org.springframework.web.bind.annotation.RestController;

import cinema.dao.IDAOCinema;
import cinema.dao.IDAOResponsable;
import cinema.dao.IDAOSalle;
import cinema.dto.request.CreateCinemaRequest;
import cinema.dto.request.UpdateCinemaRequest;
import cinema.dto.response.CinemaResponse;
import cinema.model.Cinema;
import jakarta.transaction.Transactional;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController 
@RequestMapping("/api/cinema")
public class CinemaRestController {
	private static final Logger log = LoggerFactory.getLogger(CinemaRestController.class);

	private final IDAOCinema daoCinema;
	private final IDAOResponsable daoResponsable;

	public CinemaRestController(IDAOCinema daoCinema, IDAOResponsable daoResponsable)
	{
        this.daoCinema = daoCinema;
		this.daoResponsable = daoResponsable;
    }

	@GetMapping
	@Transactional 
	public List<CinemaResponse> findAll() 
	{
		log.info("Récupération de tous les cinémas");
		return this.daoCinema.findAll().stream()
			.map(CinemaResponse::convert)
			.toList();	
	}

	@GetMapping("/{id}")
	@Transactional 
	public CinemaResponse findById(@PathVariable Integer id)
	{	
		log.info("Recherche du cinéma id={}", id);
		return this.daoCinema.findById(id)
			.map(CinemaResponse::convert)
			.orElse(null);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Integer id)
	{
		log.info("Suppression du cinéma id={}", id);
		daoCinema.deleteById(id);
	}
	
	@PostMapping
	public CinemaResponse create(@RequestBody CreateCinemaRequest request)
	{
		log.info("Création du cinéma nom={}", request.nom());
		Cinema cinema = new Cinema();
		cinema.setNom(request.nom());
		cinema.setAdresse(request.adresse());
		cinema.setResponsable(
			daoResponsable
			.findById(request.responsableId())
			.orElseThrow());

		Cinema savedCinema = daoCinema.save(cinema);

	    return CinemaResponse.convert(savedCinema);
	}

	@PutMapping("/{id}")
	public CinemaResponse update(@PathVariable Integer id,@RequestBody UpdateCinemaRequest request) 
	{	
		log.info("Modification du cinéma id={}", id);
		Cinema cinema = daoCinema.findById(id).orElseThrow();

		cinema.setNom(request.nom());
		cinema.setAdresse(request.adresse());
		cinema.setResponsable(
			daoResponsable
			.findById(request.responsableId())
			.orElseThrow());

		Cinema savedCinema = daoCinema.save(cinema);

		return CinemaResponse.convert(savedCinema);
	}
}
    

