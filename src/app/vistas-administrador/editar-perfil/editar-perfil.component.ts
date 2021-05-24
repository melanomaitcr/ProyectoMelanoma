import { Component, Inject, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {


  cedula = "";
  correo_electronico = "";
  telefono = "";
  usuario: Usuario = new Usuario("", "", "", "", "", "", "");

  correoElectronicoFC = new FormControl('', [Validators.required, Validators.email, this.correoDuplicadoValidator()]);
  telefonoFC = new FormControl('', [Validators.required]);

  usuarios: Usuario[];
  matcher = new MyErrorStateMatcher();


  constructor(
    private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    public referenciaDialogo: MatDialogRef<EditarPerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.cedula = this.data['cedula'];
    this.cargarDatosUsuario();
    this.cargarUsuarios();
  }

  async cargarUsuarios() {
    let usuariosBD = await this.usuarioService.findAll().toPromise();
    this.usuarios = usuariosBD["data"] as Usuario[]
  }

  async cargarDatosUsuario() {
    this.usuario = await this.usuarioService.getInformacionPerfil().toPromise() as Usuario;
    this.correo_electronico = this.usuario.correo_electronico;
    this.telefono = "88888888"
  }

  cerrar(cita?) {
    console.log("Cerrar");
    this.referenciaDialogo.close(cita);
  }

  formularioValido() {
    return this.correoElectronicoFC.valid && this.telefonoFC.valid;
  }
  correoDuplicadoValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.usuarios == undefined) return null;

      let encontrado = false;
      for (let usuario of this.usuarios)
        if (usuario.correo_electronico == control.value && usuario.correo_electronico != this.usuario.correo_electronico) encontrado = true;
      return encontrado ? { correoDuplicado: { value: control.value } } : null;
    };
  }

  getErrorMessage(fc: FormControl, campo: String) {

    if (fc.hasError('required')) {
      return 'Debe ingresar un ' + campo;
    } else if (fc.hasError('email')) {
      return 'Debe ingresar un correo electrónico válido';
    } else if (fc.hasError('correoDuplicado')) {
      return 'Ya existe un usuario con ese correo electrónico';
    }
    return '';
  }

  async actualizarPerfil() {

    this.usuario.correo_electronico = this.correo_electronico;
    let respuesta = await this.usuarioService.update(this.cedula, this.usuario).toPromise();
    let nuevoPerfil = respuesta as Usuario;
    this.openSnackBar("¡Información actualizada correctamente!")
    this.cerrar();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
    });
  }
}
