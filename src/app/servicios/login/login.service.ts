import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { firstValueFrom } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, 
  signInWithPopup, GoogleAuthProvider, FacebookAuthProvider,fetchSignInMethodsForEmail} from '@angular/fire/auth';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Usuario_add} from '../../clases/Usuarios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser: User | null = null;
  
  // Definicion de Url o dominio al que se realiza la consulta.
  domain: string = "http://localhost:4000";

  newPerfil: Usuario_add = {
    id_usuario:  "",
  };

  constructor(
    private auth: Auth,
    private http: HttpClient,
    //private firestore: AngularFirestore  
  ){ 
    
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithFacebook() {
    return signInWithPopup(this.auth, new FacebookAuthProvider());
  }

  async register({ email, password }: any) {
    try {
      // Verificar si el correo ya existe antes de registrar
      const signInMethods = await fetchSignInMethodsForEmail(this.auth, email);

      if (signInMethods.length === 0) {
        // El correo no está registrado, proceder con el registro
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
         
        // Comprobación de tipo antes de acceder al UID
        if (userCredential.user?.uid) {
          const uid = userCredential.user.uid;

          //Se asigna el valor de uid al la matriz de nuevo perfil
          this.newPerfil.id_usuario = uid;
          await this.registerPerfil(this.newPerfil);

          // Devolver el UID del usuario registrado
          return uid;
        } else {
          // Manejador de error al no poder obtener el UID.
          throw new Error('Error al obtener UID del usuario registrado.');
        }

      } else {
        // El correo ya está registrado
        throw new Error('El correo ya está registrado.');
      }
    } catch (error) {
      // Manejar errores.
      throw error;
    }
  }
  
  async loginWithGoogle() {
    try {
      // Iniciar sesión con Google
      const response = await signInWithPopup(this.auth, new GoogleAuthProvider());
      const email = response.user?.email || '';
      
      console.log(email);

      // Verificar si el correo ya está registrado.
      const isEmailRegistered = await this.CorreoRegistrado(email);

      // Verificar si el correo NO está registrado
      if (isEmailRegistered) {
        // Creación de variable con el Unique Id del usuario registrado
        const uid: string = response.user?.uid || '';
      
        // Mensaje para informar del registro
        console.log('El correo no está registrado. Procediendo con el registro.');
        // Mensaje que Muestra en consola el UID del nuevo registro
        console.log('Nuevo usuario registrado con Google. UID:', uid);

        //Se asigna el valor de uid al la matriz de nuevo perfil
        this.newPerfil.id_usuario = uid;
        await this.registerPerfil(this.newPerfil);
        
        // Resto del código para el registro
        return(uid);
      } 
      else 
      {
        // El correo ya está registrado, mostrar mensaje de error
        console.log('El correo ya está registrado, no es necesario almacenar en la bd.');
        return response;
      }
    } catch (error) {
      // Manejar errores aquí
      console.error('Error al iniciar sesión con Google:', error);
      throw error;
    }
  }

  private async CorreoRegistrado(email: string) {
    // Verificar si el correo ya está registrado 
    // Por ejemplo, realiza una consulta a tu base de datos para verificar la existencia del correo
    return fetchSignInMethodsForEmail(this.auth, email).then((signInMethods) => {
      return signInMethods.length > 0;
    });
  }


  //Función que os devuelve el numero de usuario que esta en sesion.
  async UidResponse(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
  
      onAuthStateChanged(auth, (user: User | null) => {
        if (user) {
          this.currentUser = user;
          //console.log('Datos del usuario:', this.currentUser);
          console.log('Usuario:',this.currentUser.uid);
          const uid: string = this.currentUser.uid;
          resolve(uid);  // Resolvemos la promesa con el UID cuando el usuario está autenticado
        } else {
          this.currentUser = null;
          console.error('No hay sesión iniciada.');
          reject(new Error('No hay sesión iniciada.'));  // Rechazamos la promesa cuando el usuario no está autenticado
        }
      }, (error) => {
        console.error('Error en la autenticación:', error.message);
        reject(error);  // Rechazamos la promesa en caso de error
      });
    });
  }

  // Guarda el número de usuario o "UID" de firebase en la Bd del servidor.
  async registerPerfil(nuevo_perfil: Usuario_add) {
    try {
      const response = await firstValueFrom(this.http.post(`${this.domain}/registrar`, nuevo_perfil));
      // Mensaje de exito en consola.
      console.log('Número de usuario registrado con éxito:', response);
    } catch (error) {
      // Manejar errores aquí
      console.error('Error al registrar número de usuario en el servidor:', error);
      throw error;
    }
  }

  logout() {
    return signOut(this.auth);
  }

}
