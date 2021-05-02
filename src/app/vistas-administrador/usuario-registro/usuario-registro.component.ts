import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from "../../models/usuario";
import { UsuarioService } from '../../services/usuario.service';

let ROLES_BASICOS = { 'A': 'Asistente', 'M': 'Médico', 'D': 'Administrador', 'P': 'Paciente' }
let ROLES_EXTENDIDOS = { 'Asistente': 'A', 'Médico': 'M', 'Administrador': 'D', 'Paciente': 'P' }

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario-registro.component.html',
  styleUrls: ['./usuario-registro.component.scss']
})
export class UsuarioRegistroComponent implements OnInit {

  roles = ["Médico", "Asistente"]

  esconder = true;
  usuario: Usuario = new Usuario("", "", "", "", "", "", "M");
  cedulaFC = new FormControl('', [Validators.required, this.pkDuplicadaValidator(), Validators.pattern('[0-9]*')]);
  nombreFC = new FormControl('', [Validators.required]);
  primer_apellidoFC = new FormControl('', [Validators.required]);
  correo_electronicoFC = new FormControl('', [Validators.required, Validators.email, this.correoDuplicadoValidator()]);
  rolFC = new FormControl('', [Validators.required]);
  contrasennaFC = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  cedulaUsuario: String;
  usuarios: Usuario[];

  constructor(private usuarioService: UsuarioService,
    public dialog: MatDialog,
    public referenciaDialogo: MatDialogRef<UsuarioRegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.usuario.rol = ROLES_BASICOS[this.usuario.rol];
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
    this.usuario.rol = ROLES_EXTENDIDOS[this.usuario.rol];

    let respuesta = await this.usuarioService.create(this.usuario).toPromise();
    let nuevoUsuario = respuesta as Usuario;
    this.usuario.rol = ROLES_BASICOS[this.usuario.rol];

    console.log(nuevoUsuario);
    this.referenciaDialogo.close(nuevoUsuario);

  }

  cerrar() {
    this.referenciaDialogo.close();
  }

  formularioValido() {
    return this.cedulaFC.valid && this.nombreFC.valid && this.primer_apellidoFC.valid && this.correo_electronicoFC.valid && this.rolFC.valid && this.contrasennaFC.valid;
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

}
