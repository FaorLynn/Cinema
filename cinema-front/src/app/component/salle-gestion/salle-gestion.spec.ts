import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalleGestion } from './salle-gestion';

describe('SalleGestion', () => {
  let component: SalleGestion;
  let fixture: ComponentFixture<SalleGestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalleGestion],
    }).compileComponents();

    fixture = TestBed.createComponent(SalleGestion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
