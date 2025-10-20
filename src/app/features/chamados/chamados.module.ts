import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ListaChamadosComponent } from './components/lista-chamados/lista-chamados.component';
import { NovoChamadoComponent } from './components/novo-chamado/novo-chamado.component';
import { DetalheChamadoComponent } from './components/detalhe-chamado/detalhe-chamado.component';

import { chamadosRoutes } from './chamados.routes';

@NgModule({
  declarations: [
    ListaChamadosComponent,
    NovoChamadoComponent,
    DetalheChamadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(chamadosRoutes)
  ]
})
export class ChamadosModule {}
