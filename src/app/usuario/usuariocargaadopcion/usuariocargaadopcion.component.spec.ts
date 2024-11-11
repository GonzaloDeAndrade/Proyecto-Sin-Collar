import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariocargaadopcionComponent } from './usuariocargaadopcion.component';

describe('UsuariocargaadopcionComponent', () => {
  let component: UsuariocargaadopcionComponent;
  let fixture: ComponentFixture<UsuariocargaadopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariocargaadopcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariocargaadopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
