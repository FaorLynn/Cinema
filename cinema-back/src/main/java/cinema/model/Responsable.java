package cinema.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

@Entity
public class Responsable extends Compte {
    @OneToOne(mappedBy = "responsable")
    private Cinema cinema;


    
    public Responsable() {
    }
    

    public Responsable(Integer id, String login, String password) {
        super(id, login, password);
    }


    public Cinema getCinema() {
        return cinema;
    }

    public void setCinema(Cinema cinema) {
        this.cinema = cinema;
    }
    
    
}
