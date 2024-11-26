import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarAnuncioComponent } from './publicar-anuncio.component';

describe('PublicarAnuncioComponent', () => {
  let component: PublicarAnuncioComponent;
  let fixture: ComponentFixture<PublicarAnuncioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicarAnuncioComponent]
    });
    fixture = TestBed.createComponent(PublicarAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
