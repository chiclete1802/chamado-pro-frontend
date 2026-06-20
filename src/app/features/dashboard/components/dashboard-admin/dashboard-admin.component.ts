import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass, DecimalPipe } from '@angular/common';
import { DashboardService, DashboardData } from '../../services/dashboard.service';
import { PRIORIDADE_LABELS, NIVEL_LABELS, STATUS_SLA_LABELS } from '../../../../shared/chamado-labels';

interface BarItem {
  key: string;
  label: string;
  value: number;
  pct: number;
}

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, DecimalPipe],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.style.css']
})
export class DashboardAdminComponent implements OnInit {

  dados?: DashboardData;
  erro = false;

  slaItems: BarItem[] = [];
  prioridadeItems: BarItem[] = [];
  categoriaItems: BarItem[] = [];
  nivelItems: BarItem[] = [];
  tecnicoItems: BarItem[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.obterDadosAdmin().subscribe({
      next: (data) => {
        this.dados = data;
        this.montarGraficos(data);
      },
      error: (err) => {
        console.error('Erro ao carregar dashboard', err);
        this.erro = true;
      }
    });
  }

  private montarGraficos(data: DashboardData) {
    this.slaItems = this.toBarItems(
      {
        NO_PRAZO: data.slaNoPrazo,
        EM_RISCO: data.slaEmRisco,
        ESTOURADO: data.slaEstourado,
        CUMPRIDO: data.slaCumprido,
      },
      STATUS_SLA_LABELS
    );

    this.prioridadeItems = this.toBarItems(
      {
        BAIXA: data.chamadosPorPrioridade?.['BAIXA'] ?? 0,
        MEDIA: data.chamadosPorPrioridade?.['MEDIA'] ?? 0,
        ALTA: data.chamadosPorPrioridade?.['ALTA'] ?? 0,
        CRITICA: data.chamadosPorPrioridade?.['CRITICA'] ?? 0,
      },
      PRIORIDADE_LABELS
    );

    this.categoriaItems = this.toBarItems(data.chamadosPorCategoria ?? {});

    this.nivelItems = this.toBarItems(
      {
        N1: data.chamadosPorNivel?.['N1'] ?? 0,
        N2: data.chamadosPorNivel?.['N2'] ?? 0,
        N3: data.chamadosPorNivel?.['N3'] ?? 0,
      },
      NIVEL_LABELS
    );

    this.tecnicoItems = this.toBarItems(data.chamadosPorTecnico ?? {});
  }

  private toBarItems(map: Record<string, number>, labels?: Record<string, string>): BarItem[] {
    const entries = Object.entries(map ?? {});
    const max = Math.max(1, ...entries.map(([, v]) => v));
    return entries.map(([key, value]) => ({
      key,
      label: labels?.[key] ?? key,
      value,
      pct: (value / max) * 100,
    }));
  }
}
