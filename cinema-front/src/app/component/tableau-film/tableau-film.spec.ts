import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableauFilmComponent } from './tableau-film';

describe('TableauFilm : parcours vers les sièges', () => {
  let fixture: ComponentFixture<TableauFilmComponent>;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableauFilmComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(TableauFilmComponent);
    fixture.detectChanges();
    http.expectOne('/api/film').flush([]);
  });

  afterEach(() => http.verify());

  it('ouvre le plan depuis une séance et revient à la liste sans créer de réservation', () => {
    const component = fixture.componentInstance;
    component.ouvrirReservation({ id: 1, nom: 'Film test', genres: [] });
    http
      .expectOne('/api/seance/film/1')
      .flush([{ id: 10, date: '2026-11-25', heure: '20:00:00', salleId: 7 }]);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.seance').click();
    fixture.detectChanges();
    http.expectOne('/api/place').flush([{ id: 1, range: 1, col: 1, salleId: 7 }]);
    http.expectOne('/api/detailAchat').flush([]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-choisir-places')).not.toBeNull();
    fixture.nativeElement.querySelector('.siege').click();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.principal').click();
    fixture.detectChanges();
    expect(component.placesSelectionnees().length).toBe(1);
    fixture.nativeElement.querySelector('.siege').click();
    fixture.detectChanges();
    expect(component.placesSelectionnees()).toEqual([]);
    component.retourAuxSeances();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.seance')).not.toBeNull();
    http.expectNone((req) => req.method !== 'GET');
  });
});
