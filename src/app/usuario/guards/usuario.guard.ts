import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
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
