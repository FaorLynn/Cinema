package cinema.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

@Entity
public class Responsable extends Compte {
    @OneToOne
    private Cinema cinema;


    
    public Responsable() {
    }
    

    public Responsable(Integer Id, String login, String password) {
        super(Id, login, password);
    }


    public Cinema getCinema() {
        return cinema;
    }

    public void setCinema(Cinema cinema) {
        this.cinema = cinema;
    }
    
    
}
