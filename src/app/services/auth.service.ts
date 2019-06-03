import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apiKey = 'AIzaSyDgEdxDwTNcZ5CtnPstbuOqqhlOkQQS3BU';


  // crear nuevo usuario
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]
  //  login
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]

  constructor(private http: HttpClient) { }


  logout() {

  }

  login(usuario: UsuarioModel) {
    const authData = {
      // email: usuario.email,
      // password: usuario.password,
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}/verifyPassword?key=${this.apiKey}`, authData);




  }

  nuevoUsuario( usuario: UsuarioModel) {
    const authData = {
      // email: usuario.email,
      // password: usuario.password,
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}/signupNewUser?key=${this.apiKey}`, authData);

  }
}
