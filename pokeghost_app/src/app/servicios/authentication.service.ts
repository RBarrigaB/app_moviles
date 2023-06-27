import { Injectable } from '@angular/core';
import SessionUser from '../interfaces/sessionUser.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private authfirebase: AngularFireAuth) { }

  async login(sessionUser: SessionUser) {
    let loginCheck: boolean = false;
    await this.authfirebase.signInWithEmailAndPassword(sessionUser.correoUsuario,sessionUser.clave).then(log => {
      loginCheck = true;
    }).catch(error => {
      console.log(error)
      loginCheck = false;
    })
    return loginCheck;
  }

  async crearSessionUser(sessionUser: SessionUser) {
    try {
      return await this.authfirebase.createUserWithEmailAndPassword(sessionUser.correoUsuario,sessionUser.clave);
    } catch(error) {
      return console.log(error);
    }
  }

  authenticationState() {
    return this.authfirebase.authState;
  }

  async logout() {
    await this.authfirebase.signOut()
  }
}