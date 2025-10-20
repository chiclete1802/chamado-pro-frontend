import { Routes } from '@angular/router';
import { ListaChamadosComponent } from './features/chamados/components/lista-chamados/lista-chamados.component';
import { NovoChamadoComponent } from './features/chamados/components/novo-chamado/novo-chamado.component';

export const routes: Routes = [
  { path: '', component: ListaChamadosComponent },
  { path: 'novo', component: NovoChamadoComponent }
];
