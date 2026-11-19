import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdressePage } from './adresse-page';

describe('AdressePage', () => {
  let component: AdressePage;
  let fixture: ComponentFixture<AdressePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdressePage],
    }).compileComponents();

    fixture = TestBed.createComponent(AdressePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
