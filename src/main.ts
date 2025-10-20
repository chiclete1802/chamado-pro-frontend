import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: '', loadComponent: () => import('./app/features/chamados/components/lista-chamados/lista-chamados.component').then(m => m.ListaChamadosComponent) },
  { path: 'novo', loadComponent: () => import('./app/features/chamados/components/novo-chamado/novo-chamado.component').then(m => m.NovoChamadoComponent) },
  { path: 'detalhe/:id', loadComponent: () => import('./app/features/chamados/components/detalhe-chamado/detalhe-chamado.component').then(m => m.DetalheChamadoComponent) },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});