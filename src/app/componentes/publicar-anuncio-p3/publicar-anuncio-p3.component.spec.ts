import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarAnuncioP3Component } from './publicar-anuncio-p3.component';

describe('PublicarAnuncioP3Component', () => {
  let component: PublicarAnuncioP3Component;
  let fixture: ComponentFixture<PublicarAnuncioP3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicarAnuncioP3Component]
    });
    fixture = TestBed.createComponent(PublicarAnuncioP3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
