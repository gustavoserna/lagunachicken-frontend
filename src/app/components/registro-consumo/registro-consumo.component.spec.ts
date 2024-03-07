import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroConsumoComponent } from './registro-consumo.component';

describe('RegistroConsumoComponent', () => {
  let component: RegistroConsumoComponent;
  let fixture: ComponentFixture<RegistroConsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroConsumoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
