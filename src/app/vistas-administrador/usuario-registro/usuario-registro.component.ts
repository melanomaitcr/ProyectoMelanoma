import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from "../../models/usuario";
import { UsuarioService } from '../../services/usuario.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-usuario-registro',
  templateUrl: './usuario-registro.component.html',
  styleUrls: ['./usuario-registro.component.scss']
})
export class UsuarioRegistroComponent implements OnInit {

  roles = ["Médico", "Asistente"]

  usuario: Usuario = new Usuario("", "", "", "", "", "", "M");
  cedulaFC = new FormControl('', [Validators.required, this.pkDuplicadaValidator(), Validators.pattern('[0-9]*')]);
  nombreFC = new FormControl('', [Validators.required]);
  primer_apellidoFC = new FormControl('', [Validators.required]);
  correo_electronicoFC = new FormControl('', [Validators.required, Validators.email, this.correoDuplicadoValidator()]);
  rolFC = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  usuarios: Usuario[];


  constructor(private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.usuario.rol = this.rolExtendido(this.usuario.rol);
    this.cargarUsuarios();
  }


  async cargarUsuarios() {
    let usuariosBD = await this.usuarioService.findAll().toPromise();
    this.usuarios = usuariosBD["data"] as Usuario[]
  }


  pkDuplicadaValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.usuarios == undefined) return null;

      let encontrado = false;
      for (let usuario of this.usuarios)
        if (usuario.cedula == control.value) encontrado = true;

      return encontrado ? { pkDuplicada: { value: control.value } } : null;
    };
  }

  correoDuplicadoValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.usuarios == undefined) return null;

      let encontrado = false;
      for (let usuario of this.usuarios)
        if (usuario.correo_electronico == control.value) encontrado = true;

      return encontrado ? { correoDuplicado: { value: control.value } } : null;
    };
  }

  async registrarUsuario() {
    this.usuario.rol = this.rolBasico(this.usuario.rol);

    let respuesta = await this.usuarioService.create(this.usuario).toPromise();
    let nuevoUsuario = respuesta as Usuario;
    this.usuario.rol = this.rolExtendido(this.usuario.rol);

    console.log(nuevoUsuario);
    this.openSnackBar("¡Usuario registrado exitosamente!");
    this.router.navigate(['/usuarios']);

  }


  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
    });
  }

  formularioValido() {
    return this.cedulaFC.valid && this.nombreFC.valid && this.primer_apellidoFC.valid && this.correo_electronicoFC.valid && this.rolFC.valid;
  }

  getErrorMessage(fc: FormControl, campo: String) {

    if (fc.hasError('required')) {
      return 'Debe ingresar un ' + campo;
    } else if (fc.hasError('email')) {
      return 'Debe ingresar un correo electrónico válido';
    } else if (fc.hasError('pkDuplicada')) {
      return 'Ya existe un usuario con ese número de cédula';
    } else if (fc.hasError('correoDuplicado')) {
      return 'Ya existe un usuario con ese correo electrónico';
    } else if (fc.hasError('pattern')) {
      return 'La cédula debe contener únicamente números';
    }
    return '';
  }

  rolExtendido(rolBasico: String) {
    switch (rolBasico) {
      case 'A':
        return "Asistente";
      case 'M':
        return "Médico";
      default:
        return "Administrador";
    }
  }

  rolBasico(rolExtendido: String) {
    switch (rolExtendido) {
      case 'Asistente':
        return "A";
      case 'Médico':
        return "M";
      default:
        return "D";
    }
  }

}
