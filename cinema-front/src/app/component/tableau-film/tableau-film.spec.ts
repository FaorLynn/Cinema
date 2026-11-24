import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableauFilmComponent } from './tableau-film';

describe('TableauFilm', () => {
  let component: TableauFilmComponent;
  let fixture: ComponentFixture<TableauFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauFilmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableauFilmComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
