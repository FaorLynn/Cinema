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

import cinema.dao.IDAOPlace;
import cinema.dao.IDAOSalle;
import cinema.dto.request.CreatePlaceRequest;
import cinema.dto.response.PlaceResponse;
import cinema.model.Place;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("api/place")
public class PlaceRestController {
    
    private final IDAOPlace dao;
    private final IDAOSalle daoSalle;

    public PlaceRestController(IDAOPlace dao, IDAOSalle daoSalle) {
        this.dao = dao;
        this.daoSalle = daoSalle;
    }

    @GetMapping
    @Transactional
    public List<PlaceResponse> findAll() {
        return this.dao.findAll().stream()
            
            .map(PlaceResponse::convert)
            .toList()
        ;
    }

    @GetMapping("/{id}")
    @Transactional
    public PlaceResponse findById(@PathVariable Integer id) {
        return PlaceResponse.convert(this.dao.findById(id)
            .orElseThrow(() -> new RuntimeException("Place introuvable : " + id)));
    }

    @DeleteMapping("/{id}")
	public void supprimer(@PathVariable Integer id)
	{
		dao.deleteById(id);
	}

    @PostMapping
    public PlaceResponse create(@RequestBody CreatePlaceRequest request) {
        Place place = new Place();

        place.setRange(request.range());
        place.setCol(request.col());
        place.setSalle(this.daoSalle.getReferenceById(request.salleId()));

        place = this.dao.save(place);

        return PlaceResponse.convert(place);
    }

    @PutMapping("/{id}")
    public PlaceResponse update(@PathVariable Integer id, @RequestBody CreatePlaceRequest request) {
        Place place = this.dao.findById(id)
            .orElseThrow(() -> new RuntimeException("Place introuvable : " + id));

        place.setRange(request.range());
        place.setCol(request.col());
        place.setSalle(this.daoSalle.getReferenceById(request.salleId()));

        place = this.dao.save(place);

        return PlaceResponse.convert(place);
    }

}
