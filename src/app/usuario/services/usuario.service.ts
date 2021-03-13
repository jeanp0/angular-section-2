import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private router: Router) {}

  login(usuario: string, contrasenia: string): boolean {
    //llamada al apiRest
    if (usuario.trim() === 'jeanp' && contrasenia.trim() === '1234') {
      localStorage.setItem('token', 'abc1234');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/usuario/login');
  }

  verifyIsLogged(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }
}
