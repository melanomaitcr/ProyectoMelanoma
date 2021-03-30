import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  roles = ["Médico", "Asistente"]

  usuario: Usuario = new Usuario(null, null, null, null, null, null, null);
  cedulaFC = new FormControl('', [Validators.required, this.pkDuplicadaValidator(), Validators.pattern('[0-9]*')]);
  nombreFC = new FormControl('', [Validators.required]);
  primer_apellidoFC = new FormControl('', [Validators.required]);
  correo_electronicoFC = new FormControl('', [Validators.required, Validators.email, this.correoDuplicadoValidator()]);
  rolFC = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  cedulaUsuario: String;
  usuarios: Usuario[];


  constructor(private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cedulaUsuario = this.route.snapshot.paramMap.get('cedula');
    this.cargarUsuario(this.cedulaUsuario);
    this.cargarUsuarios();
  }

  async cargarUsuarios() {
    let usuariosBD = await this.usuarioService.findAll().toPromise();
    this.usuarios = usuariosBD["data"] as Usuario[]
  }

  async cargarUsuario(cedulaUsuario: String) {
    this.usuario = await this.usuarioService.findByPk(cedulaUsuario).toPromise() as Usuario;
    this.usuario.rol = this.rolExtendido(this.usuario.rol);
    console.log(this.usuario);
  }

  pkDuplicadaValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.usuarios == undefined) return null;

      let encontrado = false;
      for (let usuario of this.usuarios)
        if (this.cedulaUsuario != control.value &&
          usuario.cedula == control.value) encontrado = true;

      return encontrado ? { pkDuplicada: { value: control.value } } : null;
    };
  }

  correoDuplicadoValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.usuarios == undefined) return null;

      let encontrado = false;
      for (let usuario of this.usuarios)
        if (this.cedulaUsuario != usuario.cedula &&
          usuario.correo_electronico == control.value) encontrado = true;


      return encontrado ? { correoDuplicado: { value: control.value } } : null;
    };
  }

  async actualizarUsuario() {
    this.usuario.rol = this.rolBasico(this.usuario.rol);

    let respuesta = await this.usuarioService.update(this.cedulaUsuario, this.usuario).toPromise();
    let nuevoUsuario = respuesta as Usuario;
    this.usuario.rol = this.rolExtendido(this.usuario.rol);

    console.log(nuevoUsuario);
    this.openSnackBar("¡Usuario actualizado correctamente!");
    this.router.navigate(['/usuarios']);

    /* catch (error) {

      const dialogRef = this.dialog.open(UsuarioComponentNoActulizacionDialog, {
        data: this.usuario
      });

      dialogRef.afterClosed().subscribe(async result => { });

    }*/

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

  async borrarUsuario() {

    const dialogRef = this.dialog.open(UsuarioComponentBorradoDialog, {
      data: null
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result == "Sí")
        this.borrarUsuarioAux();
    });
  }

  async borrarUsuarioAux() {
    let respuesta = await this.usuarioService.delete(this.cedulaUsuario).toPromise();
    console.log(respuesta);
    this.openSnackBar("¡Usuario eliminado correctamente!");
    this.router.navigate(['/usuarios']);
  }


}

/*
 @Component({
  selector: 'not-important',
  template: `
  <h1 mat-dialog-title>Error de Actualización</h1>
<div mat-dialog-content> ¡No se ha podido actualizar el usuario! Ya existe un usuario con cédula: {{data.cedula}}</div>
<div mat-dialog-actions>
<button mat-button color="primary" (click)=okClick()>Cerrar</button>
</div>
  `
})
export class UsuarioComponentNoActulizacionDialog {

  constructor(
    public dialogRef: MatDialogRef<UsuarioComponentNoActulizacionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario) {

  }

  okClick(): void {
    this.dialogRef.close("Sí");
  }
}
*/

@Component({
  selector: 'not-important',
  template: `
  <h1 mat-dialog-title>Confirmar elección</h1>
<div mat-dialog-content> ¿Está seguro de querer borrar este usuario?</div>
<div mat-dialog-actions style="justify-content: center;">
  <button mat-raised-button color="primary" (click)=siClick()>Sí</button>
  <button mat-raised-button color="primary" style="margin-left: 50px" (click)=noClick()>No</button>
</div>
  `
})
export class UsuarioComponentBorradoDialog {

  constructor(
    public dialogRef: MatDialogRef<UsuarioComponentBorradoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario) {

  }

  siClick(): void {
    this.dialogRef.close("Sí");
  }


  noClick(): void {
    this.dialogRef.close("No");
  }
}