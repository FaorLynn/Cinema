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
  //responsable
  protected formCinemaLoginCtrl!: FormControl;
  protected formCinemaPasswordCtrl!: FormControl;
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

