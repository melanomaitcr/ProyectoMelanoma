import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['cedula', 'nombre', 'rol', 'consultar',];
  dataSource: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  paginatorIntl: MatPaginatorIntl = new MatPaginatorIntl();
  dataVista = { busqueda: "", cargando: true }

  constructor(private usuarioService: UsuarioService,
    private router: Router,
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
    this.router.navigate(['/usuario-registro']);
  }

  filtrarUsuarios() {
    this.dataSource.filter = this.dataVista.busqueda.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

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
      let rol = this.rolExtendido(data.rol).toLocaleLowerCase().trim();
      let cedula = data.cedula.toLocaleLowerCase().trim();
      filter = filter.toLocaleLowerCase().trim();
      return nombre.includes(filter) || rol.includes(filter) || cedula.includes(filter);
    };
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

}
