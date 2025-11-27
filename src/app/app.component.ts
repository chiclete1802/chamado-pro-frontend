import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from '../app/features/auth/services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass, NgIf],
  template: `
  <div *ngIf="!isLoginPage" class="app">
    <aside class="sidebar">
      <div>
        <h2>Menu</h2>
        <nav class="nav-menu">
          <!-- ADMIN: Chamados -->
          <a *ngIf="isAdmin" routerLink="/chamados" class="nav-link" routerLinkActive="active">
            <div class="icon-box">
              <i class="fa-solid fa-ticket"></i>
            </div>
            <span>Chamados</span>
          </a>

          <!-- CLIENTE: Meus Chamados -->
          <a *ngIf="isCliente || isTecnico" routerLink="/meus-chamados" class="nav-link" routerLinkActive="active">
            <div class="icon-box">
              <i class="fa-solid fa-ticket"></i>
            </div>
            <span>Meus Chamados</span>
          </a>

          <!-- TÉCNICO: Chamados Pendentes -->
          <a *ngIf="isTecnico" routerLink="/chamados-pendentes" class="nav-link" routerLinkActive="active">
            <div class="icon-box">
              <i class="fa-solid fa-hourglass-half"></i>
            </div>
            <span>Chamados Pendentes</span>
          </a>

          <!-- ADMIN e CLIENTE: Novo Chamado -->
          <a *ngIf="isAdmin || isCliente" routerLink="/novo" class="nav-link" routerLinkActive="active">
            <div class="icon-box">
              <i class="fa-solid fa-circle-plus"></i>
            </div>
            <span>Novo Chamado</span>
          </a>

          <!-- ADMIN: Usuários -->
          <a *ngIf="isAdmin" routerLink="/usuarios" class="nav-link" routerLinkActive="active">
            <div class="icon-box">
              <i class="fa-solid fa-users"></i>
            </div>
            <span>Usuários</span>
          </a>
        </nav>
      </div>

      <button class="btn btn-outline" (click)="logout()">Sair</button>
    </aside>

    <div style="flex:1;display:flex;flex-direction:column;">
      <header class="header">
        <div style="display:flex;align-items:center;gap:12px">
          <strong>{{ pageTitle }}</strong>
        </div>
        <h3>
          <a routerLink="/" style="text-decoration: none; display: flex; justify-content: end; height: 100%;">
            <img 
              src="assets/logo-vertical.svg" 
              alt="ChamadoPro" 
              style="width: 50%; vertical-align: middle; padding: 0.5vh"
            />
          </a>
        </h3>
      </header>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  </div>

  <router-outlet *ngIf="isLoginPage"></router-outlet>
  `
})
export class AppComponent {
  pageTitle = 'Meus Chamados';
  isLoginPage = false;
  isAdmin = false;
  isCliente = false;
  isTecnico = false;

  constructor(private router: Router, private auth: AuthService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isLoginPage = event.urlAfterRedirects.includes('/login');
        this.updateRole();
        this.updateTitle(event.urlAfterRedirects);
      });
  }

  private updateRole() {
    const token = this.auth.getToken();
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);
      const role = decoded.role;
      this.isAdmin = role === 'ADMIN';
      this.isCliente = role === 'CLIENTE';
      this.isTecnico = role === 'TECNICO';
    } catch (e) {
      console.warn('Erro ao decodificar token', e);
      this.isAdmin = false;
      this.isCliente = false;
      this.isTecnico = false;
    }
  }

  private updateTitle(url: string) {
    if (url.includes('/novo')) {
      this.pageTitle = 'Novo Chamado';
    } else if (url.includes('/usuarios')) {
      this.pageTitle = 'Usuários';
    } else if (url.includes('/chamados-pendentes')) {
      this.pageTitle = 'Chamados Pendentes';
    } else if (url.includes('/chamados')) {
      this.pageTitle = 'Chamados';
    } else {
      this.pageTitle = 'Meus Chamados';
    }
  }

  logout() {
    this.auth.logout();
    location.reload();
  }
}
