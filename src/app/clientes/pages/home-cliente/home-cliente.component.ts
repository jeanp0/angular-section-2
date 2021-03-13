import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styles: [],
})
export class HomeClienteComponent implements OnInit {
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {}

  logout() {
    this.usuarioService.logout();
  }
}
