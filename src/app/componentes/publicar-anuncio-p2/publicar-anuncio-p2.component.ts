import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnunciosService } from '../../servicios/anuncios/anuncios.service';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
//import { Loader } from "@googlemaps/js-api-loader";
//import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
//import { FormControl, FormGroup } from '@angular/forms';
import { DireccionAnuncio_put,AnuncioIncompletos_get } from '../../clases/Anuncios';
import { LoginService } from '../../servicios/login/login.service';

@Component({
  selector: 'app-publicar-anuncio-p2',
  templateUrl: './publicar-anuncio-p2.component.html',
  styleUrls: ['./publicar-anuncio-p2.component.css'],
})
export class PublicarAnuncioP2Component {
  @ViewChild('direccionInput') direccionInput: ElementRef | undefined; // Referencia al elemento de entrada
  direccion: string = ''; // Propiedad para almacenar la dirección

  //Direccion predeterminada en el mapa.
  mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/place?q=25.7608105,-108.9889709&zoom=3&key=AIzaSyAJKhEZG06SRCHgQQiuv1fncdI-FUsj_PE');

  // Variable para el progreso (ajusta según tus necesidades)
  progreso: number = 30;
  anuncio: AnuncioIncompletos_get[] = [];


  constructor(
    private anunciosService: AnunciosService,
    private loginService: LoginService,
    private router: Router,
    httpClient: HttpClient,
    private sanitizer: DomSanitizer
  ){
    
  }
  
  ngOnInit(): void {
    this.buscarAnunciosIncompletos();
  }

  buscarAnunciosIncompletos(): void {
    try {
      const direccionInput = document.getElementById('direccionInput') as HTMLInputElement;
      const direccion = direccionInput.value;

      // Llamado al metodo del servicio que devuelve el usuario logeado.
      this.obtenerIdUsuario().then((id_usuario: string) => {
        // Llamado al método del servicio que devuelve los anuncios incompletos para el usuario.
        this.anunciosService.getAnunciosIncompletos(id_usuario).subscribe(anuncios => {
          console.log('Info del anuncio: ', anuncios);

          // Validación para que el arreglo devuelto contenga datos.
          if (anuncios.length > 0) {
            this.direccion = anuncios[0].direccion;
            console.log('Dirección del anuncio:', this.direccion);

            // Actualiza el valor del input usando la referencia obtenida con @ViewChild
            if (this.direccionInput) {
              this.direccionInput.nativeElement.value = this.direccion;
            }
          } else {
            console.log('No hay anuncios incompletos disponibles.');
          }

        });
      });

    } catch (error) {
      console.error('Error al obtener el id_usuario.', error);
    }
  }

  async obtenerIdUsuario(): Promise<string> {
    try {
      return await this.loginService.UidResponse() ?? '';
    } catch (error) {
      console.error('Error al obtener el id_usuario.', error);
      return ''; // Puedes manejar el error según tus necesidades.
    }
  }

  // Función para guardar la dirección al hacer clic en el botón
  guardarDireccion() {
    // Obtener el valor del input por su ID
      const direccionInput =  document.getElementById('direccionInput') as HTMLInputElement;
      const direccion = direccionInput.value ;
    // Imprimir la dirección en la consola (puedes hacer lo que quieras con la variable dirección aquí)
    console.log('Dirección guardada:', direccion);
  }
  
  // Función para limpiar la dirección al hacer clic en el botón "Limpiar"
  limpiarDireccion() {
    const direccionInput = document.getElementById('direccionInput') as HTMLInputElement;
    if (direccionInput) {
      direccionInput.value = '';
      console.log('Dirección limpiada');
    }
  }

  // Función para ir a la sección anterior
  anterior(): void {
    this.router.navigate(['anuncios/publicar/alojamieto']);
  }

  // Función para ir a la sección siguiente
  siguiente(): void {
    this.router.navigate(['anuncios/publicar/detalles']);
  }

  // Función para calcular el progreso (ajusta según tus necesidades)
  calcularProgreso(): number {
    return this.progreso;
  }

  // Funcion buscar dirección
  buscarDireccion(): void{
    try 
    {
      const direccionInput = document.getElementById('direccionInput') as HTMLInputElement;
      const direccion = direccionInput.value;

      this.anunciosService. searchDireccion(direccion).subscribe(coordenadas => 
      {
        console.log('Datos del servicio:', coordenadas);
        // Actualiza la URL del mapa con las nuevas coordenadas
         // Actualiza la URL del mapa con las nuevas coordenadas
         this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/maps/embed/v1/place?q=${coordenadas.latitud},${coordenadas.longitud}&key=AIzaSyAJKhEZG06SRCHgQQiuv1fncdI-FUsj_PE`);
      });

    } catch (error) {
      console.error('Error al obtener las coordenadas.', error);
    }
  }

  // Funcion registrar direccion en anuncio
  async registrarDireccion(): Promise<void> {
    try 
    {
      const direccionInput = document.getElementById('direccionInput') as HTMLInputElement;
      const direccion = direccionInput.value;
  
      //Llamado al metodo del servicio que devuelve el usuario logeado.
      const id_usuario = await this.loginService.UidResponse() ?? '';

      // Obtener anuncios incompletos llamando al metodo que devuelve los datos del anuncio incompleto para determinado usuario.
      this.anunciosService.getAnunciosIncompletos(id_usuario).subscribe(anuncios => 
      {
        console.log('Datos del servicio:', anuncios);
        // Validación para que el arreglo devuelto contenga datos.
        if (anuncios.length > 0) {
          this.anuncio = anuncios
          const id_anuncio = this.anuncio[0].id_anuncio
  
          // Realizar operaciones con id_anuncio
          //console.log(id_anuncio)
  
          // Asignación de valores a la constante que contiene los parámetros para actualizar datos en el servidor.
          const anuncioParams = new DireccionAnuncio_put(id_anuncio, id_usuario, direccion)

          // Manejador de errores para el llamado del servicio que actualiza un anuncio en la dirección.
          this.anunciosService.updateAnuncioDireccion(anuncioParams).subscribe(() => {
           
          });
  
        } else {
          console.log('No hay anuncios disponibles.')
        }
      });
    
    } catch (error) {
      console.error('Error al obtener el id_usuario.', error);
    }
  }


}
