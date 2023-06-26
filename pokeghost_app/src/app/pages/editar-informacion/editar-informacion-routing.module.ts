import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarInformacionPage } from './editar-informacion.page';

const routes: Routes = [
  {
    path: '',
    component: EditarInformacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarInformacionPageRoutingModule {}
