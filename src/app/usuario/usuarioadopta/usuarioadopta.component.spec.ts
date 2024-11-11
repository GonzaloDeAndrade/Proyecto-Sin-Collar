import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioadoptaComponent } from './usuarioadopta.component';

describe('UsuarioadoptaComponent', () => {
  let component: UsuarioadoptaComponent;
  let fixture: ComponentFixture<UsuarioadoptaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioadoptaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioadoptaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
