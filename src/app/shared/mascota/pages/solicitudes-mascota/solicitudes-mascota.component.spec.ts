import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesMascotaComponent } from './solicitudes-mascota.component';

describe('SolicitudesMascotaComponent', () => {
  let component: SolicitudesMascotaComponent;
  let fixture: ComponentFixture<SolicitudesMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesMascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
