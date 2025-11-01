import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../../../core/services/api.service'

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface TokenResponse {
  token: string;
  type: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private api: ApiService) {}

  login(credentials: LoginRequest): Observable<TokenResponse> {
    return this.api.post<TokenResponse>('/auth/login', credentials).pipe(
      tap((res) => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
