import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

export interface SlaConfig {
  id?: number;
  prioridade: string;
  tempoRespostaMinutos: number;
  tempoResolucaoMinutos: number;
}

@Injectable({ providedIn: 'root' })
export class SlaConfigService {
  private readonly apiUrl = '/sla-config';

  constructor(private api: ApiService) {}

  listar(): Observable<SlaConfig[]> {
    return this.api.get<SlaConfig[]>(this.apiUrl);
  }

  atualizar(prioridade: string, config: Partial<SlaConfig>): Observable<SlaConfig> {
    return this.api.put<SlaConfig>(`${this.apiUrl}/${prioridade}`, config);
  }
}
