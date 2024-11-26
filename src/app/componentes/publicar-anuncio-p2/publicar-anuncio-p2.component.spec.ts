import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarAnuncioP2Component } from './publicar-anuncio-p2.component';

describe('PublicarAnuncioP2Component', () => {
  let component: PublicarAnuncioP2Component;
  let fixture: ComponentFixture<PublicarAnuncioP2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicarAnuncioP2Component]
    });
    fixture = TestBed.createComponent(PublicarAnuncioP2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
