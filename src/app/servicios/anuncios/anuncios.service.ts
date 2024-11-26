// Servicio que permite realizar consultas al servidor-->Apartado de "Anuncios"
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { catchError, tap} from 'rxjs/operators';
import "rxjs";
import { Observable } from 'rxjs';
//Estructura con los datos para dar de altaun anuncio.
import { Imagen_add,
  Fecha_put,
  Descripcion_put,
  Cantidades_put,
  Tipoaljamiento_put,
  DireccionAnuncio_put, 
  Anuncios_get,
  AnuncioIncompletos_get,
  Anuncios_add,
  cardAnuncio_get,
  tipoAlojamiento_get,
  tipoServicio_get,
  UltimoAnuncio_get, 
  AnuncioImagenes_get,
  AnuncioInfo_get} from '../../clases/Anuncios';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {
  // Definicion de Url o dominio al que se realiza la consulta.
  domain: string = "http://localhost:4000";

  constructor(
    private http: HttpClient
  ) { }

  //----------------------------Metodos para Anuncios del servicio----------------------------------.
  getAnuncio()
  { 
    let id: number | null = null;
    this.http.get(`${this.domain}/anuncios/${id}`)
  }
  
  getAnuncios()
  { 
    return this.http.get<Anuncios_get[]>(`${this.domain}/anuncios`)
    .pipe(
      map(res => res)
    );
  }

  getcardAnuncios()
  { 
    return this.http.get<cardAnuncio_get[]>(`${this.domain}/anuncios`).pipe(
      map(res => res)
    );
  }

  getAnunciosInfo(id: number | null = null)
  { 
    return this.http.get<AnuncioInfo_get[]>(`${this.domain}/anuncios/perfil/${id}`).pipe(
      map(res => res)
    );
  }

  getAnunciosImg(id: number | null = null)
  { 
    return this.http.get<AnuncioImagenes_get[]>(`${this.domain}/anuncios/imagenes/${id}`).pipe(
      map(res => res)
    );
  }
 
  addAnuncio(nuevo_anuncio: Anuncios_add)
  { 
    return this.http.post(`${this.domain}/anuncios/publicar`,nuevo_anuncio)
    .pipe(
      map(res => res)
    );
  }

  updateAnuncio(actualizar_anuncio: Anuncios_get, id: number | null = null)
  { 
    const data = {};
    this.http.put(`${this.domain}/anuncios/${actualizar_anuncio.id_anuncio}`,actualizar_anuncio)
    .pipe(
      map(res => res)
    );
  }
  

  deleteAnuncio(id: number | null = null)
  { 
    return this.http.delete(`${this.domain}/anuncios/${id}`)
    .pipe(
      map(res => res)
    );
  }
  //----------------------------- Metodo para optener el ultimo anuncio del usuario------------------------
  getUltimoAnuncio(id_usuario: string | null = null){
    return this.http.get<UltimoAnuncio_get[]>(`${this.domain}/last/post/${id_usuario}`)
    .pipe(
      map(res => res)
    );
  }
  //-----------------------------Metodo para Tipos de alojamiento-----------------------------------------.
  getTiposAlojamiento()
  { 
    return this.http.get<tipoAlojamiento_get[]>(`${this.domain}/tipo-hospedaje`)
    .pipe(
      map(res => res)
    );
  }

  updateTipoAlojamiento(actualizar_anuncio: Tipoaljamiento_put, id: number | null = null)
  { 
    const data = {};
    return this.http.put(`${this.domain}/anuncios/tipoalojamiento/${id}`,actualizar_anuncio)
    .pipe(
      catchError(error => {
        console.error('Error en la solicitud HTTP:', error);
        throw error; // Propaga el error
      }),
      tap((response: any) => {
        if (response && response.status === 'success') {
          console.log('Anuncio actualizado correctamente');
        } else {
          console.error('Error al actualizar el anuncio. Respuesta del servidor:', response);
        }
      })
    );
  }
  //-----------------------------Metodo para actualiza cantidades-----------------------------------------.

  updateCantidades(actualizar_anuncio: Cantidades_put, id: number | null = null)
  { 
    const data = {};
    return this.http.put(`${this.domain}/anuncios/cantidades/${id}`,actualizar_anuncio)
    .pipe(
      catchError(error => {
        console.error('Error en la solicitud HTTP:', error);
        throw error; // Propaga el error
      }),
      tap((response: any) => {
        if (response && response.status === 'success') {
          console.log('Anuncio actualizado correctamente');
        } else {
          console.error('Error al actualizar el anuncio. Respuesta del servidor:', response);
        }
      })
    );
  }
   //-----------------------------Metodo para actualiza descripcion -----------------------------------------.

   updateDescripcion(actualizar_anuncio: Descripcion_put, id: number | null = null)
   { 
     const data = {};
     return this.http.put(`${this.domain}/anuncios/descripcion/${id}`,actualizar_anuncio)
     .pipe(
       catchError(error => {
         console.error('Error en la solicitud HTTP:', error);
         throw error; // Propaga el error
       }),
       tap((response: any) => {
         if (response && response.status === 'success') {
           console.log('Anuncio actualizado correctamente');
         } else {
           console.error('Error al actualizar el anuncio. Respuesta del servidor:', response);
         }
       })
     );
   }
  //-----------------------------Metodo para actualiza fechas -----------------------------------------.

  updateFecha(actualizar_anuncio: Fecha_put, id: number | null = null)
  { 
    const data = {};
    return this.http.put(`${this.domain}/anuncios/fecha/${id}`,actualizar_anuncio)
    .pipe(
      catchError(error => {
        console.error('Error en la solicitud HTTP:', error);
        throw error; // Propaga el error
      }),
      tap((response: any) => {
        if (response && response.status === 'success') {
          console.log('Anuncio actualizado correctamente');
        } else {
          console.error('Error al actualizar el anuncio. Respuesta del servidor:', response);
        }
      })
    );
  }

  //-----------------------------Metodo para Tipo de Servicios-----------------------------------------.
  getTiposServicios()
  { 
    return this.http.get<tipoServicio_get[]>(`${this.domain}/servicios`)
    .pipe(
      map(res => res)
    );
  }

  //----------------------------- Metodo para obtener id_anuncio de anuncio incompletos de un usuario específico-----------------------------------------.
  getAnunciosIncompletos(id_usuario: string | null = null): Observable<AnuncioIncompletos_get[]> 
  { 
    console.log('Buscando anuncios incompletos para el usuario: ', id_usuario);
    return this.http.get<AnuncioIncompletos_get[]>(`${this.domain}/anuncios/incompletos/${id_usuario}`)
    .pipe(
      catchError(error => {
        console.error('Error en la solicitud HTTP:', error);
        throw error; // Re-lanza el error para que sea manejado por el código de llamada.
      })
    );
  }
  
  //-----------------------------Metodo para actualizar la direccion de un anuncios del usuario logeado-----------------------------------------.
  updateAnuncioDireccion(actualizar_anuncio: DireccionAnuncio_put) { 
    console.log('Actualizando anuncio con los siguientes datos:', actualizar_anuncio);
    
    return this.http.put(`${this.domain}/api/maps`, actualizar_anuncio)
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error
        }),
        tap((response: any) => {
          console.log('Respuesta del servidor:', response);
  
          if (response && response.success === true) {
            console.log('Anuncio actualizado correctamente');
          } else {
            console.error('Error al actualizar el anuncio. Respuesta del servidor:', response);
          }
        })
      );
  }

  //-----------------------------Metodo para subir una imagen.-----------------------------------------.
  addImagen(nuevo_anuncio: File, id_anuncio: number | null = null) { 
     // Crear un objet o FormData
     const formData = new FormData();
     // Agregar el archivo al objeto FormData
     formData.append('imagen', nuevo_anuncio);

    return this.http.post(`${this.domain}/imagen/upload/${id_anuncio}/1`, formData)
      .pipe(
        map((response: any) => {
          console.log('Respuesta del servidor:', response);
          if (response && response.success == true) {
            console.log('Anuncio actualizado correctamente');
            return response; // Devuelve la respuesta si es exitosa
          } else {
            console.error('Error al actualizar el anuncio. Respuesta del servidor:', response);
            throw new Error('Error al actualizar el anuncio'); // Lanza un error si la respuesta no es exitosa
          }
        }),
        catchError(error => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error
        })
      );
  }
  //-----------------------------Metodo para buscar la direccion en el mapa-----------------------------------------.
  searchDireccion(direccion: string | null = null) { 
    
    console.log('Buscando ubicacion:', direccion);

    return this.http.get(`${this.domain}/api/maps/${direccion}`)
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error.
        }),
        tap((response: any) => {
          console.log('Respuesta del servidor:', response);
  
          if (response && response.success === true) {
            console.log('Direccion encontrda');
          } else {
            console.error('Error al buúscar dirección.', response);
          }
        })
      );
  }


}
