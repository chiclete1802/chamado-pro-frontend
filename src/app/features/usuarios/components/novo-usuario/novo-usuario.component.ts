import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-novo-usuario',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.style.css']
})
export class NovoUsuarioComponent {
  nome = '';
  email = '';
  tipoUsuario = 'CLIENTE';
  senha = '';
  sucesso = false;

  constructor(private usuariosService: UsuariosService, private router: Router) {}

  criar() {
    this.usuariosService.criar({ nome: this.nome, email: this.email, senha: this.senha, tipoUsuario: this.tipoUsuario }).subscribe(() => {
      this.sucesso = true;
      setTimeout(() => this.router.navigate(['/usuarios']), 1000);
    });
  }
}
