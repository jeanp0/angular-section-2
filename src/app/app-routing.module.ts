import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioGuard } from './usuario/guards/usuario.guard';

const routes: Routes = [
  {
    path: 'usuario',
    // canActivate: [UsuarioGuard],
    loadChildren: () =>
      import('./usuario/usuario.module').then((m) => m.UsuarioModule),
  },
  {
    path: 'clientes',
    canActivateChild: [UsuarioGuard],
    loadChildren: () =>
      import('./clientes/clientes.module').then((m) => m.ClientesModule),
  },
  {
    path: '**',
    redirectTo: 'clientes',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
