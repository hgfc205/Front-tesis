import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnunciosService } from '../../../servicios/anuncios/anuncios.service';
import { LoginService } from '../../../servicios/login/login.service';

// Estructuras de datos
import { Anuncios_get,DetalleAnuncio_get } from '../../../clases/Anuncios';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent implements OnInit {
  // Datos de los anuncios del usuario
  userStays: DetalleAnuncio_get[] = [];
  
  // Controlador de carga
  loader = {
    isLoading: false,
    getLoading: () => this.loader.isLoading, // Método para consultar el estado de carga
    setLoading: (status: boolean) => { this.loader.isLoading = status; } // Método para actualizar el estado de carga
  };

  constructor(
    private anunciosService: AnunciosService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener los anuncios del usuario al iniciar el componente
    this.fetchUserStays();
  }

  // Obtener anuncios del usuario
  fetchUserStays() {
    this.loader.setLoading(true); // Mostrar el cargador mientras se cargan los datos

    // Llamado al metodo del servicio que devuelve el usuario logeado.
    this.obtenerIdUsuario().then((id_usuario: string) => {
      this.anunciosService.getDetallePublicaciones(id_usuario) // Método ficticio, ajusta según tu servicio
      .subscribe({
        next: (stays) => {
          this.userStays = stays;
          this.loader.setLoading(false); // Ocultar el cargador
        },
        error: (error) => {
          console.error('Error al cargar los anuncios:', error);
          this.loader.setLoading(false); // Ocultar el cargador aunque falle
        }
      });
    });
  }

  async obtenerIdUsuario(): Promise<string> {
    try {
      return await this.loginService.UidResponse() ?? '';
    } catch (error) {
      console.error('Error al obtener el id_usuario.', error);
      return ''; // Puedes manejar el error según tus necesidades.
    }
  }

  // Evento de clic en "Nuevo anuncio +"
  nuevoAnuncio() {
    this.router.navigate(['anuncios/publicar/alojamieto']);
  }

  // Cerrar sesión
  cerrar_sesion() {
    this.loginService.logout()
      .then(() => {
        this.router.navigate(['']);
      })
      .catch((error) => console.error('Error al cerrar sesión:', error));
  }

  // Obtener el promedio de la calificación
  // getRateAvg(stay: Anuncios_get): number {
    // if (!stay.rates || stay.rates.length === 0) return 0;
    // const sum = stay.rates.reduce((acc, rate) => acc + rate, 0);
    // return sum / stay.rates.length;
  // }
}