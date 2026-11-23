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

import cinema.dao.IDAOAchat;
import cinema.dao.IDAODetailAchat;
import cinema.dao.IDAOPlace;
import cinema.dao.IDAOSeance;
import cinema.dto.request.CreateDetailAchatRequest;
import cinema.dto.response.DetailAchatResponse;
import cinema.model.Achat;
import cinema.model.DetailAchat;
import cinema.model.Place;
import cinema.model.Seance;

@RestController
@RequestMapping("api/detailAchat")
public class DetailAchatRestController {

    private final IDAODetailAchat daoDetAchat;
    private final IDAOAchat daoAchat;
    private final IDAOPlace daoPlace;
    private final IDAOSeance daoSeance;

    public DetailAchatRestController(IDAODetailAchat daoDetailAchat, IDAOAchat daoAchat,
                                     IDAOPlace daoPlace, IDAOSeance daoSeance) {
        this.daoDetAchat = daoDetailAchat;
        this.daoAchat = daoAchat;
        this.daoPlace = daoPlace;
        this.daoSeance = daoSeance;
    }

    @GetMapping
    public List<DetailAchatResponse> findAll() {
        return daoDetAchat.findAll().stream()
            .map(DetailAchatResponse::convert)
            .toList();
    }

	@GetMapping("/{id}")
	public DetailAchatResponse findById(@PathVariable Integer id) {
        DetailAchat detailAchat = daoDetAchat.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "DetailAchat introuvable : " + id));

        return DetailAchatResponse.convert(detailAchat);
    }

	@DeleteMapping("/{id}")
	public void supprimer(@PathVariable Integer id)
	{
		daoDetAchat.deleteById(id);
	}

	@PostMapping
	public DetailAchatResponse create(@RequestBody CreateDetailAchatRequest request) {
        Achat achat = daoAchat.findById(request.achatId())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Achat introuvable : " + request.achatId()));
        Place place = daoPlace.findById(request.placeId())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Place introuvable : " + request.placeId()));
        Seance seance = daoSeance.findById(request.seanceId())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Séance introuvable : " + request.seanceId()));

        DetailAchat detailAchat = new DetailAchat();
        detailAchat.setPrixAchat(request.prixAchat());
        detailAchat.setAchat(achat);
        detailAchat.setPlace(place);
        detailAchat.setSeance(seance);

        return DetailAchatResponse.convert(daoDetAchat.save(detailAchat));
    }


	@PutMapping("/{id}")
	public DetailAchatResponse update(@PathVariable Integer id,
            @RequestBody CreateDetailAchatRequest request) {
        DetailAchat detailAchat = daoDetAchat.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "DetailAchat introuvable : " + id));
        Achat achat = daoAchat.findById(request.achatId())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Achat introuvable : " + request.achatId()));
        Place place = daoPlace.findById(request.placeId())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Place introuvable : " + request.placeId()));
        Seance seance = daoSeance.findById(request.seanceId())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Séance introuvable : " + request.seanceId()));

        detailAchat.setPrixAchat(request.prixAchat());
        detailAchat.setAchat(achat);
        detailAchat.setPlace(place);
        detailAchat.setSeance(seance);

        return DetailAchatResponse.convert(daoDetAchat.save(detailAchat));
    }

}
