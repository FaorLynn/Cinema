package cinema.restcontroller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cinema.dao.IDAOAchat;
import cinema.dto.request.CreateAchatRequest;
import cinema.dto.response.AchatResponse;
import cinema.model.Achat;
import jakarta.transaction.Transactional;


@RestController 
@RequestMapping("api/achat")
public class AchatRestController {

    private final IDAOAchat dao;

    public AchatRestController(IDAOAchat dao)
    {
        this.dao = dao;
    }

    @GetMapping
    @Transactional
    public List<AchatResponse> findAll(){
        return this.dao.findAll().stream()
                    .map(AchatResponse::convert)
                    .toList();
    }

    @GetMapping("/{id}")
    @Transactional 
    public AchatResponse findbyId(@PathVariable Integer id){
        return AchatResponse.convert(this.dao.findById(id)
            .orElseThrow(() -> new RuntimeException("Achat introuvable : " + id)));
    }

        @DeleteMapping("/{id}")
	public void supprimer(@PathVariable Integer id)
	{
		dao.deleteById(id);

    }

    @PostMapping
    public AchatResponse create(@RequestBody CreateAchatRequest request) {
        Achat achat = new Achat();

        achat.setDateAchat(request.dateAchat());
        achat.setUtilisateur(request.utilisateur());

        achat = this.dao.save(achat);

    return AchatResponse.convert(achat);
    }

    @PutMapping("/{id}")
    public AchatResponse update(@PathVariable Integer id, @RequestBody CreateAchatRequest request) {
        Achat achat = this.dao.findById(id)
            .orElseThrow(() -> new RuntimeException("Achat introuvable : " + id));

        achat.setDateAchat(request.dateAchat());
        achat.setUtilisateur(request.utilisateur());
    
        achat = this.dao.save(achat);

        return AchatResponse.convert(achat);
}
}
