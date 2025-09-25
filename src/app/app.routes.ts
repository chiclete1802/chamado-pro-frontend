import { Routes } from '@angular/router';
import { ListaChamadosComponent } from './pages/lista-chamados/lista-chamados.component';
import { NovoChamadoComponent } from './pages/novo-chamado/novo-chamado.component';

export const routes: Routes = [
  { path: '', component: ListaChamadosComponent },
  { path: 'novo', component: NovoChamadoComponent }
];
