import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarAnuncioP5Component } from './publicar-anuncio-p5.component';

describe('PublicarAnuncioP5Component', () => {
  let component: PublicarAnuncioP5Component;
  let fixture: ComponentFixture<PublicarAnuncioP5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicarAnuncioP5Component]
    });
    fixture = TestBed.createComponent(PublicarAnuncioP5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
