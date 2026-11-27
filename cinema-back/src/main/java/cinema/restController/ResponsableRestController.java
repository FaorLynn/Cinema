package cinema.restcontroller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;
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
    private final PasswordEncoder passwordEncoder;
    private final IDAOResponsable daoResponsable;
    
    public ResponsableRestController(IDAOResponsable daoResponsable, PasswordEncoder passwordEncoder){
        this.daoResponsable= daoResponsable;
         this.passwordEncoder = passwordEncoder;
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
    public Responsable ajouter(@RequestBody Responsable responsable) {
        responsable.setPassword(passwordEncoder.encode(responsable.getPassword()));
        return daoResponsable.save(responsable);
    }

	@PutMapping("/{id}")
    public Responsable modifier(@PathVariable Integer id, @RequestBody Responsable responsable) {
        Responsable existing = daoResponsable.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Compte introuvable"));

        existing.setLogin(responsable.getLogin());

        if (responsable.getPassword() != null && !responsable.getPassword().isBlank()) {
            existing.setPassword(passwordEncoder.encode(responsable.getPassword()));
        }
        // Conserve les relations existantes : achats ou cinéma.
        return daoResponsable.save(existing);
    }
    @DeleteMapping("/{id}")
    public void supprimer(@PathVariable Integer id) {
        daoResponsable.deleteById(id);
    }
}