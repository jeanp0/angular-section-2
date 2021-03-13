import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styles: [],
})
export class CrearClienteComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  miFormulario: FormGroup = this.formBuilder.group({
    id: [this.clienteService.clienteSeleccionado.id],
    nombres: [
      this.clienteService.clienteSeleccionado.nombres,
      [Validators.required, Validators.minLength(4)],
    ], //[ valorDefecto, listaValidaciones  ]
    apellidos: [
      this.clienteService.clienteSeleccionado.apellidos,
      [Validators.required, Validators.minLength(4)],
    ],
    correo: [
      this.clienteService.clienteSeleccionado.correo,
      [Validators.required, Validators.email],
    ],
    celular: [
      this.clienteService.clienteSeleccionado.celular,
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    direccion: [
      this.clienteService.clienteSeleccionado.direccion,
      [Validators.required, Validators.minLength(7)],
    ],
  });

  errorCorreo(): string {
    if (this.miFormulario.controls.correo.hasError('email')) {
      return 'Correo no es correcto.';
    }
    return this.miFormulario.controls.correo.hasError('required')
      ? 'Campo obligatorio'
      : '';
  }

  errorCampo(campo: string) {
    if (this.miFormulario.controls[campo].hasError('minlength')) {
      const minimo = this.miFormulario.controls[campo].getError('minlength')
        .requiredLength;
      return `Mínimo ${minimo} caracteres`;
    }
    return 'Campo obligatorio **';
  }

  registrarCliente() {
    if (this.miFormulario.invalid) {
      return;
    }
    // si tiene ID significa que es un cliente existente
    if (this.miFormulario.get('id')?.value) {
      this.clienteService
        .editarCliente(this.miFormulario.value)
        .subscribe((res) => {
          this.router.navigateByUrl('/clientes');
        });
    } else {
      this.clienteService
        .registrarCliente(this.miFormulario.value)
        .subscribe((res) => {
          this.router.navigateByUrl('/clientes');
        });
    }
  }

  ngOnInit(): void {
    this.clienteService.setClienteSeleccionado({
      id: '',
      nombres: '',
      apellidos: '',
      celular: '',
      direccion: '',
      correo: '',
    });
  }
}
