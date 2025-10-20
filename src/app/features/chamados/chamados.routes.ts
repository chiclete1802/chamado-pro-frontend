import { Routes } from '@angular/router';
import { ListaChamadosComponent } from './components/lista-chamados/lista-chamados.component';
import { NovoChamadoComponent } from './components/novo-chamado/novo-chamado.component';
import { DetalheChamadoComponent } from './components/detalhe-chamado/detalhe-chamado.component';

export const chamadosRoutes: Routes = [
  { path: '', component: ListaChamadosComponent },
  { path: 'novo', component: NovoChamadoComponent },
  { path: ':id', component: DetalheChamadoComponent }
];
