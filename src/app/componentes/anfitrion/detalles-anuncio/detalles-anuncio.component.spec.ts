import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesAnuncioComponent } from './detalles-anuncio.component';

describe('DetallesAnuncioComponent', () => {
  let component: DetallesAnuncioComponent;
  let fixture: ComponentFixture<DetallesAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesAnuncioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
