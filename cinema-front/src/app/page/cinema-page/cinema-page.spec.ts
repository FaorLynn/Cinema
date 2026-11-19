import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CinemaPage } from './cinema-page';

describe('CinemaPage', () => {
  let component: CinemaPage;
  let fixture: ComponentFixture<CinemaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinemaPage]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CinemaPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
