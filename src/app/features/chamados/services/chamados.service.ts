import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

export interface Chamado {
  id: number;
  titulo: string;
  descricao: string;
  status: string;
  dataCriacao?: string;
  ultimaAtualizacao?: string;
  clienteNome?: string;
  tecnicoNome?: string;
  adminNome?: string;
}

@Injectable({ providedIn: 'root' })
export class ChamadosService {
  private readonly apiUrl = '/chamados';

  constructor(private api: ApiService) {}

  listar(): Observable<Chamado[]> {
    return this.api.get<Chamado[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Chamado> {
    return this.api.get<Chamado>(`${this.apiUrl}/${id}`);
  }

  criar(chamado: { titulo: string; descricao: string }): Observable<Chamado> {
    return this.api.post<Chamado>(this.apiUrl, chamado);
  }

  atualizar(id: number, chamado: Partial<Chamado>): Observable<Chamado> {
    return this.api.put<Chamado>(`${this.apiUrl}/${id}`, chamado);
  }

  excluir(id: number): Observable<void> {
    return this.api.delete<void>(`${this.apiUrl}/${id}`);
  }
}
