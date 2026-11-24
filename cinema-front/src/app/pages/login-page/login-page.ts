import { Component, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Auth } from '../../model/auth';
import { Register } from '../../model/register';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule,FormsModule],
  selector: 'app-login-page',
  styleUrl: './login-page.css',
  templateUrl: './login-page.html',
})
export class LoginPage {
  protected title: Title = inject(Title);
  protected authService: AuthService = inject(AuthService);
  protected router:Router = inject(Router);
  protected isRegisterMode = signal(false);
  protected erreurRegister=signal("");
  protected erreurAuth=signal("");
  protected formAuth: Auth={login:"",password:""};
  protected formRegister: Register = {
    login: "",
    password: "",
    nom: "",
    prenom: "",
    adresse: {
        numero: "",
        voie: "",
        cp: "",
        ville: ""
    }
};
  ngOnInit(): void {

    this.title.setTitle("Connection");
    

    
  }

  toggleChange(){
    this.erreurRegister.set("");
    if (this.isRegisterMode()){
      this.title.setTitle("Connection");
      

    }
    else{
      this.title.setTitle("s'inscrire");
    }
    this.isRegisterMode.set(!this.isRegisterMode());
  }

  login(){ 
    this.authService.login(this.formAuth).subscribe({
    next: resp => {
      this.authService.token = resp.token;
      sessionStorage.setItem('token', resp.token);
      this.router.navigate(['films']);
    },
    error: () => this.erreurAuth.set('Login ou mot de passe incorrect')
  });
  }




  register() {
  this.authService.register(this.formRegister).subscribe({
    next: () => {
      this.isRegisterMode.set(false) ;
      this.title.setTitle("Connexion");
      this.erreurRegister.set("");
      this.formRegister= {
    login: "",
    password: "",
    nom: "",
    prenom: "",
    adresse: {
        numero: "",
        voie: "",
        cp: "",
        ville: ""
    }
};
    },
    error: (err) => {
      
      this.erreurRegister.set("erreur lors de l'inscription veuillez réssayer");
    }
  });
}


}
