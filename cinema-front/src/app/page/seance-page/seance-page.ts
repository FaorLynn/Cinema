import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { rxResource } from '@angular/core/rxjs-interop';
import { Seance } from '../../model/seance';
import { Salle } from '../../model/salle';
import { SeanceService } from '../../service/seance-service';

@Component({
  imports: [FormsModule, AsyncPipe],
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
    // Deuxième clic sur la même séance : on referme
    if (seance.id === this.seanceSelectionne()?.id) {
      this.salles.set([]);
      this.seanceSelectionne.set(undefined);
      return;
    }

    // La salle est déjà dans la séance (SeanceResponse), pas de requête nécessaire
    this.seanceSelectionne.set(seance);
    this.salles.set(seance.salle ? [seance.salle] : []);
  }
}