import { Component, inject, signal } from '@angular/core';
import { CinemaService } from '../../service/cinema-service';
import { AuthService } from '../../service/auth-service';
import { Cinema } from '../../model/cinema';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Observable, Subject, startWith, switchMap } from 'rxjs';
import { Responsable } from '../../model/responsable';
import { ResponsableService } from '../../service/responsable-service';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-cinema-gestion',
  styleUrl: './cinema-gestion.css',
  templateUrl: './cinema-gestion.html',
})
export class CinemaGestion {
   protected authService: AuthService = inject(AuthService);


  protected cinemas = signal<Cinema[]>([]);

 
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
  //responsable
  protected formCinemaLoginCtrl!: FormControl;
  protected formCinemaPasswordCtrl!: FormControl;

  protected afficherFormulaire = signal(false);
  constructor(

    private cinemaService: CinemaService,
    private responsableService: ResponsableService,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
   
    this.responsables$ = this.responsableService.findAll();

    // Création du formulaire ReactiveForms
    this.formCinemaNomCtrl = this.formBuilder.control("", Validators.required);
    this.formCinemaNumeroCtrl = this.formBuilder.control("", Validators.required);
    this.formCinemaVoieCtrl = this.formBuilder.control("", Validators.required);
    this.formCinemaVilleCtrl = this.formBuilder.control("", Validators.required);
    this.formCinemaCpCtrl = this.formBuilder.control("", Validators.required);
    this.formCinemaLoginCtrl = this.formBuilder.control("", Validators.required);
    this.formCinemaPasswordCtrl = this.formBuilder.control("", Validators.required);
    
    
    this.formCinemaGrp = this.formBuilder.group({
      nom: this.formCinemaNomCtrl,
      adresse: this.formBuilder.group({
        numero: this.formCinemaNumeroCtrl,
        voie: this.formCinemaVoieCtrl,
        ville: this.formCinemaVilleCtrl,
        cp: this.formCinemaCpCtrl

      }),
      responsable: this.formBuilder.group({
        login: this.formCinemaLoginCtrl,
        password: this.formCinemaPasswordCtrl,
        
        
      }),
      
    });
    

    this.chargerCinemas();

    console.log(this.cinemas)
  }  

  protected ajouterOuModifier() {
  if (this.formCinemaGrp.invalid) {
    return;
  }

  const formValue = this.formCinemaGrp.getRawValue();

  // 1. Création du responsable
  const responsable: Responsable = {
    ...formValue.responsable
  };

  this.responsableService.save(responsable).subscribe({
    next: (responsableCree) => {

      // 2. Création du cinéma avec l'ID du responsable
      if (responsableCree.id === undefined) {
         console.log(responsableCree)
        console.log(responsableCree.id)
    return;
  }
      const cinema: Cinema = {
        nom: formValue.nom,
        adresse: formValue.adresse,
        
        responsableId: responsableCree.id
      };

      // 3. Enregistrement du cinéma
      this.cinemaService.save(cinema).subscribe(() => {
        this.chargerCinemas();
        this.formCinemaGrp.reset();
        this.editingCinemaId = undefined;
      });
    }
  });
  this.afficherFormulaire.set(false)
}



  protected editer(cinema: Cinema) {
    this.afficherFormulaire.set(true)
    this.editingCinemaId = cinema.id;

    this.formCinemaGrp.patchValue({
      nom: cinema.nom,
      adresse: cinema.adresse,
      responsableId: cinema.responsableId
    });
  }

  protected supprimer(cinema: Cinema) {
    this.cinemaService.remove(cinema).subscribe(() => {
      this.chargerCinemas();
    });
  }

  protected annulerEdition() {
    this.editingCinemaId = undefined;
    this.afficherFormulaire.set(false)
    this.formCinemaGrp.reset();
  }

  protected chargerCinemas() {
  this.cinemaService.findAll().subscribe({
    next: (cinemas) => {
      this.cinemas.set(cinemas);
    },
    error: (err) => {
      console.error("Erreur lors du chargement des cinémas", err);
    }
  });
}
}

