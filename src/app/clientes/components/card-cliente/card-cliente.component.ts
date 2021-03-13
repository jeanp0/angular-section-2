import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../interfaces/cliente.interface';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-card-cliente',
  templateUrl: './card-cliente.component.html',
  styles: [
    `
      .dropdown-toggle::after {
        display: none;
      }
    `,
  ],
})
export class CardClienteComponent implements OnInit {
  @Input() cliente!: Cliente;

  constructor(private router: Router, private clienteService: ClienteService) {}

  ngOnInit(): void {}

  irAEditar(cliente: Cliente) {
    this.clienteService.setClienteSeleccionado(cliente);
    this.router.navigate(['clientes/editar/']);
  }

  cambiarEstado(cliente: Cliente) {
    this.clienteService.cambiarEstado(cliente).subscribe((res) => {
      cliente.estado = res.estado;
      // la linea a continuación creo que no es necesaria porque el usuario ya se encuentra en la lista de cliente,
      // sin embargo, lo hago porque así lo requiere Dantee en la tarea
      this.router.navigate(['clientes/listar/']);
    });
  }
}
