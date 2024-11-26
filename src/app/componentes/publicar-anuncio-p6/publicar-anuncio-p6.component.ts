import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AnunciosService } from '../../servicios/anuncios/anuncios.service';
import { Router } from '@angular/router'
import { LoginService } from '../../servicios/login/login.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Fecha_put,AnuncioIncompletos_get } from '../../clases/Anuncios';

@Component({
  selector: 'app-publicar-anuncio-p6',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './publicar-anuncio-p6.component.html',
  styleUrl: './publicar-anuncio-p6.component.css'
})
export class PublicarAnuncioP6Component {
// Variable para el progreso (ajusta según tus necesidades)
progreso: number = 80;
@Input() startDate!: string; // Variable para almacenar la fecha de inicio
@Input() endDate!: string; // Variable para almacenar la fecha de fin
anuncio: AnuncioIncompletos_get[] = [];
Fechas: Fecha_put[];

constructor(
  private anunciosService: AnunciosService,
  private router: Router,
  private loginService: LoginService,
  httpClient: HttpClient,
  private sanitizer: DomSanitizer,
){
  this.Fechas = []; // Inicializa la propiedad en el constructor
}


ngOnInit(): void {
  //this.buscarAnunciosIncompletos();
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
          
          if (this.Fechas && this.Fechas[0]) {
            //this.Fechas[0].fecha_inicio = anuncios[0].fecha_inicio;
            //this.Fechas[0].fecha_fin = anuncios[0].fecha_fin;
            

            console.log('Fecha Inicio:', this.Fechas[0].fecha_inicio,' Fecha Fin: ',this.Fechas[0].fecha_fin);
            // Asigna automáticamente los valores que ya estaban registrados antes..
            
            // Asignación a los inputs
            const cajaTexto1Element = document.getElementById("cajaTexto1") as HTMLInputElement | null;
            const cajaTexto2Element = document.getElementById("cajaTexto2") as HTMLInputElement | null;
            const cajaTexto3Element = document.getElementById("cajaTexto3") as HTMLInputElement | null;

            //if (cajaTexto1Element) {
              //cajaTexto1Element.value = this.Fechas[0].num_habitaciones.toString();
            //}

            //if (cajaTexto2Element) {
              //cajaTexto2Element.value = this.Fechas[0].num_camas.toString();
            //}

            //if (cajaTexto3Element) {
              //cajaTexto3Element.value = this.Fechas[0].num_banos.toString();
            //}
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

// Funcion pque llamada al servicio que optiene el id_del usuario.
async obtenerIdUsuario(): Promise<string> {
  try {
    return await this.loginService.UidResponse() ?? '';
  } catch (error) {
    console.error('Error al obtener el id_usuario.', error);
    return ''; 
  }
}

ngOnChanges(changes: SimpleChanges) {
  if (changes['startDate']) {
    console.log('Fecha de Inicio:', this['startDate']);
  }
  if (changes['endDate']) {
    console.log('Fecha de Fin:', this['endDate']);
  }
}
// Función para ir a la sección anterior
anterior(): void {
  this.router.navigate(['anuncios/publicar/descripcion']);
}

// Función para ir a la sección siguiente
siguiente(): void {
  // Guardamos los valores de las cajas de texto en variables
  const fecha_inicioInput = document.getElementById('startDate') as HTMLInputElement;
  const fecha_finInput = document.getElementById('endDate') as HTMLInputElement;
  

  const fecha_inicio = fecha_inicioInput.value.toString();
  const fecha_fin = fecha_finInput.value.toString();
  
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
          const anuncioParams = new Fecha_put( fecha_inicio, fecha_fin)
          console.log(fecha_inicio, fecha_fin);
          // Manejador de errores para el llamado del servicio que actualiza un anuncio en la dirección.
          this.anunciosService.updateFecha(anuncioParams,id_anuncio).subscribe(() => {
       
          });

        } else {
          console.log('No hay anuncios disponibles.')
        }
        // Navega a la siguiente sección.
        this.router.navigate(['anuncios/publicar/imagenes']);
    });
  });

}

// Función para calcular el progreso (ajusta según tus necesidades)
calcularProgreso(): number {
  return this.progreso;
}
}
