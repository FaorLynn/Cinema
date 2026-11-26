import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionFilm } from './gestion-film';

describe('GestionFilm', () => {
  let component: GestionFilm;
  let fixture: ComponentFixture<GestionFilm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionFilm],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionFilm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
