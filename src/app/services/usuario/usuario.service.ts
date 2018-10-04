import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    this.loadStorage();
  }

  thisLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  loadStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  saveStorage(id: string, token: string, user: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(user));

    this.usuario = this.usuario;
    this.token = token;

  }

  logout() {

    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }

  loginGoogle(idtoken: string) {

    const url = URL_SERVICES + '/google';

    // console.log(idtoken);

    return this.http.post(url, { idtoken }).pipe(map((resp: any) => {
      this.saveStorage(resp.usuario._id, resp.token, resp.usuario);
      return true;
    }));

  }

  login(user: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICES + '/login';

    return this.http.post(url, user)
                    .pipe(map((resp: any) => {
                      this.saveStorage(resp.usuario._id, resp.token, resp.usuario);
                      return true;
                    }));

  }

  crearUsuario(user: Usuario) {

    const url = URL_SERVICES + '/usuario';

    return this.http.post(url, user)
                    .pipe(map((resp: any) => {
                      swal('Usuario creado', user.email, 'success');
                      return resp.user;
                    }));

  }

}
