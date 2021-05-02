import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from "../../models/usuario";
import { UsuarioService } from '../../services/usuario.service';

let ROLES_BASICOS = { 'A': 'Asistente', 'M': 'Médico', 'D': 'Administrador', 'P': 'Paciente' }

@Component({
  selector: 'app-usuario-registro-confirmacion',
  templateUrl: './usuario-registro-confirmacion.component.html',
  styleUrls: ['./usuario-registro-confirmacion.component.scss']
})
export class UsuarioRegistroConfirmacionComponent implements OnInit {

  cedulaUsuario: String;
  usuario: Usuario = new Usuario("", "", "", "", "", "", "M");

  constructor(private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public referenciaDialogo: MatDialogRef<UsuarioRegistroConfirmacionComponent>,
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

  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
    });
  }

  getNombre(usuario: Usuario) {
    return usuario.nombre + " " + usuario.primer_apellido + " " + usuario.segundo_apellido;
  }
}
