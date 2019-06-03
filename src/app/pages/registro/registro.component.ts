import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor( private auth: AuthService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    // this.usuario.email = 'isamed92@gmail.com'
   }

   onSubmit(form: NgForm) {
     if(form.invalid) return;
    //  console.log('Formulario enviado');
    //  console.log(this.usuario);
    //  console.log(form);
    this.auth.nuevoUsuario(this.usuario)
            .subscribe((res)=>{
              console.log(res);
              
            },
            (err)=>{
              console.log(err.error.error.message);
              
            });
     
   }



}
