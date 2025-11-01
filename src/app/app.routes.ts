import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login.component')
        .then(m => m.LoginComponent),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/chamados/components/lista-chamados/lista-chamados.component')
        .then(m => m.ListaChamadosComponent),
  },
  {
    path: 'novo',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/chamados/components/novo-chamado/novo-chamado.component')
        .then(m => m.NovoChamadoComponent),
  },
  {
    path: 'detalhe/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/chamados/components/detalhe-chamado/detalhe-chamado.component')
        .then(m => m.DetalheChamadoComponent),
  },
  {
    path: 'usuarios',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/usuarios/components/lista-usuarios/lista-usuarios.component')
        .then(m => m.ListaUsuariosComponent),
  },
  {
    path: 'usuarios/novo',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/usuarios/components/novo-usuario/novo-usuario.component')
        .then(m => m.NovoUsuarioComponent),
  },
  {
    path: 'usuarios/editar/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/usuarios/components/editar-usuario/editar-usuario.component')
        .then(m => m.EditarUsuarioComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
