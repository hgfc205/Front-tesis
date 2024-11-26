import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarAnuncioP6Component } from './publicar-anuncio-p6.component';

describe('PublicarAnuncioP6Component', () => {
  let component: PublicarAnuncioP6Component;
  let fixture: ComponentFixture<PublicarAnuncioP6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicarAnuncioP6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicarAnuncioP6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
