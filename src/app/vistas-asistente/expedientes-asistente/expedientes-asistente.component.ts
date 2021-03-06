import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Expediente } from '../../models/expediente';
import { ExpedienteService } from '../../services/expediente.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpedienteRegistroAsistenteComponent } from '../expediente-registro-asistente/expediente-registro-asistente.component';
import { ExpedienteRegistroConfirmacionAsistenteComponent } from '../expediente-registro-confirmacion-asistente/expediente-registro-confirmacion-asistente.component';
import { ExpedienteRegistroVisualizacionAsistenteComponent } from '../expediente-registro-visualizacion-asistente/expediente-registro-visualizacion-asistente.component';

@Component({
  selector: 'app-expedientes-asistente',
  templateUrl: './expedientes-asistente.component.html',
  styleUrls: ['./expedientes-asistente.component.scss']
})
export class ExpedientesAsistenteComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'cedula', 'acciones'];
  dataSource: MatTableDataSource<Expediente>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  paginatorIntl: MatPaginatorIntl = new MatPaginatorIntl();

  dataVista = { busqueda: "" }

  constructor(private expedienteService: ExpedienteService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.cargarExpedientes();
  }

  editarExpediente(expediente: Expediente): void {
    const referenciaDialogo = this.dialog.open(ExpedientesAsistenteComponent, {
      data: { cedula: expediente.cedula }
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      this.cargarExpedientes()
    });
  }

  verExpediente(expediente: Expediente): void {
    const referenciaDialogo = this.dialog.open(ExpedienteRegistroVisualizacionAsistenteComponent, {
      data: { cedula: expediente.cedula }
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      this.cargarExpedientes()
    });
  }


  borrarExpediente(expediente: Expediente): void {
    const referenciaDialogo = this.dialog.open(ExpedientesAsistenteComponent, {
      data: { cedula: expediente.cedula }, minWidth: 400
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      this.cargarExpedientes()
    });
  }

  registrarExpediente() {
    const referenciaDialogo = this.dialog.open(ExpedienteRegistroAsistenteComponent, {
      minWidth: 400
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      if (result == undefined) return;

      const referenciaDialogoNueva = this.dialog.open(ExpedienteRegistroConfirmacionAsistenteComponent, {
        data: { cedula: result.cedula }, minWidth: 400
      });

      referenciaDialogoNueva.afterClosed().subscribe(result => {
        this.cargarExpedientes()
        this.openSnackBar("??Paciente registrado exitosamente!");
      });

    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
    });
  }

  filtrarExpedientes() {
    this.dataSource.filter = this.dataVista.busqueda.trim().toLowerCase();

    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();

  }

  idiomarPaginator() {
    this.paginator._intl.itemsPerPageLabel = 'Pacientes por p??gina:';
    this.paginator._intl.firstPageLabel = 'Primera p??gina';
    this.paginator._intl.previousPageLabel = 'P??gina previa';
    this.paginator._intl.nextPageLabel = 'P??gina siguiente';
    this.paginator._intl.lastPageLabel = '??ltima p??gina';
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

  async cargarExpedientes() {
    let expedientesBD = await this.expedienteService.findAll().toPromise();
    let expedientes = expedientesBD["data"] as Expediente[]

    this.idiomarPaginator();

    this.dataSource = new MatTableDataSource(expedientes);
    this.dataSource.paginator = (this.paginator);
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: Expediente, filter: string) => {
      let nombre = this.getNombre(data).toLocaleLowerCase().trim();
      let cedula = data.cedula.toLocaleLowerCase().trim();
      filter = filter.toLocaleLowerCase().trim();
      return nombre.includes(filter) || cedula.includes(filter);
    };
  }

  getNombre(expediente: Expediente) {
    return expediente.nombre + " " + expediente.primer_apellido + " " + expediente.segundo_apellido;
  }

}
