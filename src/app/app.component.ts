import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass],
  template: `
  <div class="app">
    <aside class="sidebar">
      <h3 style="color:white">ChamadoPro</h3>
      <nav style="display:flex;flex-direction:column;gap:12px">
        <a routerLink="/" class="nav-link">
          Meus Chamados
        </a>
        <a routerLink="/novo" class="nav-link">
          Novo Chamado
        </a>
      </nav>
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
  `
})
export class AppComponent {
  pageTitle = 'Meus Chamados';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.urlAfterRedirects.includes('/novo')) {
          this.pageTitle = 'Novo Chamado';
        } else {
          this.pageTitle = 'Meus Chamados';
        }
      });
  }
}
