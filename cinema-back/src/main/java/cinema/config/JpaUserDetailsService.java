package cinema.config;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import cinema.dao.IDAOCompte;



@Service
public class JpaUserDetailsService  implements UserDetailsService {
    private final IDAOCompte daoCompte;

    public JpaUserDetailsService(IDAOCompte daoCompte) {
        this.daoCompte = daoCompte;
    }

    @Override 
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        return this.daoCompte
            .findByLogin(login)
            .map(compte -> User
                .withUsername(login)
                .password(compte.getPassword())
                .roles(compte.getClass().getSimpleName().toUpperCase())
                .build()
            )
            .orElseThrow(() -> new UsernameNotFoundException("Compte not found"));
    }
}