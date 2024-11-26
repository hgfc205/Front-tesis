import { Component } from '@angular/core';
import { AnunciosService } from '../../servicios/anuncios/anuncios.service';
import { tipoServicio_get } from '../../clases/Anuncios';
import { Router } from '@angular/router'

@Component({
  selector: 'app-publicar-anuncio-p4',
  templateUrl: './publicar-anuncio-p4.component.html',
  styleUrls: ['./publicar-anuncio-p4.component.css']
})
export class PublicarAnuncioP4Component {
// Variable para el progreso (ajusta según tus necesidades)
progreso: number = 50;

tipos_servicio: tipoServicio_get[] = [];
tarjetasSeleccionadas: tipoServicio_get[] = [];
serviciosPorCategoria: {[key: string]: tipoServicio_get[]} = {};
tarjetaSeleccionada: any = null;

constructor(
  private anunciosService: AnunciosService,
  private router: Router,
){
  this.anunciosService.getTiposServicios().subscribe(T_servicio =>{
    this.tipos_servicio = T_servicio;
    this.organizarPorCategoria();
  });
}

organizarPorCategoria(): void {
  this.serviciosPorCategoria = {
    'Básico': [],
    'Entretenimiento': [],
    'Seguridad': []
  };

  this.tipos_servicio.forEach(servicio => {
    this.serviciosPorCategoria[servicio.categoria].push(servicio);
  });
}

ngOnInit(): void {
  
}

seleccionarTarjeta(tarjeta: tipoServicio_get): void {
  const index = this.tarjetasSeleccionadas.indexOf(tarjeta);

  if (index === -1) {
    // Si la tarjeta no está seleccionada, agrégala a la lista
    this.tarjetasSeleccionadas.push(tarjeta);
  } else {
    // Si la tarjeta ya está seleccionada, quítala de la lista
    this.tarjetasSeleccionadas.splice(index, 1);
  }
}

// Función para ir a la sección anterior
anterior(): void {
  this.router.navigate(['anuncios/publicar/detalles']);
}

// Función para ir a la sección siguiente
siguiente(): void {
  this.router.navigate(['anuncios/publicar/descripcion']);
  
}

// Función para calcular el progreso (ajusta según tus necesidades)
calcularProgreso(): number {
  return this.progreso;
}
}
