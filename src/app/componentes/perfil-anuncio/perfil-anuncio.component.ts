import { Component,OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoginService } from '../../servicios/login/login.service';
import { AnunciosService } from '../../servicios/anuncios/anuncios.service';
import { Router, ActivatedRoute, Routes } from '@angular/router';
//Estructura con los datos para mostrar targetas con los anuncios.
import { AnuncioInfo_get,AnuncioImagenes_get } from '../../clases/Anuncios';
@Component({
  selector: 'app-perfil-anuncio',
  templateUrl: './perfil-anuncio.component.html',
  styleUrl: './perfil-anuncio.component.css'

})
export class PerfilAnuncioComponent {
  anuncioId: number | undefined;
  currentIndex: number = 0;
  //Arreglos para guardar Informacion e imagenes de los anuncios.
  anuncios_Info: AnuncioInfo_get[] = [];
  anuncios_Img: AnuncioImagenes_get[] = [];

  //Direccion predeterminada en el mapa.
  mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/place?q=25.7608105,-108.9889709&zoom=3&key=AIzaSyAJKhEZG06SRCHgQQiuv1fncdI-FUsj_PE');

  constructor
  (
    //Declaracion del servicio de anuncios.
    private anunciosService: AnunciosService,
    //Declaracion del servicio de Inicio de sesión
    private loginService: LoginService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ){

    this.router.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.anuncioId = +id; // Convertir el ID a número
        console.log('ID extraído de la ruta:', this.anuncioId);
      }
    });
  }
  
  ngOnInit(): void {
    
     // Se realiza una petición al cargar la página para cargar la informacion del anunci primero.
    this.anunciosService.getAnunciosInfo(this.anuncioId).subscribe(anuncios_Info => {
      this.anuncios_Info = anuncios_Info;
      this.buscarDireccion();
    });

    // Se realiza una petición al cargar la página para cargar las imágenes de segundo.
    this.anunciosService.getAnunciosImg(this.anuncioId).subscribe(anuncios_Img => {
      // Se realiza un recorrido al arreglo de anuncios.
      this.anuncios_Img = anuncios_Img.map(anuncio => {
        // Asignacion de la Url completa al objeto de un anuncio.
        anuncio.direccion_imagen = anuncio ? `http://localhost:4000${anuncio.direccion_imagen}` : '';
        return anuncio;
      });
    });

    console.log('Datos recibidos de anuncios_Info:', this.anuncios_Info);
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextImage() {
    if (this.currentIndex < this.anuncios_Img.length - 1) {
      this.currentIndex++;
    }
  }

  // Funcion buscar dirección
  buscarDireccion(): void{
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/maps/embed/v1/place?q=${this.anuncios_Info[0].latitud},${this.anuncios_Info[0].longitud}&key=AIzaSyAJKhEZG06SRCHgQQiuv1fncdI-FUsj_PE`);
  }

  //Evento de "Cerrar Sesion"
  cerrar_sesion(){
    this.loginService.logout()
    .then(()=> {
      //this.router.navigate(['']);
    })
    .catch(error => console.log(error));
  }

}
