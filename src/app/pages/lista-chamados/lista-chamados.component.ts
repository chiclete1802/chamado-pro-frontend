import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChamadosService, Chamado } from '../../services/chamados.service';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-lista-chamados',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './lista-chamados.component.html',
  styleUrls: ['./lista-chamados.style.css']
})

export class ListaChamadosComponent implements OnInit {
  tickets: Chamado[] = [];

  constructor(private router: Router, private chamados: ChamadosService) { }

  ngOnInit() {
    this.chamados.listar().subscribe(data => this.tickets = data);
  }

  open(id: string) { this.router.navigate(['/detalhe', id]); }
  novo() { this.router.navigate(['/novo']); }

  statusClass(s: string) {
    switch (s.toUpperCase()) {
      case 'ABERTO': return 'status ABERTO';
      case 'PENDENTE': return 'status PENDENTE';
      case 'EM ANDAMENTO': return 'status EM_ANDAMENTO';
      case 'FINALIZADO': return 'status FINALIZADO';
      default: return 'status ABERTO';
    }
  }
}
