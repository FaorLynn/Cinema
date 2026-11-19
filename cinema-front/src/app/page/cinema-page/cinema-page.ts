import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { Cinema } from '../../model/cinema';
import { Title } from '@angular/platform-browser';
import { CinemaService } from '../../service/cinema-service';
import { ResponsableService } from '../../service/responsable-service';
import { Responsable } from '../../model/responsable';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-cinema-page',
  styleUrl: './cinema-page.css',
  templateUrl: './cinema-page.html',
})

export class CinemaPage implements OnInit{
  protected cinema$!: Observable<Cinema[]>;
  protected responsables$!: Observable<Responsable[]>;
  private refresh$: Subject<void> = new Subject<void>();

  protected editingCinemaId?: number; 
  protected formCinemaGrp!: FormGroup;
  protected formCinemaNomCtrl!: FormControl;
  
  //adresse
  protected formCinemaNumeroCtrl!: FormControl;
  protected formCinemaVoieCtrl!: FormControl;
  protected formCinemaVilleCtrl!: FormControl;
  protected formCinemaCpCtrl!: FormControl;
  //liste des salles?
  // protected formCinemaSalleCtrl!: FormControl;
  //responsable
  protected formCinemaResponsableCtrl!: FormControl;

  constructor(
    private title: Title,
    private cinemaService: CinemaService,
    private responsableService: ResponsableService,
    // private salleService: SalleService,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.title.setTitle("Liste des cinemas");
    this.responsables$ = this.responsableService.findAll();

    // Création du formulaire ReactiveForms
    this.formCinemaNomCtrl = this.formBuilder.control("", Validators.required);
    this.formCinemaNumeroCtrl = this.formBuilder.control("", Validators.required);
    this.formCinemaVoieCtrl = this.formBuilder.control("", Validators.required);
    this.formCinemaVilleCtrl = this.formBuilder.control("", Validators.required);
    this.formCinemaCpCtrl = this.formBuilder.control("", Validators.required);

    // this.formCinemaSalleCtrl = this.formBuilder.control("");
    this.formCinemaResponsableCtrl = this.formBuilder.control("", Validators.required);
    
    this.formCinemaGrp = this.formBuilder.group({
      nom: this.formCinemaNomCtrl,
      adresse: this.formBuilder.group({
        numero: this.formCinemaNumeroCtrl,
        voie: this.formCinemaVoieCtrl,
        ville: this.formCinemaVilleCtrl,
        cp: this.formCinemaCpCtrl
      }),
      // salles: this.formCinemaSalleCtrl,
      responsableId: this.formCinemaResponsableCtrl
    });
    

    this.cinema$ = this.refresh$.pipe(
      startWith(null),
      switchMap(() => this.cinemaService.findAll())
    );
  }  

  protected ajouterOuModifier() {
    if (this.formCinemaGrp.invalid) {return;}

    const cinema: Cinema = {
      ...this.formCinemaGrp.getRawValue(),
      id: this.editingCinemaId
    };

    this.cinemaService.save(cinema).subscribe(() => {
      this.refresh$.next();
    });

    this.formCinemaGrp.reset();
    this.editingCinemaId = undefined;
  }

  protected editer(cinema: Cinema) {
    this.editingCinemaId = cinema.id;

    this.formCinemaGrp.patchValue({
      nom: cinema.nom,
      adresse: cinema.adresse,
      responsableId: cinema.responsableId
    });
  }

  protected supprimer(cinema: Cinema) {
    this.cinemaService.remove(cinema).subscribe(() => {
      this.refresh$.next();
    });
  }

  protected annulerEdition() {
    this.editingCinemaId = undefined;
    this.formCinemaGrp.reset();
  }
}