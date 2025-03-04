import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})

export class PerfilUsuarioComponent {
  modoEdicion: boolean = false;
  mostrarMensaje: boolean = false;

  nombres: string = "";
  apellidoPaterno: string = "";
  apellidoMaterno: string = "";
  nacionalidad: string = "";
  guardarPerfil() {
    // Lógica para guardar el perfil

    // Cambia al modo de visualización después de guardar
    this.modoEdicion = false;

    // Muestra el mensaje de éxito
    this.mostrarMensaje = true;

    // Limpia el mensaje después de unos segundos (opcional)
    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 3000); // Oculta el mensaje después de 3 segundos (ajusta según tus necesidades)
}
}
