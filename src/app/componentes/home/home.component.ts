import { Component, OnInit } from '@angular/core';
import { AnunciosService } from '../../servicios/anuncios/anuncios.service';
import { LoginService } from '../../servicios/login/login.service';
import { Router} from '@angular/router';

//Estructura con los datos para mostrar targetas con los anuncios.
import { cardAnuncio_get } from '../../clases/Anuncios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  //Arreglo para guardar los anuncios.
  anuncios: cardAnuncio_get[] = [];

  constructor(
    //Declaracion del servicio de anuncios.
    private anunciosService: AnunciosService,
    //Declaracion del servicio de Inicio de sesión
    private loginService: LoginService,
    private router: Router,
  ) {
    // Se realiza una petición al cargar la página para cargar imágenes primero.
    this.anunciosService.getcardAnuncios().subscribe(anuncios => {
      // Se realiza un recorrido al arreglo de anuncios.
      this.anuncios = anuncios.map(anuncio => {
        // Asignacion de la Url completa al objeto de un anuncio.
        anuncio.direccion_imagen = anuncio ? `http://localhost:4000${anuncio.direccion_imagen}` : '';
        return anuncio;
      });
    });

    //Se Realiza una petición al cargar los datos de los anuncios y se relaciona la dirección de la imagen al los datos del anuncio .
    //this.anunciosService.getAnuncios().subscribe(anuncios => {
      //this.anuncios = anuncios.map(anuncio => {
        // Encontrar la imagen correspondiente al anuncio
        //const imagenAnuncio = this.imagenes.find(imagen => imagen.id_anuncio == anuncio.id_anuncio);
    
        // Asignar la dirección de la imagen al anuncio
       //anuncio.direccion_imagen = imagenAnuncio ? `http://localhost:4000${imagenAnuncio.direccion_imagen}` : '';
    
        // Corregir el acceso a las propiedades del objeto anuncio
        //anuncio.titulo = anuncio.titulo;
        //anuncio.descripcion = anuncio.descripcion;
        //anuncio.precio = anuncio.precio;
    
        //return anuncio;
      //});
    //});
  }

  ngOnInit(): void {
    
  }
  

  // Método para redirigir a la página de perfil/anuncio
  verAnuncio(anuncioId: number) {
    this.router.navigate(['/perfil/anuncio', anuncioId]);
  }

  // Evento de clic en "Modo anfitrión"
  modoAnfitrion() {
    this.router.navigate(['/anuncios']);
  }
  //Evento de "Cerrar Sesion"
  cerrar_sesion(){
    this.loginService.logout()
    .then(()=> {
      this.router.navigate(['']);
    })
    .catch(error => console.log(error));
  }
}
