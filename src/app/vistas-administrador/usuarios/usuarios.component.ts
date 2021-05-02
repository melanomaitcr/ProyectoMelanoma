import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioEdicionComponent } from '../usuario-edicion/usuario-edicion.component';
import { UsuarioBorradoComponent } from '../usuario-borrado/usuario-borrado.component';
import { UsuarioRegistroComponent } from '../usuario-registro/usuario-registro.component';
import { UsuarioRegistroConfirmacionComponent } from '../usuario-registro-confirmacion/usuario-registro-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';

let ROLES_BASICOS = { 'A': 'Asistente', 'M': 'Médico', 'D': 'Administrador', 'P': 'Paciente' }

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'cedula', 'rol', 'editar', 'borrar'];
  dataSource: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  paginatorIntl: MatPaginatorIntl = new MatPaginatorIntl();

  dataVista = { busqueda: "" }

  constructor(private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  editarUsuario(usuario: Usuario): void {
    const referenciaDialogo = this.dialog.open(UsuarioEdicionComponent, {
      data: { cedula: usuario.cedula }
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      this.cargarUsuarios()
    });
  }

  borrarUsuario(usuario: Usuario): void {
    const referenciaDialogo = this.dialog.open(UsuarioBorradoComponent, {
      data: { cedula: usuario.cedula }, minWidth: 400
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      this.cargarUsuarios()
    });
  }

  registrarUsuario() {
    const referenciaDialogo = this.dialog.open(UsuarioRegistroComponent, {
      minWidth: 400
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      if (result == undefined) return;

      const referenciaDialogoNueva = this.dialog.open(UsuarioRegistroConfirmacionComponent, {
        data: { cedula: result.cedula }, minWidth: 400
      });

      referenciaDialogoNueva.afterClosed().subscribe(result => {
        this.cargarUsuarios()
        this.openSnackBar("¡Usuario registrado exitosamente!");
      });

    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
    });
  }

  filtrarUsuarios() {
    this.dataSource.filter = this.dataVista.busqueda.trim().toLowerCase();

    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();

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
    console.log(usuariosBD);
    let usuarios = usuariosBD["data"] as Usuario[]
    console.log(usuarios);


    this.idiomarPaginator();

    this.dataSource = new MatTableDataSource(usuarios);
    this.dataSource.paginator = (this.paginator);
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: Usuario, filter: string) => {
      let nombre = this.getNombre(data).toLocaleLowerCase().trim();
      let rol = ROLES_BASICOS[data.rol].toLocaleLowerCase().trim();
      let cedula = data.cedula.toLocaleLowerCase().trim();
      filter = filter.toLocaleLowerCase().trim();
      return nombre.includes(filter) || rol.includes(filter) || cedula.includes(filter);
    };
  }

  getNombre(usuario: Usuario) {
    return usuario.nombre + " " + usuario.primer_apellido + " " + usuario.segundo_apellido;
  }

  getRol(usuario: Usuario) {
    return ROLES_BASICOS[usuario.rol];
  }

}
