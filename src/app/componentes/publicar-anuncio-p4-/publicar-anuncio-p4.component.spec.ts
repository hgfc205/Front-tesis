import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarAnuncioP4Component } from './publicar-anuncio-p4.component';

describe('PublicarAnuncioP4Component', () => {
  let component: PublicarAnuncioP4Component;
  let fixture: ComponentFixture<PublicarAnuncioP4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicarAnuncioP4Component]
    });
    fixture = TestBed.createComponent(PublicarAnuncioP4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
