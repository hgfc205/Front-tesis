import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarAnuncioP7Component } from './publicar-anuncio-p7.component';

describe('PublicarAnuncioP7Component', () => {
  let component: PublicarAnuncioP7Component;
  let fixture: ComponentFixture<PublicarAnuncioP7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicarAnuncioP7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicarAnuncioP7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
