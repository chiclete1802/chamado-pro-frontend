import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChamadosService, Chamado } from '../../services/chamados.service';
import { NgIf } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalhe-chamado',
  standalone: true,
  imports: [NgIf],
  templateUrl: './detalhe-chamado.component.html',
  styleUrls: ['./detalhe-chamado.style.css']
})

export class DetalheChamadoComponent implements OnInit {
  chamado?: Chamado;
  chamadoId!: number;

  constructor(
    private route: ActivatedRoute,
    private chamados: ChamadosService,
    private location: Location
  ) {}

  ngOnInit() {
    this.chamadoId = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarChamado();
  }

  carregarChamado() {
    this.chamados.buscarPorId(this.chamadoId).subscribe({
      next: data => this.chamado = data,
      error: err => console.error('Erro ao carregar chamado', err)
    });
  }

  editar() {
    if (!this.chamado) return;
    const titulo = prompt('Editar título', this.chamado.titulo);
    const descricao = prompt('Editar descrição', this.chamado.descricao);

    if (titulo !== null && descricao !== null) {
      this.chamados.atualizar(this.chamadoId, { titulo, descricao }).subscribe({
        next: updated => {
          this.chamado = updated;
          alert('Chamado atualizado com sucesso!');
        },
        error: err => console.error('Erro ao atualizar chamado', err)
      });
    }
  }

  excluir() {
    if (confirm('Tem certeza que deseja excluir este chamado?')) {
      this.chamados.excluir(this.chamadoId).subscribe({
        next: () => {
          alert('Chamado excluído com sucesso!');
          this.location.back();
        },
        error: err => console.error('Erro ao excluir chamado', err)
      });
    }
  }

  formatarData(data?: string): string {
    if (!data) return '---';
    const d = new Date(data);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
