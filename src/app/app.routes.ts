import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/chamados/components/lista-chamados/lista-chamados.component')
        .then(m => m.ListaChamadosComponent)
  },
  {
    path: 'novo',
    loadComponent: () =>
      import('./features/chamados/components/novo-chamado/novo-chamado.component')
        .then(m => m.NovoChamadoComponent)
  },
  {
    path: 'detalhe/:id',
    loadComponent: () =>
      import('./features/chamados/components/detalhe-chamado/detalhe-chamado.component')
        .then(m => m.DetalheChamadoComponent)
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('./features/usuarios/components/lista-usuarios/lista-usuarios.component')
        .then(m => m.ListaUsuariosComponent)
  },
  {
    path: 'usuarios/novo',
    loadComponent: () =>
      import('./features/usuarios/components/novo-usuario/novo-usuario.component')
        .then(m => m.NovoUsuarioComponent)
  },
  {
    path: 'usuarios/editar/:id',
    loadComponent: () =>
      import('./features/usuarios/components/editar-usuario/editar-usuario.component')
        .then(m => m.EditarUsuarioComponent)
  }
];
