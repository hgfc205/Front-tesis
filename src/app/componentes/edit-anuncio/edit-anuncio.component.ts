import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router'; // Para leer el ID de la URL
import { AnunciosService } from 'src/app/servicios/anuncios/anuncios.service';

@Component({
  selector: 'app-edit-anuncio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-anuncio.component.html',
  styleUrls: ['./edit-anuncio.component.css']
})

export class EditAnuncioComponent implements AfterViewInit {

  idAnuncio!: string; // Aquí se guardará el ID del anuncio
  imagenesSeleccionadas: string[] = [];









  constructor(private route: ActivatedRoute, private anunciosService: AnunciosService) {}







  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() 
  {
    // Obtener el ID de la URL
    this.route.paramMap.subscribe(params => {
      this.idAnuncio = params.get('id') || ''; // Si no hay ID, se deja vacío
      if (this.idAnuncio) {
        this.cargarImagenes();
      }
    });

  }

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


  cargarImagenes() {
    // Llamar al servicio para obtener las imágenes del anuncio
    const id = Number(this.idAnuncio); // Convertir a número
    this.anunciosService.getAnunciosImg(id).subscribe(imagenes => {
      // Extraer solo las URLs (direccion_imagen) y asignarlas a imagenesSeleccionadas
      this.imagenesSeleccionadas = imagenes.map(img => img.direccion_imagen);
    });
  }
  



}
