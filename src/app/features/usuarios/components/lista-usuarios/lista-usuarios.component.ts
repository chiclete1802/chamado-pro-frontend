import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService, Usuario } from '../../services/usuario.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [NgFor],
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.style.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private router: Router, private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.usuariosService.listar().subscribe(data => this.usuarios = data);
  }

  novo() {
    this.router.navigate(['/usuarios/novo']);
  }

  editar(id: number) {
    this.router.navigate(['/usuarios/editar', id]);
  }
}
