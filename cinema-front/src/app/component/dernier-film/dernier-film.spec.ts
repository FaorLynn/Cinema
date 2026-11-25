import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DernierFilm } from './dernier-film';

describe('DernierFilm', () => {
  let component: DernierFilm;
  let fixture: ComponentFixture<DernierFilm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DernierFilm],
    }).compileComponents();

    fixture = TestBed.createComponent(DernierFilm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
