import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private _listaClientes: Cliente[] = [];
  private _clienteSeleccionado: Cliente = {
    id: '',
    nombres: '',
    apellidos: '',
    celular: '',
    direccion: '',
    correo: '',
  };

  get listaClientes() {
    return this._listaClientes;
  }

  get clienteSeleccionado() {
    return this._clienteSeleccionado;
  }

  setClienteSeleccionado(cliente: Cliente) {
    this._clienteSeleccionado = cliente;
  }

  constructor(private http: HttpClient) {}

  consultaClientes() {
    this.http
      .get<Cliente[]>('http://localhost:3001/clientes')
      .subscribe((res) => {
        this._listaClientes = res;
      });
  }

  registrarCliente(cliente: Cliente) {
    cliente.estado = true;
    return this.http.post<Cliente>('http://localhost:3001/clientes', cliente);
  }

  editarCliente(cliente: Cliente) {
    return this.http.put<Cliente>(
      `http://localhost:3001/clientes/${cliente.id}`,
      {
        ...cliente,
        id: null,
      }
    );
  }

  cambiarEstado(cliente: Cliente) {
    return this.http.put<Cliente>(
      `http://localhost:3001/clientes/${cliente.id}`,
      { ...cliente, estado: !cliente.estado }
    );
  }
}
