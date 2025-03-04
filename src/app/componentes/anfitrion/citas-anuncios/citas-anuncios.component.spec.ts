import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasAnunciosComponent } from './citas-anuncios.component';

describe('CitasAnunciosComponent', () => {
  let component: CitasAnunciosComponent;
  let fixture: ComponentFixture<CitasAnunciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasAnunciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitasAnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
