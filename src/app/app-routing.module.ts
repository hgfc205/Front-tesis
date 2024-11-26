import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

//Importación de la pantalla principal
import{ PantallaPrincipalComponent } from './componentes/pantalla-principal/pantalla-principal.component';
import { HomeComponent} from './componentes/home/home.component';
import { AnunciosComponent } from './componentes/anuncios/anuncios.component';
import { PublicarAnuncioComponent } from './componentes/publicar-anuncio-p1/publicar-anuncio.component';
import { PublicarAnuncioP2Component } from './componentes/publicar-anuncio-p2/publicar-anuncio-p2.component';
import { PublicarAnuncioP3Component } from './componentes/publicar-anuncio-p3/publicar-anuncio-p3.component';
import { PublicarAnuncioP4Component } from './componentes/publicar-anuncio-p4-/publicar-anuncio-p4.component';
import { PublicarAnuncioP5Component } from './componentes/publicar-anuncio-p5/publicar-anuncio-p5.component';
import { PublicarAnuncioP6Component } from './componentes/publicar-anuncio-p6/publicar-anuncio-p6.component';
import { PublicarAnuncioP7Component } from './componentes/publicar-anuncio-p7/publicar-anuncio-p7.component';
import { PublicarAnuncioP8Component } from './componentes/publicar-anuncio-p8/publicar-anuncio-p8.component';
import { PerfilUsuarioComponent} from './componentes/perfil-usuario/perfil-usuario.component';
import { PerfilAnuncioComponent} from './componentes/perfil-anuncio/perfil-anuncio.component';
let id: number | null = null;
//Rutas qu se manejaran en la paginaweb.
const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: '' }, 

  // Redirige cualquier ruta no coincidente a la ruta inicial''
  //{ path: '**', redirectTo: ''},
  //Ruta inicial.
  {path: '',component: PantallaPrincipalComponent},
  //home: Pagina principal para usuarios logeados, con resticcion de login.
  { path: 'home', component: HomeComponent,
  ...canActivate(() => redirectUnauthorizedTo(['']))},
  { path: 'anuncios', component: AnunciosComponent,
  ...canActivate(() => redirectUnauthorizedTo(['']))},

  //Direcciones para dar de alta un anuncio.
  { path: 'anuncios/publicar/alojamieto', component: PublicarAnuncioComponent,
  ...canActivate(() => redirectUnauthorizedTo(['']))},

  { path: 'anuncios/publicar/direccion', component: PublicarAnuncioP2Component,
  ...canActivate(() => redirectUnauthorizedTo(['']))},

  { path: 'anuncios/publicar/detalles', component: PublicarAnuncioP3Component,
  ...canActivate(() => redirectUnauthorizedTo(['']))},

  { path: 'anuncios/publicar/servicios', component: PublicarAnuncioP4Component,
  ...canActivate(() => redirectUnauthorizedTo(['']))},

  { path: 'anuncios/publicar/descripcion', component: PublicarAnuncioP5Component,
  ...canActivate(() => redirectUnauthorizedTo(['']))},

  { path: 'anuncios/publicar/fechas/', component: PublicarAnuncioP6Component,
  ...canActivate(() => redirectUnauthorizedTo(['']))},
  
  { path: 'anuncios/publicar/imagenes', component: PublicarAnuncioP7Component,
  ...canActivate(() => redirectUnauthorizedTo(['']))},

  { path: 'perfil', component: PerfilUsuarioComponent,
  ...canActivate(() => redirectUnauthorizedTo(['']))},

  { path: 'perfil/anuncio/:id', component: PerfilAnuncioComponent,
  ...canActivate(() => redirectUnauthorizedTo(['']))},

  
  //{ path:`perfil/anuncio/${id}`, component: AnunciosComponent}, 
  //{ path:`perfil/usuario/${id}`, component: AnunciosComponent}, 
  // Otras rutas que puedas tener
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
