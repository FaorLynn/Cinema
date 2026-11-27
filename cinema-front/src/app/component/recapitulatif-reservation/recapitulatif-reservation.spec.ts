import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../service/auth-service';
import { RecapitulatifReservation } from './recapitulatif-reservation';

describe('RecapitulatifReservation', () => {
  let fixture: ComponentFixture<RecapitulatifReservation>;
  let http: HttpTestingController;
  let role: string;

  beforeEach(() => {
    role = 'UTILISATEUR';
    TestBed.configureTestingModule({
      imports: [RecapitulatifReservation],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: { hasRole: (value: string) => role === value } },
      ],
    });
    fixture = TestBed.createComponent(RecapitulatifReservation);
    http = TestBed.inject(HttpTestingController);
    fixture.componentRef.setInput('film', { id: 1, nom: 'Film test', genres: [] });
    fixture.componentRef.setInput('seance', {
      id: 10,
      date: '2026-11-26',
      heure: '20:30:00',
      salle: { id: 7, nom: 'Salle IMAX', cinemaId: 3 },
    });
    fixture.componentRef.setInput('places', [
      { id: 2, range: 2, col: 4 },
      { id: 1, range: 1, col: 2 },
    ]);
  });

  afterEach(() => http.verify());

  it('affiche la séance, le cinéma et les sièges sans écrire en base', () => {
    fixture.detectChanges();
    http.expectOne('/api/cinema/3').flush({ id: 3, nom: 'Cinéma test' });
    fixture.detectChanges();
    const texte = fixture.nativeElement.textContent;
    for (const valeur of [
      'Film test',
      'Cinéma test',
      'Salle IMAX',
      '26/11/2026',
      '20:30',
      'pas encore réservée',
    ]) {
      expect(texte).toContain(valeur);
    }
    expect(fixture.componentInstance.placesTriees().map((p) => p.id)).toEqual([1, 2]);
    http.expectNone((req) => req.method !== 'GET');
  });

  it('désactive le récapitulatif pour ADMIN et ne charge pas de cinéma', () => {
    role = 'ADMIN';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('pas accessible en mode administrateur');
    expect(fixture.nativeElement.querySelector('.informations')).toBeNull();
    http.expectNone('/api/cinema/3');
  });

  it('permet de réessayer si le cinéma ne peut pas être chargé', () => {
    fixture.detectChanges();
    http.expectOne('/api/cinema/3').flush({}, { status: 500, statusText: 'Error' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]')).not.toBeNull();
    fixture.componentInstance.chargerCinema();
    http.expectOne('/api/cinema/3').flush({ nom: 'Cinéma test' });
    expect(fixture.componentInstance.erreur()).toBe('');
  });

  it('émet le retour et la fermeture sans mutation', () => {
    fixture.detectChanges();
    http.expectOne('/api/cinema/3').flush({ nom: 'Cinéma test' });
    let retours = 0;
    let fermetures = 0;
    fixture.componentInstance.retour.subscribe(() => retours++);
    fixture.componentInstance.fermer.subscribe(() => fermetures++);
    fixture.nativeElement.querySelector('.retour').click();
    fixture.nativeElement.querySelector('.actions button:last-child').click();
    expect(retours).toBe(1);
    expect(fermetures).toBe(1);
  });
});
