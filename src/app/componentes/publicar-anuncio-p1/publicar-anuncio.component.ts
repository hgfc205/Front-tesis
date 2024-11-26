import { Component, OnInit  } from '@angular/core';
import { AnunciosService } from '../../servicios/anuncios/anuncios.service';
import { LoginService } from '../../servicios/login/login.service';
import { tipoAlojamiento_get,Tipoaljamiento_put } from '../../clases/Anuncios';
import { Router } from '@angular/router';
import { BrowserAnimationsModule,NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AnuncioIncompletos_get,Anuncios_add} from '../../clases/Anuncios';

@Component({
  selector: 'app-publicar-anuncio',
  templateUrl: './publicar-anuncio.component.html',
  styleUrls: ['./publicar-anuncio.component.css']
})
export class PublicarAnuncioComponent {
  // Variable para el progreso (ajusta según tus necesidades)
  progreso: number = 10;

  // Matriz en la que se cargaran todos los tipos de alojamiento existentes para generar las targetas
  tipos_alojamientos: tipoAlojamiento_get[] = [];
  anuncio: AnuncioIncompletos_get[] = [];
  nuevo_anuncio: Anuncios_add[] = [new Anuncios_add()];
  tarjetaSeleccionada: any = null;

  // Matriz que almacenara el nuevo valor para el tipo de alojamiento.
  actualizacion: Tipoaljamiento_put[] = [new Tipoaljamiento_put()];
  id_alojamiento: number | null = null; // Propiedad para almacenar la dirección

  constructor(
    //Declaracion del servicio de anuncios.
    private anunciosService: AnunciosService,
    private loginService: LoginService,
    private router: Router,    
  ){
    //Se Realiza una petición al cargar la pagina para "Optener todos los Anuncios".
    this.anunciosService.getTiposAlojamiento().subscribe(T_alojamiento =>{
      //Guardamos los resultados de la consulta inicial en una matriz.
      this.tipos_alojamientos = T_alojamiento 
    })
  }

  ngOnInit(): void {
    this.buscarAnunciosIncompletos();
  }

  buscarAnunciosIncompletos(): void {
    try {
      //const direccionInput = document.getElementById('direccionInput') as HTMLInputElement;
      //const id_alojamiento = direccionInput.value;

      // Llamado al metodo del servicio que devuelve el usuario logeado.
      this.obtenerIdUsuario().then((id_usuario: string) => {
        // Llamado al método del servicio que devuelve los anuncios incompletos para el usuario.
        this.anunciosService.getAnunciosIncompletos(id_usuario).subscribe(anuncios => {
          console.log('Info del anuncio: ', anuncios);

          // Validación para que el arreglo devuelto contenga datos.
          if (anuncios.length > 0) {
            this.id_alojamiento = anuncios[0].id_alojamiento;
            console.log('Tipo de alojamiento:', this.id_alojamiento);
            // Selecciona automáticamente la tarjeta correspondiente.
            this.seleccionarTarjetaPorId(this.id_alojamiento);

          } else {
            console.log('No hay anuncios incompletos disponibles.');
          }

        });
      });

    } catch (error) {
      console.error('Error al obtener el id_usuario.', error);
    }
  }

  seleccionarTarjetaPorId(id_alojamiento: number | null): void {
    // Encuentra la tarjeta que coincide con el id_alojamiento.
    const tarjetaEncontrada = this.tipos_alojamientos.find(t => t.id_alojamiento === id_alojamiento);
  
    // Selecciona la tarjeta si se encuentra.
    if (tarjetaEncontrada) {
      this.tarjetaSeleccionada = tarjetaEncontrada;
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

  seleccionarTarjeta(tarjeta: any): void {
    if (this.tarjetaSeleccionada === tarjeta) {
      this.tarjetaSeleccionada = null; // Deseleccionar la tarjeta si ya estaba seleccionada
    } else {
      this.tarjetaSeleccionada = tarjeta; // Seleccionar la tarjeta
  
      // Asegúrate de que actualizacion tenga al menos un elemento
      if (!this.actualizacion.length) {
        this.actualizacion.push(new Tipoaljamiento_put());
      }
  
      // Actualizar id_alojamiento con el valor seleccionado
      this.actualizacion[0].id_alojamiento = this.tarjetaSeleccionada.id_alojamiento;
    }
  }
  // Función para ir a la sección anterior
  anterior(): void {
    this.router.navigate(['anuncios']);
  }

  // Función para ir a la sección siguiente
  siguiente(): void {
    // Verifica si se ha seleccionado una tarjeta antes de navegar.
    if (this.tarjetaSeleccionada) {

      //Llamado al metodo del servicio que devuelve el usuario logeado.
      this.obtenerIdUsuario().then((id_usuario: string) => {
        // Obtener anuncios incompletos llamando al metodo que devuelve los datos del anuncio incompleto para determinado usuario.
        this.anunciosService.getAnunciosIncompletos(id_usuario).subscribe(anuncios => 
          {
            console.log('Datos del servicio:', anuncios);
            // Validación para que el arreglo devuelto contenga datos.
            if (anuncios.length > 0) {
              console.log('Actualizando anuncio.')
              this.anuncio = anuncios
              const id_anuncio = this.anuncio[0].id_anuncio
              console.log('Id Anuncio: ',id_anuncio);
              // Realizar operaciones con id_anuncio
              //console.log(id_anuncio)
              
              // Asignación de valores a la constante que contiene los parámetros para actualizar datos en el servidor.
              const anuncioParams = new Tipoaljamiento_put(this.actualizacion[0].id_alojamiento)
              console.log(anuncioParams.id_alojamiento);
              // Manejador de errores para el llamado del servicio que actualiza un anuncio en la dirección.
              this.anunciosService.updateTipoAlojamiento(anuncioParams,id_anuncio).subscribe(() => {
           
              });
    
            } else {
              console.log('Creando nuevo anuncio.')
              // Asignación de valores a la matriz que contiene los parámetros para actualizar datos en el servidor.
              this.nuevo_anuncio[0].id_usuario = id_usuario;
              this.nuevo_anuncio[0].id_alojamiento = this.actualizacion[0].id_alojamiento;

              // Manejador de errores para el llamado del servicio que actualiza un anuncio en la dirección.
              this.anunciosService.addAnuncio(this.nuevo_anuncio[0]).subscribe(() => {
           
              });

            }
            // Navega a la siguiente sección.
            this.router.navigate(['anuncios/publicar/direccion']);
          });
      });

      
    } else {
      // Muestra un mensaje de error o realiza alguna acción si no se ha seleccionado una tarjeta.
      console.error('Por favor, selecciona una tarjeta antes de continuar.');
      // Puedes mostrar un mensaje al usuario o tomar alguna otra acción.
    }
  }

  // Función para calcular el progreso (ajusta según tus necesidades)
  calcularProgreso(): number {
    return this.progreso;
  }
}
