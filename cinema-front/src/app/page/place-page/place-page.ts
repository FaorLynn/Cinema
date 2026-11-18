import { AsyncPipe } from '@angular/common';
import { Component,signal  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaceService } from '../../service/place-service';
import { Title } from '@angular/platform-browser';
import { rxResource } from '@angular/core/rxjs-interop';
import { Place } from '../../model/place';
import { Salle } from '../../model/salle';

@Component({
  imports: [FormsModule, AsyncPipe ],
  selector: 'app-place-page',
  styleUrl: './place-page.css',
  templateUrl: './place-page.html',
})
export class PlacePage {
  protected places = rxResource({
    stream: () => this.placeService.findAll()
  });
  protected formPlace!: Place;
  protected salles = signal<Salle[]>([]);
  protected placeSelectionne = signal<Place | undefined>(undefined);
  constructor(private title: Title, private placeService: PlaceService) {
    this.title.setTitle("Liste des places");
    this.resetFormPlace();
    
  }

  protected ajouterOuModifier() {
    this.placeService.save(this.formPlace).subscribe(() => {
      this.places.reload();
    });

    this.resetFormPlace();
  }
  protected editer(place: Place) {
    this.formPlace = { ...place };
  }

  protected supprimer(place: Place) {
    this.placeService.remove(place).subscribe(() => {
      this.places.reload();
    });
  }
  protected annulerEdition() {
    this.resetFormPlace();
  }
  private resetFormPlace() {
  this.formPlace = {
    range: 0,
    col: 0
  };
}

  protected afficherSalle(place: Place) {
    if (place.id === this.placeSelectionne()?.id) {
      this.salles.set([]);
      this.placeSelectionne.set(undefined);
      return;
    }

    this.placeSelectionne.set(place);
    this.placeService.findSalle(place).subscribe(salles => {
      this.salles.set(salles);
    });
  }
}




