import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './servicios/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'crear-cuenta',
    loadChildren: () => import('./pages/crear-cuenta/crear-cuenta.module').then( m => m.CrearCuentaPageModule)
  },
  {
    path: 'editar-informacion',
    loadChildren: () => import('./pages/editar-informacion/editar-informacion.module').then( m => m.EditarInformacionPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'pokemon-fantasma-desc',
    loadChildren: () => import('./pages/pokemon-fantasma-desc/pokemon-fantasma-desc.module').then( m => m.PokemonFantasmaDescPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'registros',
    loadChildren: () => import('./pages/registros/registros.module').then( m => m.RegistrosPageModule),
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
