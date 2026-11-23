package cinema.restcontroller;

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
import org.springframework.web.bind.annotation.RestController;

import cinema.dao.IDAOCinema;
import cinema.dao.IDAOSalle;
import cinema.dto.request.CreateSalleRequest;
import cinema.dto.response.SalleResponse;
import cinema.model.Salle;
import jakarta.transaction.Transactional;

@RestController 
@RequestMapping("/api/salle")
public class SalleRestController {
	private static final Logger log = LoggerFactory.getLogger(SalleRestController.class);

	private final IDAOSalle daoSalle;
	private final IDAOCinema daoCinema;


	public SalleRestController(IDAOSalle daoSalle, IDAOCinema daoCinema)
	{
        this.daoSalle = daoSalle;
		this.daoCinema = daoCinema;

    }

	@GetMapping
	@Transactional 
	public List<SalleResponse> findAll() 
	{
		log.info("Récupération de toutes les salles");
		return this.daoSalle.findAll().stream()
			.map(SalleResponse::convert)
			.toList();	
	}

	@GetMapping("/{id}")
	@Transactional 
	public SalleResponse findById(@PathVariable Integer id)
	{	
		log.info("Recherche du cinéma id={}", id);
		return this.daoSalle.findById(id)
			.map(SalleResponse::convert)
			.orElse(null);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Integer id)
	{
		log.info("Suppression de la salle id={}", id);
		daoSalle.deleteById(id);
	}
	
    @PostMapping
    public SalleResponse create(@RequestBody CreateSalleRequest request) {
        Salle salle = new Salle();

        salle.setNom(request.nom());
        salle.setCapacite_max(request.capacite_max());
        salle.setCinema(this.daoCinema.getReferenceById(request.cinemaId()));
		salle.setType(request.type());

        salle = this.daoSalle.save(salle);

    return SalleResponse.convert(salle);
    }

	@PutMapping("/{id}")
	public SalleResponse update(@PathVariable Integer id, @RequestBody CreateSalleRequest request)
	{
		Salle salle = this.daoSalle.findById(id)
			.orElseThrow(()-> new RuntimeException("Salle introuvable : " + id));

		salle.setNom(request.nom());
        salle.setCapacite_max(request.capacite_max());
        salle.setCinema(this.daoCinema.getReferenceById(request.cinemaId()));
		salle.setType(request.type());

		salle = this.daoSalle.save(salle);

    return SalleResponse.convert(salle);

	}

	
}
    

