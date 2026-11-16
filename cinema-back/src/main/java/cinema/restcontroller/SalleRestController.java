package cinema.restcontroller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cinema.dao.IDAOSalle;
import cinema.model.Salle;

@RestController
@RequestMapping("api/salle")
public class SalleRestController {
    private static final Logger log = LoggerFactory.getLogger(SalleRestController.class);

	@Autowired
	IDAOSalle daoSalle;

	@GetMapping
	public List<Salle> afficherTous()
	{
		System.out.println("Affichage de la liste des salles");
		log.info("Affichage de la liste des salles");
	  	return daoSalle.findAll();
	}

	@GetMapping("/{id}")
	public Salle afficherParId(@PathVariable Integer id)
	{
		// !! NE PAS METTRE D'INFO SENSIBLE !!
		// log.info("Recherche de la salle " + id);
		log.info("Recherche de la salle {} ({})", id, "autre valeur");

		log.debug("Niveau de debug");

		return daoSalle.findById(id).orElse(null);
	}

	@DeleteMapping("/{id}")
	public void supprimer(@PathVariable Integer id)
	{
		daoSalle.deleteById(id);
	}

	@PostMapping
	public Salle ajouter(@RequestBody Salle salle)
	{
		daoSalle.save(salle);
		return salle;
	}

	@PutMapping("/{id}")
	public Salle modifier(@PathVariable Integer id,@RequestBody Salle salle)
	{
	  salle.setId(id);
      daoSalle.save(salle);
      return salle;
	}
}

