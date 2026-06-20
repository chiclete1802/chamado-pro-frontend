import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

export interface Notificacao {
  id: number;
  chamadoId?: number;
  chamadoTitulo?: string;
  mensagem: string;
  canal: string;
  status: string;
  lida: boolean;
  dataEnvio: string;
}

@Injectable({ providedIn: 'root' })
export class NotificacoesService {
  private readonly apiUrl = '/notificacoes';

  constructor(private api: ApiService) {}

  listar(): Observable<Notificacao[]> {
    return this.api.get<Notificacao[]>(this.apiUrl);
  }

  contarNaoLidas(): Observable<number> {
    return this.api.get<number>(`${this.apiUrl}/nao-lidas`);
  }

  marcarComoLida(id: number): Observable<void> {
    return this.api.put<void>(`${this.apiUrl}/${id}/lida`, {});
  }
}
