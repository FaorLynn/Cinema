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

import cinema.dao.IDAOCompte;
import cinema.dao.IDAOUtilisateur;
import cinema.model.Utilisateur;

@RestController
@RequestMapping("/api/utilisateur")
public class UtilisateurRestController {
    private static final Logger log = LoggerFactory.getLogger(UtilisateurRestController.class);
    private final PasswordEncoder passwordEncoder;
    
    private final IDAOUtilisateur daoUtilisateur;
    private final IDAOCompte daoCompte;
    
    public UtilisateurRestController(IDAOUtilisateur daoUtilisateur, IDAOCompte daoCompte, PasswordEncoder passwordEncoder){
        this.daoUtilisateur= daoUtilisateur;
        this.daoCompte = daoCompte;
        this.passwordEncoder = passwordEncoder;
    }
    @GetMapping
    public List<Utilisateur> afficherTous(){
        return this.daoUtilisateur.findAll();
    }

    @GetMapping("/{id}")
    public Utilisateur afficherParID(@PathVariable Integer id){
        return this.daoUtilisateur.findById(id).orElse(null);
    }
    @PostMapping
	public Utilisateur ajouter(@RequestBody Utilisateur utilisateur)
	{
		daoUtilisateur.save(utilisateur);
		return utilisateur;
	}


    @PutMapping("/{id}")
    public Utilisateur modifier(@PathVariable Integer id, @RequestBody Utilisateur utilisateur)
    {
        Utilisateur existing = daoUtilisateur.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Compte introuvable"));
        
        if (!existing.getLogin().equals(utilisateur.getLogin())
            && daoCompte.findByLogin(utilisateur.getLogin())
                .filter(compte -> !compte.getId().equals(id))
                .isPresent()) {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "Ce login est déjà utilisé");
                }

        existing.setLogin(utilisateur.getLogin());
        
        if (utilisateur.getPassword() != null && !utilisateur.getPassword().isBlank()) {
            existing.setPassword(passwordEncoder.encode(utilisateur.getPassword()));
        }

        existing.setNom(utilisateur.getNom());
        existing.setPrenom(utilisateur.getPrenom());
        existing.setAdresse(utilisateur.getAdresse());

        return daoUtilisateur.save(existing);
    }

    @DeleteMapping("/{id}")
    public void supprimer(@PathVariable Integer id) {
        daoUtilisateur.deleteById(id);
    }

}
