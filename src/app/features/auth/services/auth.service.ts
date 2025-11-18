import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { jwtDecode } from 'jwt-decode';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface TokenResponse {
  token: string;
  type: string;
}

export interface DecodedToken {
  sub: string;
  role: string;
  exp: number;
  iat: number;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private api: ApiService) {}

  login(credentials: LoginRequest): Observable<TokenResponse> {
    return this.api.post<TokenResponse>('/auth/login', credentials).pipe(
      tap((res) => localStorage.setItem(this.TOKEN_KEY, res.token))
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

  getUserData(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<DecodedToken>(token);
    } catch (e) {
      console.error('Erro ao decodificar JWT:', e);
      return null;
    }
  }

  getUserRole(): string | null {
    return this.getUserData()?.role ?? null;
  }

  getUserEmail(): string | null {
    return this.getUserData()?.sub ?? null;
  }
}
