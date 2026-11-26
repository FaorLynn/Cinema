import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgSeance } from './prog-seance';

describe('ProgSeance', () => {
  let component: ProgSeance;
  let fixture: ComponentFixture<ProgSeance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgSeance],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgSeance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
