import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonFantasmaDescPage } from './pokemon-fantasma-desc.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonFantasmaDescPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonFantasmaDescPageRoutingModule {}
