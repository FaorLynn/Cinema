import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeancePage } from './seance-page';

describe('SeancePage', () => {
  let component: SeancePage;
  let fixture: ComponentFixture<SeancePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeancePage],
    }).compileComponents();

    fixture = TestBed.createComponent(SeancePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
