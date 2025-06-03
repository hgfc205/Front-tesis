import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AnunciosService } from 'src/app/servicios/anuncios/anuncios.service';
//import { ChangeDetectorRef } from '@angular/core';

import {  HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';


import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoginService } from '../../servicios/login/login.service';
import { DireccionAnuncio_put, AnuncioIncompletos_get } from '../../clases/Anuncios';

@Component({
  selector: 'app-edit-anuncio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './edit-anuncio.component.html',
  styleUrls: ['./edit-anuncio.component.css']
})
export class EditAnuncioComponent implements AfterViewInit {
  imagenesSeleccionadas: string[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/place?q=25.7608105,-108.9889709&zoom=3&key=AIzaSyAJKhEZG06SRCHgQQiuv1fncdI-FUsj_PE');


  abrirExplorador() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  seleccionarImagenes(event: any) {
    const archivos = event.target.files;

    if (archivos.length > 0) {
      this.imagenesSeleccionadas = []; // Vaciar la lista antes de agregar nuevas imágenes

      for (let i = 0; i < archivos.length; i++) {
        const archivo = archivos[i];
        const lector = new FileReader();

        lector.onload = (e) => {
          if (e.target?.result) {
            this.imagenesSeleccionadas.push(e.target.result as string);
          }
        };

        lector.readAsDataURL(archivo);
      }
    }
  }


/* -------------------------------------------------------------------------------------------------------------------- */

  idAnuncio!: string;
  imagenesGuardadas: string[] = []; // Imágenes ya guardadas en el backend
  
  constructor(
    private route: ActivatedRoute, 
    private anunciosService: AnunciosService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private loginService: LoginService,
    //private cdr: ChangeDetectorRef // <-- este es el que te faltaba
  ) {}


  ngAfterViewInit() {
    this.route.paramMap.subscribe(params => {
      this.idAnuncio = params.get('id') || '';
      if (this.idAnuncio) {
        this.cargarImagenes();
      }
    });
  }

  cargarImagenes() {
    console.log("Se ejecutó this.cargarImagenes() para actualizar la lista.");
    // Aquí va el código que obtiene las imágenes del backend

    const id = Number(this.idAnuncio);
    this.anunciosService.getAnunciosImg(id).subscribe(imagenes => {
      if (imagenes && imagenes.length > 0) {
        this.imagenesGuardadas = imagenes.map(img => 
          `${this.anunciosService.domain}/${img.direccion_imagen}`
        );
        console.log('Imágenes cargadas desde el backend:', this.imagenesGuardadas);
      } else {
        console.warn('No se encontraron imágenes para el anuncio.');
      }
    }, error => {
      console.error('Error al cargar imágenes:', error);
    });
  }
  


  // --------------------------------------------------------------------------------------------------------------------
  // Método para subir las imágenes seleccionadas al backend
  subirImagenes() {
    const archivos: FileList | null = this.fileInput.nativeElement.files;

    if (!archivos || archivos.length === 0) {
      console.warn('No hay imágenes seleccionadas');
      return;
    }

    const peticiones = [];

    for (let i = 0; i < archivos.length; i++) {
      const archivo = archivos[i];
      peticiones.push(this.anunciosService.addImagen(archivo, Number(this.idAnuncio)));
    }

    forkJoin(peticiones).subscribe(
      (_) => {
        // Después de subir todas, volvemos a cargar las imágenes del backend
        this.recargarImagenesDesdeBackend();
        
        // Limpiar selección e input
        this.imagenesSeleccionadas = [];
        this.fileInput.nativeElement.value = '';
      },
      (error) => {
        console.error('Error al subir imágenes:', error);
      }
    );
  }

  // --------------------------------------------------------------------------------------------------------------------
  // Método para obtener las imágenes actuales del anuncio desde el backend
  recargarImagenesDesdeBackend() {
    this.anunciosService.getImagenesPorAnuncio(Number(this.idAnuncio)).subscribe(
      (imagenesDesdeBackend) => {
        this.imagenesGuardadas = imagenesDesdeBackend.map((img: any) => {
          return `${this.anunciosService.domain}/${img.direccion_imagen}`;
        });
        console.log('Imágenes actualizadas desde el backend:', this.imagenesGuardadas);
      },
      (error) => {
        console.error('Error al cargar imágenes desde backend:', error);
      }
    );
  }


  eliminarImagen(imagen: string): void {
    
    console.log(imagen.split('/').pop());

    const Imagen = '/uploads/' + imagen.split('/').pop();
    if (!Imagen) return;

    this.anunciosService.deleteImagen(Imagen).subscribe({
      next: (response) => {
        console.log('Imagen eliminada:', response);

        this.recargarImagenesDesdeBackend(); // recarga las imágenes del backend
      },
      error: (error) => {
        console.error('Error al eliminar la imagen', error);
      }
    });
  }

  // --------------------------------------------------------------------------------------------------------------------
  /*                                        PARTE 2                                          */
  // --------------------------------------------------------------------------------------------------------------------
  limpiarDireccion(): void {
    const direccionInput = document.getElementById('direccionInput') as HTMLInputElement;
    if (direccionInput) {
      direccionInput.value = '';
      console.log('Dirección limpiada');
    }
  }

  buscarDireccion(): void {
    try {
      const direccionInput = document.getElementById('direccionInput') as HTMLInputElement;
      const direccion = direccionInput.value;

      this.anunciosService.searchDireccion(direccion).subscribe(coordenadas =>
      {
        console.log('datos del servicio: ', coordenadas);
        this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/maps/embed/v1/place?q=${coordenadas.latitud},${coordenadas.longitud}&key=AIzaSyAJKhEZG06SRCHgQQiuv1fncdI-FUsj_PE`);
      });
    } catch (error) { 
      console.error('Error al obtener coordenadas.', error);
    }
  }

  anuncio: AnuncioIncompletos_get[] = [];
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