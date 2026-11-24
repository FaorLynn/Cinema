package cinema.restcontroller;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import cinema.dao.IDAOCompte;
import cinema.dto.request.AuthRequest;
import cinema.dto.request.SubscribeRequest;
import cinema.dto.response.AuthResponse;
import cinema.dto.response.SubscribeResponse;
import cinema.model.Adresse;
import cinema.model.Utilisateur;


@RestController
@RequestMapping("/api/compte")
public class AuthRestController {
    private final JwtEncoder jwtEncoder;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final IDAOCompte daoCompte;

    public AuthRestController(JwtEncoder jwtEncoder, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder,IDAOCompte daoCompte) {
        this.jwtEncoder = jwtEncoder;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.daoCompte = daoCompte;
    }
    @PostMapping("auth")
    public AuthResponse auth(@RequestBody AuthRequest request) {
        Authentication auth = new UsernamePasswordAuthenticationToken(request.login(), request.password());
        
        auth = this.authenticationManager.authenticate(auth);
        Instant now = Instant.now();

        String scope = auth.getAuthorities()
            .stream() // Transforme la liste en Stream Java
            // .map(a -> a.getAuthority()) // Permet de transformer le GrantedAuthority en autre chose : en String
            .map(GrantedAuthority::getAuthority) // Permet de transformer le GrantedAuthority en autre chose : en String

            // Recollecter les String en une seule String, séparateur " " (espace)
            .collect(Collectors.joining(" "))
        ;
        JwtClaimsSet payload = JwtClaimsSet.builder()
            .subject(request.login()) // Le nom d'utilisateur
            .issuedAt(now) // La date / heure de la création du jeton
            .expiresAt(now.plus(1, ChronoUnit.HOURS)) // Date de validité = 1 heure

            // Liste des rôles / autorisations / etc.
            .claim("scope", scope)

            .build()
        ;
        // Header - En-tête du jeton JWT
        JwsHeader header = JwsHeader
            .with(MacAlgorithm.HS256) // HmacSHA256
            .build()
        ;

        // Génération du jeton JWT avec le JwtEncoder
         String token = this.jwtEncoder
            .encode(JwtEncoderParameters.from(header, payload))
            .getTokenValue()
        ;

        return new AuthResponse(true, token);
    }
    @PostMapping("/subscribe")
    public SubscribeResponse subscribe(@RequestBody SubscribeRequest request) {
        Utilisateur utilisateur = new Utilisateur();

        
        utilisateur.setLogin(request.login());
        if (this.daoCompte.findByLogin(request.login()).isPresent()) {
        throw new ResponseStatusException(HttpStatus.CONFLICT, "Ce login est déjà utilisé");}
        utilisateur.setPassword(this.passwordEncoder.encode(request.password()));
        Adresse adresse = new Adresse(request.numero(), request.voie(), request.ville(),  request.cp());
        utilisateur.setAdresse(adresse);
        utilisateur.setPrenom(request.prenom());
        utilisateur.setNom(request.nom());

        this.daoCompte.save(utilisateur);

        return new SubscribeResponse("Nouvelle Utilisateur crée");
    }

}
    
    

