import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apiKey = 'AIzaSyDgEdxDwTNcZ5CtnPstbuOqqhlOkQQS3BU';
  userToken: string;

  // crear nuevo usuario
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]
  //  login
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel) {
    const authData = {
      // email: usuario.email,
      // password: usuario.password,
      ...usuario,
      returnSecureToken: true
    };

    return this.http
      .post(`${this.url}/verifyPassword?key=${this.apiKey}`, authData)
      .pipe(
        map(res => {
          this.guardarToken(res['idToken']);
          return res;
        })
      );
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      // email: usuario.email,
      // password: usuario.password,
      ...usuario,
      returnSecureToken: true
    };

    return this.http
      .post(`${this.url}/signupNewUser?key=${this.apiKey}`, authData)
      .pipe(
        map(res => {
          console.log('entro en el mapa del rxjs');
          this.guardarToken(res['idToken']);
          return res;
        })
      );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());
  }



  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {

    if (this.userToken.length > 2 ){
      return false;
    } 
    const  expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira)
    if( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }
    // return this.userToken.length > 2;
  }
}
