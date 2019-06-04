import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.usuario = new UsuarioModel();
    // this.usuario.email = 'isamed92@gmail.com'
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'espere por favor'
    });

    Swal.showLoading();
    //  console.log('Formulario enviado');
    //  console.log(this.usuario);
    //  console.log(form);
    this.auth.nuevoUsuario(this.usuario).subscribe(
      res => {
        console.log(res);
        Swal.close();
        if(this.recordarme){
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl('/home');
      },
      err => {
        console.log(err.error.error.message);
        Swal.fire({
          type: 'error',
          text: err.error.error.message,
          title: 'error al autenticar'
        });
      }
    );
  }
}
