import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

export interface DashboardData {
  totalChamados: number;
  chamadosAbertos: number;
  chamadosEmAndamento: number;
  chamadosResolvidos: number;
  chamadosFechados: number;
  chamadosEscalonados: number;
  slaNoPrazo: number;
  slaEmRisco: number;
  slaEstourado: number;
  slaCumprido: number;
  percentualSlaCumprido: number;
  tempoMedioResolucaoHoras: number;
  chamadosPorCategoria: Record<string, number>;
  chamadosPorPrioridade: Record<string, number>;
  chamadosPorNivel: Record<string, number>;
  chamadosPorTecnico: Record<string, number>;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly apiUrl = '/dashboard';

  constructor(private api: ApiService) {}

  obterDadosAdmin(): Observable<DashboardData> {
    return this.api.get<DashboardData>(`${this.apiUrl}/admin`);
  }
}
