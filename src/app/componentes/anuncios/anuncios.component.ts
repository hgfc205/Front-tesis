import { Component,OnInit,TemplateRef } from '@angular/core';
import { AnunciosService } from '../../servicios/anuncios/anuncios.service';
import { LoginService } from '../../servicios/login/login.service';
import { Router } from '@angular/router';


//Estructura con los datos para dar de altaun anuncio.
import { Anuncios_get, Anuncios_add } from '../../clases/Anuncios';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent {
  
  constructor
  (
    //Declaracion del servicio de anuncios.
    private anunciosService: AnunciosService,
    //Declaracion del servicio de Inicio de sesión
    private loginService: LoginService,
    private router: Router,
  ){
    
  }
  
  // Evento de clic en "Nuevo anuncio +"
  nuevoAnuncio() {
    this.router.navigate(['anuncios/publicar/alojamieto']);
  }

  ngOnInit(){

  }

  //Evento de "Cerrar Sesion"
  cerrar_sesion(){
    this.loginService.logout()
    .then(()=> {
      this.router.navigate(['']);
    })
    .catch(error => console.log(error));
  }

  //Evento de "Agregar Anuncio"
  addAnuncio(event: Event) {
    
  }
}