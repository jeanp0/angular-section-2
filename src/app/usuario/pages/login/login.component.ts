import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  hide = true;
  usuario = '';
  contrasenia = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {}

  iniciarSesion() {
    this.usuarioService.login(this.usuario, this.contrasenia);

    if (this.usuarioService.verifyIsLogged()) {
      //navegar a clites
      this.router.navigateByUrl('./clientes');
    } else {
      console.log('Error en auth');
      //emitir algun mesj
    }
  }
}
