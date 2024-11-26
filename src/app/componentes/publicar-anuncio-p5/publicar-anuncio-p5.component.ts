import { Component } from '@angular/core';
import { AnunciosService } from '../../servicios/anuncios/anuncios.service';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login/login.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {  Descripcion_put,AnuncioIncompletos_get } from '../../clases/Anuncios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-publicar-anuncio-p5',
  templateUrl: './publicar-anuncio-p5.component.html',
  styleUrls: ['./publicar-anuncio-p5.component.css']
})
export class PublicarAnuncioP5Component {
  miFormulario: FormGroup;
  // Variable para el progreso (ajusta según tus necesidades)
  progreso: number = 60;
  anuncio: AnuncioIncompletos_get[] = [];
  Cantidad: Descripcion_put[];


  constructor(
    private anunciosService: AnunciosService,
    private router: Router,
    private loginService: LoginService,
    httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
  ){
    this.Cantidad = []; // Inicializa la propiedad en el constructor
    this.miFormulario = this.formBuilder.group({
      cajaTexto3: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });
  }


  ngOnInit(): void {
    this.buscarAnunciosIncompletos();
  }


  buscarAnunciosIncompletos(): void {
    try {
      // Llamado al metodo del servicio que devuelve el usuario logeado.
      this.obtenerIdUsuario().then((id_usuario: string) => {
        // Llamado al método del servicio que devuelve los anuncios incompletos para el usuario.
        this.anunciosService.getAnunciosIncompletos(id_usuario).subscribe(anuncios => {
          console.log('Info del anuncio: ', anuncios);

          // Validación para que el arreglo devuelto contenga datos.
          if (anuncios.length > 0) {
            //const habitaciones = anuncios[0].num_habitaciones;
            
            if (this.Cantidad && this.Cantidad[0]) {
              this.Cantidad[0].titulo = anuncios[0].titulo;
              this.Cantidad[0].descripcion = anuncios[0].descripcion;
              this.Cantidad[0].precio = anuncios[0].precio;

              console.log('Numero habitaciones:', this.Cantidad[0].titulo,this.Cantidad[0].descripcion,this.Cantidad[0].precio);
              // Asigna automáticamente los valores que ya estaban registrados antes..
              // Asignación a los inputs
              console.log(this.Cantidad[0].titulo,this.Cantidad[0].descripcion,this.Cantidad[0].precio);
              // Asignación a los inputs
              const cajaTexto1Element = document.getElementById("cajaTexto1") as HTMLInputElement | null;
              const cajaTexto2Element = document.getElementById("cajaTexto2") as HTMLInputElement | null;
              const cajaTexto3Element = document.getElementById("cajaTexto3") as HTMLInputElement | null;

              if (cajaTexto1Element) {
                cajaTexto1Element.value =this.Cantidad[0].titulo.toString();
              }

              if (cajaTexto2Element) {
                cajaTexto2Element.value = this.Cantidad[0].descripcion.toString();
              }

              if (cajaTexto3Element) {
                cajaTexto3Element.value = this.Cantidad[0].precio.toString();
              }
            }

          } 
          else {
            console.log('No hay anuncios incompletos disponibles.');
          }

        });
      });
    } catch (error) {
      console.error('Error al obtener el id_usuario.', error);
    }
  }

  // Funcion pque llaama al servicio que optiene el id_del usuario.
  async obtenerIdUsuario(): Promise<string> {
    try {
      return await this.loginService.UidResponse() ?? '';
    } catch (error) {
      console.error('Error al obtener el id_usuario.', error);
      return ''; 
    }
  }


  // Función para ir a la sección anterior
  anterior(): void {
    this.router.navigate(['anuncios/publicar/servicios']);
  }

  // Función para ir a la sección siguiente
  siguiente(): void {
    // Guardamos los valores de las cajas de texto en variables
    const tituloInput = document.getElementById('cajaTexto1') as HTMLInputElement;
    const descripcionInput = document.getElementById('cajaTexto2') as HTMLInputElement;
    const precioInput = document.getElementById('cajaTexto3') as HTMLInputElement;

    const titulo = tituloInput.value;
    const descripcion = descripcionInput.value;
    const precio = parseInt(precioInput.value);

    //Llamado al metodo del servicio que devuelve el usuario logeado.
    this.obtenerIdUsuario().then((id_usuario: string) => {
      // Obtener anuncios incompletos llamando al metodo que devuelve los datos del anuncio incompleto para determinado usuario.
      this.anunciosService.getAnunciosIncompletos(id_usuario).subscribe(anuncios => 
        {
          console.log('Datos del servicio:', anuncios);
          // Validación para que el arreglo devuelto contenga datos.
          if (anuncios.length > 0) {
            this.anuncio = anuncios
            const id_anuncio = this.anuncio[0].id_anuncio
            console.log('Id Anuncio: ',id_anuncio);
            // Realizar operaciones con id_anuncio
            //console.log(id_anuncio)
            
            // Asignación de valores a la constante que contiene los parámetros para actualizar datos en el servidor.
            const anuncioParams = new Descripcion_put(titulo, descripcion,precio)
            console.log(titulo, descripcion,precio);
            // Manejador de errores para el llamado del servicio que actualiza un anuncio en la dirección.
            this.anunciosService.updateDescripcion(anuncioParams,id_anuncio).subscribe(() => {
        
            });

          } else {
            console.log('No hay anuncios disponibles.')
          }
          // Navega a la siguiente sección.
          this.router.navigate(['anuncios/publicar/fechas']);
      });
    });
  }

  // Función para calcular el progreso (ajusta según tus necesidades)
  calcularProgreso(): number {
    return this.progreso;
  }

}
