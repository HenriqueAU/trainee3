import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Usuario } from './model/usuario';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{

  usuario: Usuario = {
    primeiroNomeUsuario: '',
    sobrenomeUsuario: '',
    email: '',
    senha: '',
    estadoCivilUsuario: 'Vazio',
    maiorDeIdade: false,
    dataAdmissao: '',
    enderecoUsuario: {
      cidadeUsuario: '',
      ruaUsuario: '',
      cepUsuario: '',
    }
  }

  ngOnInit(){
    console.log(this.usuario)
  }

  onSubmit(meuForm: NgForm) {
    console.log(this.usuario);
  }
}

