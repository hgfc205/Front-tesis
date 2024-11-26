import { Component, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login/login.service';
//import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-pantalla-principal',
  templateUrl: './pantalla-principal.component.html',
  styleUrls: ['./pantalla-principal.component.css'],
})
export class PantallaPrincipalComponent {

  private modalRef!: NgbModalRef;
  formReg_login: FormGroup;

  constructor(
    private modalService: NgbModal,
    private loginService: LoginService,
    private router: Router,
    
  ) {
    this.formReg_login = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  openModal(content: TemplateRef<any>) {
    console.log('Modal abierto');
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  async login_google() {
    try {
      // Utilizar la lógica de loginWithGoogle que ya incluye la verificación de correo
      const response = await this.loginService.loginWithGoogle();
      
      //Variable que almacenara el UID del registro pa tambien crear un nuevo perfil de ususario en la BD.
      const UID = response;

      //Aqui ira la logica para el registro del perfil de usuario
      //                          Esperanding...
      //                          Esperanding...

      //Muestra la respuesta en consola.
      console.log(response);

      
      
      // Cerrar el modal después de iniciar sesión con Google
      this.closeModal();
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error durante el inicio de sesión con Google:', error);
    }
  }

  // Función para manejar el evento de clic en el botón de Iniciar Sesión
  submitSignInForm() 
  {
    const signInForm = document.querySelector("#signin-form") as HTMLFormElement;
    const correo = (signInForm.elements.namedItem("signin-correo") as HTMLInputElement).value;
    const contraseña = (signInForm.elements.namedItem("signin-contraseña") as HTMLInputElement).value;
    console.log(correo, contraseña);

    
     // Almacenamos los datos optenidos del formulario formReg_login utilizando Reactive Forms.
    this.formReg_login.setValue({
      email: correo,
      password: contraseña
    });

    
    this.loginService.login(this.formReg_login.value)
    .then(response => {
      console.log(response);
      // Redirigir a la página de inicio de sesión.
      this.router.navigate(['/home']);
    })
    .catch(error => {
      console.error(error);
    });
    // Cerrar el modal.
    this.closeModal();
  }

  // Nueva función para manejar el evento de clic en el botón de Registrar
  submitSignUpForm() {
    const signUpForm = document.querySelector("#signup-form") as HTMLFormElement;
    const correo = (signUpForm.elements.namedItem("signup-correo") as HTMLInputElement).value;
    const contraseña = (signUpForm.elements.namedItem("signup-contraseña") as HTMLInputElement).value;

    // Lógica de registro de usuarios utilizando Reactive Forms
    this.formReg_login.setValue({
      email: correo,
      password: contraseña
    });

    this.loginService.register(this.formReg_login.value)
    .then(response => {

      //Variable que almacenara el UID del registro pa tambien crear un nuevo perfil de ususario en la BD.
      const UID = response;

      //Aqui ira la logica para el registro del perfil de usuario
      //                          Esperanding...
      //                          Esperanding...

      //Mostrar en consola la respuesta de firebase.
      console.log('Usuario registrado con éxito. UID:',response);
      //this.loginService.registerPerfil(UID);

      // Redirigir a la página de inicio de sesión
      this.router.navigate(['/home']);
    })
      .catch(error => {
      console.error('Error al registrar usuario:',error);
    });

    // Cerrar el modal.
    this.closeModal();
  }

  closeModal() {
    console.log('Modal cerrado');
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}