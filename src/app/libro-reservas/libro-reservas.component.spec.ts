import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroReservasComponent } from './libro-reservas.component';

describe('LibroReservasComponent', () => {
  let component: LibroReservasComponent;
  let fixture: ComponentFixture<LibroReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroReservasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
