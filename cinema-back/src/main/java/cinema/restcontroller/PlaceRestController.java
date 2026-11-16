package cinema.restcontroller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cinema.dao.IDAOPlace;
import cinema.dao.IDAOSalle;
import cinema.model.Place;
import cinema.model.Salle;
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

    @PostMapping
    public PlaceResponse create(@RequestBody CreatePlaceRequest request) {
        Place place = new Place();

        //place.setLibelle(request.libelle());


        place.setSalle(this.daoSalle.getReferenceById(request.salleId()));

        return null;
    }

}
