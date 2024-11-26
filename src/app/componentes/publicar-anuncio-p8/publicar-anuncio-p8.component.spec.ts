import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarAnuncioP8Component } from './publicar-anuncio-p8.component';

describe('PublicarAnuncioP8Component', () => {
  let component: PublicarAnuncioP8Component;
  let fixture: ComponentFixture<PublicarAnuncioP8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicarAnuncioP8Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicarAnuncioP8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
