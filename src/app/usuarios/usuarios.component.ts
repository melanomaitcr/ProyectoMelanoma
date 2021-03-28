import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['consultar', 'cedula', 'nombre', 'rol', 'borrar'];
  dataSource: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  paginatorIntl: MatPaginatorIntl = new MatPaginatorIntl();
  dataVista = { busqueda: "" };

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  registrarUsuario() {

  }

  idiomarPaginator() {
    this.paginator._intl.itemsPerPageLabel = 'Usuarios por página:';
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.previousPageLabel = 'Página previa';
    this.paginator._intl.nextPageLabel = 'Página siguiente';
    this.paginator._intl.lastPageLabel = 'Última página';
    //this.paginator.getRangeLabel = 'dutchRangeLabel';
    this.paginator._intl.getRangeLabel = this.paginator._intl.getRangeLabel =
      (page: number, pageSize: number, length: number) => {
        if (length == 0 || pageSize == 0) {
          return "0 de " + length.toString();
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return (startIndex + 1).toString() + " - " + endIndex.toString() + " de " + length.toString();
      };
  }

  async cargarUsuarios() {
    let usuariosBD = await this.usuarioService.findAll().toPromise();
    let usuarios = usuariosBD["data"] as Usuario[]
    //console.log(usuarios);

    this.idiomarPaginator();

    this.dataSource = new MatTableDataSource(usuarios);
    this.dataSource.paginator = (this.paginator);
  }

  mostrarUsuario(usuario: Usuario) {
    this.router.navigate(['/usuario', { cedula: usuario.cedula }]);
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



  getNombre(usuario: Usuario) {
    return usuario.nombre + " " + usuario.primer_apellido + " " + usuario.segundo_apellido;
  }

  async ejecutarAccion() {
    console.log("Ejecutando...");

    let usuario: Usuario = new Usuario("500", "Felipe", "Pacheco", "Cerdas", "melanoma2021", "felipepace09@gmail.com", "M");

    /* DELETE */
    let respuesta = await this.usuarioService.delete(usuario.cedula).toPromise();
    console.log(respuesta);

    /* POST */
    respuesta = await this.usuarioService.create(usuario).toPromise();
    console.log(respuesta);

    /* GETALL */
    let usuariosBD = await this.usuarioService.findAll().toPromise();
    let usuarios = usuariosBD["data"] as Usuario[]
    console.log(usuarios);

    /* PUT */
    usuario["nombre"] = "Epilef"
    respuesta = await this.usuarioService.update(usuario.cedula, usuario).toPromise();
    let nuevoUsuario = respuesta as Usuario;
    console.log(nuevoUsuario.nombre);

  }

  async borrarUsuario(usuario: Usuario) {
    this.dialogoBorrado(usuario);
  }

  async dialogoBorrado(usuario: Usuario) {

    const dialogRef = this.dialog.open(UsuariosComponentYesNoDialog, {
      width: '250px', data: usuario
    });

    dialogRef.afterClosed().subscribe(async result => {

      if (result == "Sí") {
        this.borrarUsuarioAux(usuario);
      }

    });

  }

  async borrarUsuarioAux(usuario: Usuario) {
    let respuesta = await this.usuarioService.delete(usuario.cedula).toPromise();
    console.log(respuesta);
    this.openSnackBar("¡Usuario eliminado correctamente!");
    this.cargarUsuarios();
  }

}


@Component({
  selector: 'not-important',
  template: `
  <h1 mat-dialog-title>Confirmar elección</h1>
<div mat-dialog-content> ¿Está seguro de querer borrar el usuario de cédula {{data.cedula}} ?</div>
<div mat-dialog-actions>
<button mat-button color="primary" (click)=siClick()>Sí</button>
  <button mat-button color="primary" (click)=noClick()>No</button>
</div>
  `
})
export class UsuariosComponentYesNoDialog {

  constructor(
    public dialogRef: MatDialogRef<UsuariosComponentYesNoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario) {

  }

  siClick(): void {
    this.dialogRef.close("Sí");
  }


  noClick(): void {
    this.dialogRef.close("No");
  }
}