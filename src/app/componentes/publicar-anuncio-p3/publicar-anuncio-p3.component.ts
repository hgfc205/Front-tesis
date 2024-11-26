import { Component } from '@angular/core';
import { AnunciosService } from '../../servicios/anuncios/anuncios.service';
import { Router } from '@angular/router'
import { LoginService } from '../../servicios/login/login.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Cantidades_put,AnuncioIncompletos_get } from '../../clases/Anuncios';

@Component({
  selector: 'app-publicar-anuncio-p3',
  templateUrl: './publicar-anuncio-p3.component.html',
  styleUrls: ['./publicar-anuncio-p3.component.css']
})
export class PublicarAnuncioP3Component {
 // Variable para el progreso (ajusta según tus necesidades)
 progreso: number = 40;
 anuncio: AnuncioIncompletos_get[] = [];
 Cantidad: Cantidades_put[];

 constructor(
   private anunciosService: AnunciosService,
   private router: Router,
   private loginService: LoginService,
   httpClient: HttpClient,
   private sanitizer: DomSanitizer,
 ){
    this.Cantidad = []; // Inicializa la propiedad en el constructor
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
              this.Cantidad[0].num_habitaciones = anuncios[0].num_habitaciones;
              this.Cantidad[0].num_camas = anuncios[0].num_camas;
              this.Cantidad[0].num_banos = anuncios[0].num_banos;

              console.log('Numero habitaciones:', this.Cantidad[0].num_habitaciones,this.Cantidad[0].num_camas,this.Cantidad[0].num_banos);
              // Asigna automáticamente los valores que ya estaban registrados antes..
              // Asignación a los inputs
              console.log(this.Cantidad[0].num_habitaciones, this.Cantidad[0].num_camas,this.Cantidad[0].num_banos);
              // Asignación a los inputs
              const cajaTexto1Element = document.getElementById("cajaTexto1") as HTMLInputElement | null;
              const cajaTexto2Element = document.getElementById("cajaTexto2") as HTMLInputElement | null;
              const cajaTexto3Element = document.getElementById("cajaTexto3") as HTMLInputElement | null;

              if (cajaTexto1Element) {
                cajaTexto1Element.value = this.Cantidad[0].num_habitaciones.toString();
              }

              if (cajaTexto2Element) {
                cajaTexto2Element.value = this.Cantidad[0].num_camas.toString();
              }

              if (cajaTexto3Element) {
                cajaTexto3Element.value = this.Cantidad[0].num_banos.toString();
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

  // Función para aumentar el contenido de la caja de texto.
  aumentarContenido(caja: number) {
    const cajaTexto = document.getElementById(`cajaTexto${caja}`) as HTMLInputElement;
    cajaTexto.value = (parseInt(cajaTexto.value) + 1).toString();
  }

  // Función para dsminuir el contenido de la caja de texto.
  disminuirContenido(caja: number) {
    const cajaTexto = document.getElementById(`cajaTexto${caja}`) as HTMLInputElement;
    if (parseInt(cajaTexto.value) > 0) {
      cajaTexto.value = (parseInt(cajaTexto.value) - 1).toString();
    }
  }

 // Función para ir a la sección anterior
 anterior(): void {
  this.router.navigate(['anuncios/publicar/direccion']);
 }

 // Función para ir a la sección siguiente
 siguiente(): void {
  // Guardamos los valores de las cajas de texto en variables
  const habitacionesInput = document.getElementById('cajaTexto1') as HTMLInputElement;
  const camasInput = document.getElementById('cajaTexto2') as HTMLInputElement;
  const banosInput = document.getElementById('cajaTexto3') as HTMLInputElement;

  const num_habitaciones = parseInt(habitacionesInput.value);
  const num_camas = parseInt(camasInput.value);
  const num_banos = parseInt(banosInput.value);

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
          const anuncioParams = new Cantidades_put( num_habitaciones, num_camas,num_banos)
          console.log(num_habitaciones, num_camas,num_banos);
          // Manejador de errores para el llamado del servicio que actualiza un anuncio en la dirección.
          this.anunciosService.updateCantidades(anuncioParams,id_anuncio).subscribe(() => {
       
          });

        } else {
          console.log('No hay anuncios disponibles.')
        }
        // Navega a la siguiente sección.
        this.router.navigate(['anuncios/publicar/servicios']);
    });
  });
 }

  // Funcion pque llamada al servicio que optiene el id_del usuario.
  async obtenerIdUsuario(): Promise<string> {
    try {
      return await this.loginService.UidResponse() ?? '';
    } catch (error) {
      console.error('Error al obtener el id_usuario.', error);
      return ''; 
    }
  }

 // Función para calcular el progreso (ajusta según tus necesidades)
 calcularProgreso(): number {
   return this.progreso;
 }

}
