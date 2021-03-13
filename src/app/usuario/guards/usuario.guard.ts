import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
  CanActivateChild,
} from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioGuard implements CanActivate, CanActivateChild {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(): boolean {
    if (!this.usuarioService.verifyIsLogged()) {
      this.router.navigate(['/usuario/login']);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
