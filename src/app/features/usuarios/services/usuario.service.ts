import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  dataCriacao?: string;
}

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private readonly apiUrl = '/usuarios';

  constructor(private api: ApiService) {}

  listar(): Observable<Usuario[]> {
    return this.api.get<Usuario[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Usuario> {
    return this.api.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  criar(usuario: { nome: string; email: string; tipo: string }): Observable<Usuario> {
    return this.api.post<Usuario>(this.apiUrl, usuario);
  }

  atualizar(id: number, usuario: Partial<Usuario>): Observable<Usuario> {
    return this.api.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  excluir(id: number): Observable<void> {
    return this.api.delete<void>(`${this.apiUrl}/${id}`);
  }
}
