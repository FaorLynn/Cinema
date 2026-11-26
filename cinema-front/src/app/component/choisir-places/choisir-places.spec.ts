import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../service/auth-service';
import { ChoisirPlaces } from './choisir-places';

const places = [
  { id: 1, range: 1, col: 1, salleId: 7 },
  { id: 2, range: 1, col: 2, salleId: 7 },
  { id: 3, range: 2, col: 1, salleId: 7 },
  { id: 4, range: 1, col: 1, salleId: 8 },
];

describe('ChoisirPlaces', () => {
  let fixture: ComponentFixture<ChoisirPlaces>;
  let component: ChoisirPlaces;
  let http: HttpTestingController;
  let auth: { role: string };

  beforeEach(() => {
    auth = { role: 'USER' };
    TestBed.configureTestingModule({
      imports: [ChoisirPlaces],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: auth },
      ],
    });
    fixture = TestBed.createComponent(ChoisirPlaces);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    fixture.componentRef.setInput('seance', {
      id: 10,
      salleId: 7,
      date: '2026-11-25',
      heure: '20:00:00',
    });
    fixture.detectChanges();
  });

  afterEach(() => http.verify());

  function charger(): void {
    http.expectOne('/api/place').flush(places);
    http.expectOne('/api/detailAchat').flush([
      { id: 1, prixAchat: 8, achatId: 1, placeId: 1, seanceId: 10 },
      { id: 2, prixAchat: 8, achatId: 2, placeId: 2, seanceId: 11 },
    ]);
    fixture.detectChanges();
  }

  it('filtre la salle et les occupations uniquement pour la séance choisie', () => {
    charger();
    expect(component.places().map((p) => p.id)).toEqual([1, 2, 3]);
    expect(component.estOccupee(places[0])).toBe(true);
    expect(component.estOccupee(places[1])).toBe(false);
    component.choisir(places[0]);
    expect(component.selection()).toEqual([]);
  });

  it('permet plusieurs sièges, leur désélection et transmet la sélection sans écrire en base', () => {
    charger();
    const choix: unknown[] = [];
    component.continuer.subscribe((value) => choix.push(value));
    component.valider();
    expect(choix).toEqual([]);
    component.choisir(places[1]);
    component.choisir(places[2]);
    expect(component.selection().length).toBe(2);
    component.choisir(places[1]);
    component.valider();
    expect(choix).toEqual([[places[2]]]);
    http.expectNone((req) => req.method !== 'GET');
  });

  it('interdit toute sélection et continuation pour ADMIN', () => {
    auth.role = 'ADMIN';
    charger();
    component.choisir(places[1]);
    component.valider();
    expect(component.selection()).toEqual([]);
    expect(fixture.nativeElement.textContent).toContain('consultation uniquement');
    expect(fixture.nativeElement.querySelector('.principal')).toBeNull();
  });

  it('bloque le choix si les disponibilités ne sont pas accessibles et propose de réessayer', () => {
    http.expectOne('/api/place').flush(places);
    http.expectOne('/api/detailAchat').flush({}, { status: 500, statusText: 'Error' });
    component.choisir(places[1]);
    expect(component.selection()).toEqual([]);
    expect(component.erreur()).toContain('Impossible');
    component.charger();
    charger();
    expect(component.erreur()).toBe('');
  });

  it('réinitialise les sièges au changement de séance', () => {
    charger();
    component.choisir(places[1]);
    fixture.componentRef.setInput('seance', {
      id: 11,
      salleId: 8,
      date: '2026-11-25',
      heure: '21:00:00',
    });
    fixture.detectChanges();
    expect(component.selection()).toEqual([]);
    charger();
    expect(component.places().map((p) => p.id)).toEqual([4]);
  });
});
