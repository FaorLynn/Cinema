import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Salle } from '../../model/salle';
import { SalleService } from '../../service/salle-service';
import { CommonModule } from '@angular/common';
import { PlaceService } from '../../service/place-service';
import { Cinema } from '../../model/cinema';
import { Place } from '../../model/place';

@Component({
  imports: [ReactiveFormsModule,CommonModule],
  selector: 'app-salle-gestion',
  styleUrl: './salle-gestion.css',
  templateUrl: './salle-gestion.html',
})
export class SalleGestion {
  cinema = input.required<Cinema>();
  private salleService = inject(SalleService);
 protected salles = signal<Salle[]>([]);
  protected salleFormShow = signal(false)

  protected formSalleGrp!: FormGroup;

  protected formSalleNbrRangeCtrl!: FormControl;
  protected formSalleCapaciteRangeCtrl!: FormControl;
  protected formSalleNomCtrl!: FormControl;
  protected formSalleTypeCtrl!: FormControl;

  protected typesSalle = [
  { value: 'CLASSIQUE',    label: 'Classique' },
  { value: 'IMAX',         label: 'IMAX' },
  { value: 'TROIS_D',      label: '3D' },
  { value: 'IMAX_TROIS_D', label: 'IMAX 3D' },
  { value: 'QUATRE_DX',    label: '4DX' },
  { value: 'VIP',          label: 'VIP' },
];
constructor(

    private placeService: PlaceService,
    private formBuilder: FormBuilder
  ) { }

 ngOnInit() {
    this.formSalleNbrRangeCtrl = this.formBuilder.control("", Validators.required);
     this.formSalleCapaciteRangeCtrl = this.formBuilder.control("", Validators.required);
    this.formSalleNomCtrl = this.formBuilder.control("", Validators.required);
    this.formSalleTypeCtrl = this.formBuilder.control("", Validators.required);
    this.formSalleGrp = this.formBuilder.group({
      nom: this.formSalleNomCtrl,
      type:this.formSalleTypeCtrl,
      capaciteRange:this.formSalleCapaciteRangeCtrl,
      nbrRange:this.formSalleNbrRangeCtrl
    });
    this.chargerSalles();
  }
  
  protected chargerSalles() {
    
    const id = this.cinema().id;

if (id !== undefined) {
  this.salleService.findSallesByCinemaId(id).subscribe({
    next: (salles) => this.salles.set(salles),
    error: (err) => console.error('Erreur chargement salles', err),
  });
}
  }


  protected annulerEdition(){
    this.salleFormShow.set(false)
  }
  protected save() {
  if (this.formSalleGrp.invalid) return;

  const v = this.formSalleGrp.value;

  const request: Salle = {
    nom: v.nom,
    capacite_max: v.nbrRange * v.capaciteRange,
    Cinema: this.cinema(),
    type: v.type,
  };

  this.salleService.save(request).subscribe({
    next: (salleCreee) => {
      console.log(salleCreee.id);
      this.creerPlaces(salleCreee,v.nbrRange, v.capaciteRange,)
      this.formSalleGrp.reset({ type: '' });
      this.salleFormShow.set(false);
      this.chargerSalles();
    },
    error: (err) => console.error('Erreur création salle', err),
  });
}
protected creerPlaces(salle: Salle, nbrRange: number, capaciteRange: number) {

  for (let rangee = 1; rangee <= nbrRange; rangee++) {

    for (let numero = 1; numero <= capaciteRange; numero++) {

      const place: Place = {
        range: rangee,
        col: numero,
        salleId: salle.id
      } as Place;

      this.placeService.save(place).subscribe({
        next: () => console.log(`Place ${numero}, rangée ${rangee} créée`),
        error: err => console.error('Erreur création place', err)
      });

    }
  }
}
supprimer(salle: Salle) {
  if (!confirm(`Supprimer la salle "${salle.nom}" ?`)) return;

  this.salleService.remove(salle).subscribe({
    next: () => this.salles.update(list => list.filter(s => s.id !== salle.id)),
    error: () => alert('Impossible de supprimer la salle (séances liées ?)')
  });
}
}
