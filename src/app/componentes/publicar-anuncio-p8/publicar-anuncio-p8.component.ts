import { Component } from '@angular/core';
import { AnunciosService } from '../../servicios/anuncios/anuncios.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-publicar-anuncio-p8',
  standalone: true,
  imports: [],
  templateUrl: './publicar-anuncio-p8.component.html',
  styleUrl: './publicar-anuncio-p8.component.css'
})
export class PublicarAnuncioP8Component {
// Variable para el progreso (ajusta según tus necesidades)
progreso: number = 100;


constructor(
  private anunciosService: AnunciosService,
  private router: Router,
){

}


ngOnInit(): void {
  
}

// Función para ir a la sección anterior
anterior(): void {
  this.router.navigate(['anuncios/publicar/servicios']);
}

// Función para ir a la sección siguiente
siguiente(): void {
  // Implementa la lógica para avanzar
}

// Función para calcular el progreso (ajusta según tus necesidades)
calcularProgreso(): number {
  return this.progreso;
}
}
