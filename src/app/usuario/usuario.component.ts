import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  roles = ["Médico", "Asistente"]

  usuario: Usuario = new Usuario(null, null, null, null, null, null, null);
  cedulaFC = new FormControl('', [Validators.required]);
  nombreFC = new FormControl('', [Validators.required]);
  primer_apellidoFC = new FormControl('', [Validators.required]);
  correo_electronicoFC = new FormControl('', [Validators.required, Validators.email]);
  rolFC = new FormControl('', [Validators.required]);

  cedulaUsuario: String;

  constructor(private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cedulaUsuario = this.route.snapshot.paramMap.get('cedula');
    this.cargarUsuario(this.cedulaUsuario);
  }

  async cargarUsuario(cedulaUsuario: String) {
    this.usuario = await this.usuarioService.findByPk(cedulaUsuario).toPromise() as Usuario;
    this.usuario.rol = this.rolExtendido(this.usuario.rol);
    console.log(this.usuario);
  }

  async actualizarUsuario() {
    this.usuario.rol = this.rolBasico(this.usuario.rol);

    try {

      let respuesta = await this.usuarioService.update(this.cedulaUsuario, this.usuario).toPromise();
      let nuevoUsuario = respuesta as Usuario;
      this.usuario.rol = this.rolExtendido(this.usuario.rol);

      console.log(nuevoUsuario);
      this.openSnackBar("¡Usuario actualizado correctamente!");
      this.router.navigate(['/usuarios']);

    } catch (error) {

      const dialogRef = this.dialog.open(UsuarioComponentOkDialog, {
        width: '250px', data: this.usuario
      });

      dialogRef.afterClosed().subscribe(async result => { });

    }

  }


  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
    });
  }

  formularioValido() {
    return this.cedulaFC.valid && this.nombreFC.valid && this.primer_apellidoFC.valid && this.correo_electronicoFC.valid && this.rolFC.valid;
  }

  getErrorMessage(fc: FormControl, campo: String) {
    if (fc.hasError('required')) {
      return 'Debe ingresar un ' + campo;
    }
    return this.correo_electronicoFC.hasError('email') ? 'Debe ingresar un correo electrónico válido' : '';
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
export class UsuarioComponentOkDialog {

  constructor(
    public dialogRef: MatDialogRef<UsuarioComponentOkDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario) {

  }

  okClick(): void {
    this.dialogRef.close("Sí");
  }
}