import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChamadosService, Chamado } from '../../services/chamados.service';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComentariosComponent } from '../../../comentarios/components/comentarios.component';
import { Location } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-detalhe-chamado',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ComentariosComponent],
  templateUrl: './detalhe-chamado.component.html',
  styleUrls: ['./detalhe-chamado.style.css']
})
export class DetalheChamadoComponent implements OnInit {
  chamado?: Chamado;
  chamadoId!: number;
  role: string | null = null;
  tecnicos: { id: number; nome: string }[] = [];
  tecnicoSelecionado: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private chamados: ChamadosService,
    private auth: AuthService,
    private location: Location
  ) { }

  ngOnInit() {
    this.role = this.auth.getUserRole();
    this.tecnicos = [
      { id: 1, nome: 'Carlos' },
      { id: 2, nome: 'Fernanda' },
      { id: 3, nome: 'João' }
    ];

    this.chamadoId = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarChamado();
  }

  carregarChamado() {
    this.chamados.buscarPorId(this.chamadoId).subscribe({
      next: data => this.chamado = data,
      error: err => console.error('Erro ao carregar chamado', err)
    });
  }

  atribuirTecnico() {
    if (!this.tecnicoSelecionado) {
      alert("Selecione um técnico!");
      return;
    }

    const tecnicoNome = this.tecnicos.find(t => t.id === this.tecnicoSelecionado)?.nome;

    this.chamados.atribuirTecnico(
      this.chamadoId,
      this.tecnicoSelecionado,
      { tecnicoNome }
    ).subscribe({
      next: res => {
        this.chamado = res;
        alert("Técnico atribuído com sucesso!");
      },
      error: err => console.error("Erro ao atribuir técnico", err)
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
