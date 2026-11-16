package cinema.restController;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cinema.dao.IDAOResponsable;
import cinema.model.Responsable;

@RestController
@RequestMapping("/api/responsable")
public class ResponsableRestController {
    private static final Logger log = LoggerFactory.getLogger(ResponsableRestController.class);
    
    private final IDAOResponsable daoResponsable;
    
    public ResponsableRestController(IDAOResponsable daoResponsable){
        this.daoResponsable= daoResponsable;
    }
    @GetMapping
    public List<Responsable> afficherTous(){
        return this.daoResponsable.findAll();
    }

    @GetMapping("/{id}")
    public Responsable afficherParID(@PathVariable Integer id){
        return this.daoResponsable.findById(id).orElse(null);
    }
    @PostMapping
	public Responsable ajouter(@RequestBody Responsable responsable)
	{
		daoResponsable.save(responsable);
		return responsable;
	}

	@PutMapping("/{id}")
	public Responsable modifier(@PathVariable Integer id,@RequestBody Responsable responsable)
	{
	  responsable.setId(id);
      daoResponsable.save(responsable);
      return responsable;
	}
}