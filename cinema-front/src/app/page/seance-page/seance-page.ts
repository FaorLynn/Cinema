import { AsyncPipe } from '@angular/common';
import { Component,signal  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaceService } from '../../service/place-service';
import { Title } from '@angular/platform-browser';
import { rxResource } from '@angular/core/rxjs-interop';
import { Seance } from '../../model/seance';
import { Salle } from '../../model/salle';

@Component({
  imports: [FormsModule, AsyncPipe ],
  selector: 'app-seance-page',
  styleUrl: './seance-page.css',
  templateUrl: './seance-page.html',
})
export class SeancePage {
  protected seances = rxResource({
    stream: () => this.seanceService.findAll()
  });
  protected formSeance!: Seance;
  protected salles = signal<Salle[]>([]);
  protected seanceSelectionne = signal<Seance | undefined>(undefined);
  constructor(private title: Title, private seanceService: SeanceService) {
    this.title.setTitle("Liste des seances");
    this.resetFormSeance();
    
  }

  protected ajouterOuModifier() {
    this.seanceService.save(this.formSeance).subscribe(() => {
      this.seances.reload();
    });

    this.resetFormSeance();
  }
  protected editer(seance: Seance) {
    this.formSeance = { ...seance };
  }

  protected supprimer(seance: Seance) {
    this.seanceService.remove(seance).subscribe(() => {
      this.seances.reload();
    });
  }
  protected annulerEdition() {
    this.resetFormSeance();
  }
  private resetFormSeance() {
  this.formSeance = {
    date: "",
    heure: ""
  };
}

  protected afficherSalle(seance: Seance) {
    if (seance.id === this.seanceSelectionne()?.id) {
      this.salles.set([]);
      this.seanceSelectionne.set(undefined);
      return;
    }

    this.seanceSelectionne.set(seance);
    this.seanceService.findSalle(seance).subscribe(salles => {
      this.salles.set(salles);
    });
  }
}




