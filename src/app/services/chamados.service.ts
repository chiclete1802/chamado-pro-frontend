import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private api = '/chamados';

  constructor(private http: HttpClient) { }

  listar(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(this.api);
  }

  buscarPorId(id: number): Observable<Chamado> {
    return this.http.get<Chamado>(`${this.api}/${id}`);
  }

  criar(chamado: { titulo: string; descricao: string }): Observable<Chamado> {
    return this.http.post<Chamado>(this.api, chamado);
  }

  atualizar(id: number, chamado: Partial<Chamado>): Observable<Chamado> {
    return this.http.put<Chamado>(`${this.api}/${id}`, chamado);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
