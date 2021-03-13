import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (!this.usuarioService.verifyIsLogged()) {
      this.router.navigate(['/usuario/login']);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean | UrlTree {
    return this.canActivate();
  }
}
