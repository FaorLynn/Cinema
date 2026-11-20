import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Compte } from '../../model/compte';
import { CompteService } from '../../service/compte-service';

@Component({
  imports: [FormsModule, AsyncPipe],
  selector: 'app-compte-page',
  styleUrl: './compte-page.css',
  templateUrl: './compte-page.html',
})
export class ComptePage {
  protected comptes = rxResource({
    stream: () => this.compteService.findAll()
  });
  protected formCompte!: Compte;
  protected compteSelectionne = signal<Compte | undefined>(undefined);
  constructor(private title: Title, private compteService: CompteService) {
    this.title.setTitle("Liste des comptes");
    this.resetFormCompte();
    
  }

  protected ajouterOuModifier() {
    this.compteService.save(this.formCompte).subscribe(() => {
      this.comptes.reload();
    });
}
protected editer(compte: Compte) {
    this.formCompte = { ...compte };
  }

  protected supprimer(compte: Compte) {
    this.compteService.remove(compte).subscribe(() => {
      this.comptes.reload();
    });
  }
  protected annulerEdition() {
    this.resetFormCompte();
  }
  private resetFormCompte() {
  this.formCompte = {
    login:"",
    password: ""
  };
}

  protected afficherSalle(compte: Compte) {
    if (compte.id === this.compteSelectionne()?.id) {
      this.compteSelectionne.set(undefined);
      return;
    }

    this.compteSelectionne.set(compte);
  }
}
