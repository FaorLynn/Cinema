import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CinemaGestion } from './cinema-gestion';

describe('CinemaGestion', () => {
  let component: CinemaGestion;
  let fixture: ComponentFixture<CinemaGestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinemaGestion],
    }).compileComponents();

    fixture = TestBed.createComponent(CinemaGestion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
