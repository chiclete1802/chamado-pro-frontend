import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SlaConfigService, SlaConfig } from '../../services/sla-config.service';
import { PRIORIDADE_LABELS, PRIORIDADE_OPCOES } from '../../../../shared/chamado-labels';

interface SlaConfigForm extends SlaConfig {
  salvando?: boolean;
  salvo?: boolean;
}

@Component({
  selector: 'app-sla-config-admin',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule],
  templateUrl: './sla-config-admin.component.html',
  styleUrls: ['./sla-config-admin.style.css']
})
export class SlaConfigAdminComponent implements OnInit {

  configs: SlaConfigForm[] = [];
  prioridadeLabels = PRIORIDADE_LABELS;
  carregando = true;

  constructor(private slaConfigService: SlaConfigService) {}

  ngOnInit() {
    this.slaConfigService.listar().subscribe({
      next: (data) => {
        // Garante que todas as prioridades apareçam, mesmo que o backend
        // ainda não tenha criado a configuração para alguma delas.
        this.configs = PRIORIDADE_OPCOES.map(p => {
          const existente = data.find(c => c.prioridade === p);
          return existente ?? { prioridade: p, tempoRespostaMinutos: 0, tempoResolucaoMinutos: 0 };
        });
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar configuração de SLA', err);
        this.carregando = false;
      }
    });
  }

  salvar(config: SlaConfigForm) {
    config.salvando = true;
    config.salvo = false;

    this.slaConfigService.atualizar(config.prioridade, {
      tempoRespostaMinutos: config.tempoRespostaMinutos,
      tempoResolucaoMinutos: config.tempoResolucaoMinutos
    }).subscribe({
      next: (atualizado) => {
        config.tempoRespostaMinutos = atualizado.tempoRespostaMinutos;
        config.tempoResolucaoMinutos = atualizado.tempoResolucaoMinutos;
        config.salvando = false;
        config.salvo = true;
        setTimeout(() => config.salvo = false, 2000);
      },
      error: (err) => {
        console.error('Erro ao salvar configuração de SLA', err);
        config.salvando = false;
        alert('Erro ao salvar configuração de SLA.');
      }
    });
  }

  /** Converte minutos para uma representação legível em horas. */
  paraHoras(minutos: number): string {
    if (!minutos) return '0h';
    const horas = minutos / 60;
    return horas % 1 === 0 ? `${horas}h` : `${horas.toFixed(1)}h`;
  }
}
