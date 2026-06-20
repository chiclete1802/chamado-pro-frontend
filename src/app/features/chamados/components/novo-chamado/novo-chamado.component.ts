import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ChamadosService } from '../../services/chamados.service';
import { AuthService } from '../../../auth/services/auth.service';
import { UsuariosService, Usuario } from '../../../usuarios/services/usuario.service';
import { switchMap } from 'rxjs';
import { PRIORIDADE_LABELS, PRIORIDADE_OPCOES, sugerirPrioridade } from '../../../../shared/chamado-labels';

@Component({
  selector: 'app-novo-chamado',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './novo-chamado.component.html',
  styleUrls: ['./novo-chamado.style.css']
})
export class NovoChamadoComponent {
  model: { titulo?: string; descricao?: string; categoria?: string; prioridade?: string } = {};

  prioridadeLabels = PRIORIDADE_LABELS;
  prioridadeOpcoes = PRIORIDADE_OPCOES;
  prioridadeEditadaManualmente = false;

  constructor(
    private router: Router,
    private chamados: ChamadosService,
    private auth: AuthService,
    private usuariosService: UsuariosService
  ) {}

  /**
   * Quando a categoria muda, sugere automaticamente uma prioridade
   * (caso o usuário ainda não a tenha alterado manualmente).
   */
  onCategoriaChange() {
    if (!this.prioridadeEditadaManualmente) {
      this.model.prioridade = sugerirPrioridade(this.model.categoria);
    }
  }

  onPrioridadeChange() {
    this.prioridadeEditadaManualmente = true;
  }

  enviar() {
    if (!this.model.titulo || !this.model.descricao) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const email = this.auth.getUserEmail();
    if (!email) {
      alert('Usuário não autenticado');
      return;
    }

    this.usuariosService.listar().pipe(
      switchMap((usuarios) => {
        const usuario = usuarios.find(u => u.email === email);
        if (!usuario) throw new Error('Usuário não encontrado');

        const payload = {
          titulo: this.model.titulo!,
          descricao: this.model.descricao!,
          categoria: this.model.categoria,
          prioridade: this.model.prioridade || sugerirPrioridade(this.model.categoria),
          clienteId: usuario.id,
          clienteNome: usuario.nome
        };

        return this.chamados.criar(payload);
      })
    ).subscribe({
      next: () => {
        alert('Chamado criado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erro ao criar chamado', err);
        alert('Erro ao criar chamado: ' + (err.error?.error || err.message));
      }
    });
  }

  voltar() {
    this.router.navigate(['/']);
  }
}
