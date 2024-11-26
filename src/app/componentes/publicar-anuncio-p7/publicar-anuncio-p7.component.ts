import { Component } from '@angular/core';
import { AnunciosService } from '../../servicios/anuncios/anuncios.service';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../servicios/login/login.service';
import { Imagen_add,AnuncioIncompletos_get } from '../../clases/Anuncios';
@Component({
  selector: 'app-publicar-anuncio-p7',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publicar-anuncio-p7.component.html',
  styleUrl: './publicar-anuncio-p7.component.css'
})
export class PublicarAnuncioP7Component {
// Variable para el progreso (ajusta según tus necesidades)
progreso: number = 100;
imageUrl: string | ArrayBuffer | null = null;
public Imagen: Imagen_add[];
anuncio: AnuncioIncompletos_get[] = [];

constructor(
  private anunciosService: AnunciosService,
  private router: Router,
  private loginService: LoginService,
  private route: ActivatedRoute
){
  this.Imagen = []; // Inicializa la propiedad en el constructor
}


ngOnInit(): void {
  
}

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
  }
}

onSubmit() {
  // Aquí puedes implementar la lógica para subir la imagen al servidor
  console.log('Imagen subida');
}

// Función para ir a la sección anterior
anterior(): void {
  this.router.navigate(['anuncios/publicar/fechas']);
}

// Función para ir a la sección siguiente
siguiente(): void {
  // Guardamos los valores de el imput que almacena el archivo.
  const imagenInput = document.getElementById('imagenInput') as HTMLInputElement;
  

  if (imagenInput.files && imagenInput.files.length > 0) {
    // Obténemos el primer archivo seleccionado.
    const archivo = imagenInput.files[0];
     
    //Llamado al metodo del servicio que devuelve el usuario logeado.
  this.obtenerIdUsuario().then((id_usuario: string) => {
      console.log('Usuario:', id_usuario);
      try {
        // Validación para que el arreglo devuelto contenga datos.
        this.anunciosService.getUltimoAnuncio(id_usuario).subscribe(anuncios => {
          const id_anuncio = Number(anuncios[0].id_anuncio);
          console.log('ID del anuncio: ', id_anuncio);
          // Asignación de valores a la constante que contiene los parámetros para actualizar datos en el servidor.
          // Manejador de errores para el llamado del servicio que actualiza un anuncio en la dirección.
          this.anunciosService.addImagen(archivo, id_anuncio).subscribe(() => {
            
          });
        });
        
        // Navega a la siguiente sección.
        // this.router.navigate(['/anuncios']);
      } catch (error) {
        console.error('Error:', error);
      }
  });
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

// Función para calcular el progreso (ajusta según tus necesidades)
calcularProgreso(): number {
  return this.progreso;
}
}
