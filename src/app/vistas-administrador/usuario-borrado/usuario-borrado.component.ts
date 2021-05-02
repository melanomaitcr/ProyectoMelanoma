import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from "../../models/usuario";
import { UsuarioService } from '../../services/usuario.service';

let ROLES_BASICOS = { 'A': 'Asistente', 'M': 'Médico', 'D': 'Administrador', 'P': 'Paciente' }

@Component({
  selector: 'app-usuario-borrado',
  templateUrl: './usuario-borrado.component.html',
  styleUrls: ['./usuario-borrado.component.scss']
})
export class UsuarioBorradoComponent implements OnInit {

  cedulaUsuario: String;
  usuario: Usuario = new Usuario("", "", "", "", "", "", "M");

  constructor(private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public referenciaDialogo: MatDialogRef<UsuarioBorradoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    //this.cedulaUsuario = this.route.snapshot.paramMap.get('cedula');
    this.cedulaUsuario = this.data['cedula']
    this.cargarUsuario(this.cedulaUsuario);
  }

  async cargarUsuario(cedulaUsuario: String) {
    this.usuario = await this.usuarioService.findByPk(cedulaUsuario).toPromise() as Usuario;
    this.usuario.rol = ROLES_BASICOS[this.usuario.rol];
    console.log(this.usuario);
  }

  cerrar() {
    this.referenciaDialogo.close();
  }

  async borrarUsuario() {
    let respuesta = await this.usuarioService.delete(this.cedulaUsuario).toPromise();
    console.log(respuesta);
    this.openSnackBar("¡Usuario eliminado correctamente!");
    this.referenciaDialogo.close();
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
    });
  }

  getNombre(usuario: Usuario) {
    return usuario.nombre + " " + usuario.primer_apellido + " " + usuario.segundo_apellido;
  }
}
