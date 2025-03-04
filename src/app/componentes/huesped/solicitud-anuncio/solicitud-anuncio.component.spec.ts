import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudAnuncioComponent } from './solicitud-anuncio.component';

describe('SolicitudAnuncioComponent', () => {
  let component: SolicitudAnuncioComponent;
  let fixture: ComponentFixture<SolicitudAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudAnuncioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
