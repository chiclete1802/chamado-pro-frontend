import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from '../app/features/auth/services/auth.service';

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
        <a routerLink="/" class="nav-link" routerLinkActive="active">
          <div class="icon-box">
            <i class="fa-solid fa-table-cells-large"></i>
          </div>
          <span>Dashboard</span>
        </a>

        <a routerLink="/chamados" class="nav-link" routerLinkActive="active">
          <div class="icon-box">
            <i class="fa-solid fa-ticket"></i>
          </div>
          <span>Chamados</span>
        </a>

        <a routerLink="/meus-chamados" class="nav-link" routerLinkActive="active">
          <div class="icon-box">
            <i class="fa-solid fa-ticket"></i>
          </div>
          <span>Meus Chamados</span>
        </a>

        <a routerLink="/chamados-pendentes" class="nav-link" routerLinkActive="active">
          <div class="icon-box">
          <i class="fa-solid fa-hourglass-half"></i>
          </div>
          <span>Chamados Pendentes</span>
        </a>

        <a routerLink="/novo" class="nav-link" routerLinkActive="active">
          <div class="icon-box">
            <i class="fa-solid fa-circle-plus"></i>
          </div>
          <span>Novo Chamado</span>
        </a>

        <a routerLink="/usuarios" class="nav-link" routerLinkActive="active">
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

  constructor(private router: Router, private auth: AuthService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isLoginPage = event.urlAfterRedirects.includes('/login');

        if (event.urlAfterRedirects.includes('/novo')) {
          this.pageTitle = 'Novo Chamado';
        } else if (event.urlAfterRedirects.includes('/usuarios')) {
          this.pageTitle = 'Usuários';
        } else {
          this.pageTitle = 'Meus Chamados';
        }
      });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
