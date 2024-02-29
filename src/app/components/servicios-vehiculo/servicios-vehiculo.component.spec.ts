import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosVehiculoComponent } from './servicios-vehiculo.component';

describe('ServiciosVehiculoComponent', () => {
  let component: ServiciosVehiculoComponent;
  let fixture: ComponentFixture<ServiciosVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiciosVehiculoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiciosVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
