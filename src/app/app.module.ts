import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule,NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule } from '@angular/google-maps';

import { CommonModule } from '@angular/common';
import{AnunciosService} from './servicios/anuncios/anuncios.service';
import { LoginService } from 'src/app/servicios/login/login.service';
import { PantallaPrincipalComponent } from './componentes/pantalla-principal/pantalla-principal.component';
import { HomeComponent } from './componentes/home/home.component';
import { AnunciosComponent } from './componentes/anuncios/anuncios.component';
import { environment } from 'src/environment/environment';
import { PublicarAnuncioComponent } from './componentes/publicar-anuncio-p1/publicar-anuncio.component';
import { PublicarAnuncioP2Component } from './componentes/publicar-anuncio-p2/publicar-anuncio-p2.component';
import { PublicarAnuncioP3Component } from './componentes/publicar-anuncio-p3/publicar-anuncio-p3.component';
import { PublicarAnuncioP4Component } from './componentes/publicar-anuncio-p4-/publicar-anuncio-p4.component';
import { PublicarAnuncioP5Component } from './componentes/publicar-anuncio-p5/publicar-anuncio-p5.component';
import { PublicarAnuncioP6Component } from './componentes/publicar-anuncio-p6/publicar-anuncio-p6.component';
import { PublicarAnuncioP7Component } from './componentes/publicar-anuncio-p7/publicar-anuncio-p7.component';
import { PublicarAnuncioP8Component } from './componentes/publicar-anuncio-p8/publicar-anuncio-p8.component';
import { PerfilAnuncioComponent } from './componentes/perfil-anuncio/perfil-anuncio.component';

//import { Anuncios_get,Anuncios_add } from './clases/Anuncios';

@NgModule({
  declarations: [
    AppComponent,
    AnunciosComponent,
    PantallaPrincipalComponent,
    HomeComponent,
    PerfilAnuncioComponent,
    PerfilAnuncioComponent,
    PublicarAnuncioComponent,
    PublicarAnuncioP2Component,
    PublicarAnuncioP3Component,
    PublicarAnuncioP4Component,
    PublicarAnuncioP5Component,
  ],
  imports: [
    NgbModule,
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule, 
    FormsModule,
    CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  exports: [AnunciosComponent,
    PantallaPrincipalComponent,
  ],
  providers: [AnunciosService,LoginService],
  bootstrap: [AppComponent],
})
export class AppModule { }
