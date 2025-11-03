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
        <h3>
          <a routerLink="/" style="text-decoration: none;">
            <img 
              src="assets/logo-vertical-branco.svg" 
              alt="ChamadoPro" 
              style="width: 100%; vertical-align: middle;"
            />
          </a>
        </h3>
        <nav style="display:flex; flex-direction:column; gap:12px; margin-top:24px;">
          <a routerLink="/" class="nav-link">Meus Chamados</a>
          <a routerLink="/novo" class="nav-link">Novo Chamado</a>
          <a routerLink="/usuarios" class="nav-link">Usuários</a>
        </nav>
      </div>
      <button class="btn btn-outline" (click)="logout()">Sair</button>
    </aside>

    <div style="flex:1;display:flex;flex-direction:column;">
      <header class="header">
        <div style="display:flex;align-items:center;gap:12px">
          <strong>{{ pageTitle }}</strong>
        </div>
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
