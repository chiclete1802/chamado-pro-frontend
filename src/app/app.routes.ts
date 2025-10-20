import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/chamados/chamados.module').then(m => m.ChamadosModule)
  }
];
