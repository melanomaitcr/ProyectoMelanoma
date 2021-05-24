import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Expediente } from '../../models/expediente';
import { ExpedienteService } from '../../services/expediente.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ExpedienteEdicionComponent } from '../expediente-edicion/expediente-edicion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpedienteBorradoComponent } from '../expediente-borrado/expediente-borrado.component';
import { ExpedienteRegistroComponent } from '../expediente-registro/expediente-registro.component';
import { ExpedienteRegistroConfirmacionComponent } from '../expediente-registro-confirmacion/expediente-registro-confirmacion.component';
import { ExpedienteBitacoraComponent } from '../expediente-bitacora/expediente-bitacora.component';

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.scss']
})
export class ExpedientesComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'cedula', 'descargar', 'editar', 'borrar', 'acciones'];
  dataSource: MatTableDataSource<Expediente>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  paginatorIntl: MatPaginatorIntl = new MatPaginatorIntl();

  dataVista = { busqueda: "" }

  constructor(private expedienteService: ExpedienteService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router) {

  }

  ngOnInit(): void {
    this.cargarExpedientes();
    let input = document.querySelector('input')
    input.addEventListener("click", (e: Event) => input.value = '');
  }

  editarExpediente(expediente: Expediente): void {
    const referenciaDialogo = this.dialog.open(ExpedienteEdicionComponent, {
      data: { cedula: expediente.cedula }
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      this.cargarExpedientes()
    });
  }

  verExpediente(expediente: Expediente): void {
    this.router.navigate(['/expediente', { cedula: expediente.cedula }])
  }

  borrarExpediente(expediente: Expediente): void {
    const referenciaDialogo = this.dialog.open(ExpedienteBorradoComponent, {
      data: { cedula: expediente.cedula }, minWidth: 400
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      this.cargarExpedientes()
    });
  }

  registrarExpediente() {
    const referenciaDialogo = this.dialog.open(ExpedienteRegistroComponent, {
      minWidth: 400
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      if (result == undefined) return;

      const referenciaDialogoNueva = this.dialog.open(ExpedienteRegistroConfirmacionComponent, {
        data: { cedula: result.cedula }, minWidth: 400
      });

      referenciaDialogoNueva.afterClosed().subscribe(result => {
        this.cargarExpedientes()
        this.openSnackBar("Paciente registrado exitosamente!");
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
    this.paginator._intl.itemsPerPageLabel = 'Pacientes por página:';
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

  exportarExpediente(expediente: Expediente) {
    let jsonExpediente = `[\n {"cedula": "${expediente.cedula}",\n "nombre": "${expediente.nombre}",\n "primer_apellido": "${expediente.primer_apellido}",\n "segundo_apellido": "${expediente.segundo_apellido}",`
    jsonExpediente += `\n "correo_electronico": "${expediente.correo_electronico}",\n "nacionalidad": "${expediente.nacionalidad}",\n "fecha_nacimiento": "${expediente.fecha_nacimiento}",`
    jsonExpediente += `\n "domicilio_provincia": "${expediente.domicilio_provincia}",\n "domicilio_canton": "${expediente.domicilio_canton}",\n "domicilio_distrito": "${expediente.domicilio_distrito}",`
    jsonExpediente += `\n "identidad_etnica": "${expediente.identidad_etnica}",\n "numero_telefono": ${expediente.numero_telefono}\n }\n]`

    let expedienteResultante = new Blob([jsonExpediente], { type: '.json' });

    saveAs(expedienteResultante, `Expediente - ${expediente.cedula}.json`);

  }

  generarExpediente(expediente) {
    return new Expediente(expediente["cedula"], expediente["nombre"], expediente["primer_apellido"], expediente["segundo_apellido"], expediente["correo_electronico"]
      , expediente["nacionalidad"], expediente["fecha_nacimiento"], expediente["domicilio_provincia"], expediente["domicilio_canton"], expediente["domicilio_distrito"]
      , expediente["identidad_etnica"], expediente["numero_telefono"])
  }

  revisarExistenciaAtributosExpediente(expediente) {
    return "cedula" in expediente && "nombre" in expediente && "primer_apellido" in expediente && "segundo_apellido" in expediente && "correo_electronico" in expediente
      && "nacionalidad" in expediente && "fecha_nacimiento" in expediente && "domicilio_provincia" in expediente && "domicilio_canton" in expediente && "domicilio_distrito" in expediente
      && "identidad_etnica" in expediente && "numero_telefono" in expediente
  }

  revisarTiposExpediente(expediente) {
    return typeof expediente["cedula"] === "string" && typeof expediente["nombre"] === "string" && typeof expediente["primer_apellido"] === "string" && typeof expediente["segundo_apellido"] === "string"
      && typeof expediente["correo_electronico"] === "string" && typeof expediente["nacionalidad"] === "string" && typeof expediente["fecha_nacimiento"] === "string"
      && typeof expediente["domicilio_provincia"] === "string" && typeof expediente["domicilio_canton"] === "string" && typeof expediente["domicilio_distrito"] === "string"
      && typeof expediente["identidad_etnica"] === "string" && typeof expediente["numero_telefono"] === "number"
  }

  mostrarBitacora(bitacora, nombreArchivo: string): void {
    const referenciaDialogo = this.dialog.open(ExpedienteBitacoraComponent, {
      data: { resultado: bitacora, nombreArchivo: nombreArchivo, tipo: "expedientes" }, minWidth: 400
    });
    this.cargarExpedientes()
    referenciaDialogo.afterClosed().subscribe(result => {
    });

  }

  async importarExpedientes(evento) {
    let archivos: FileList = evento.srcElement.files;
    let bitacora = []
    for (let i = 0; i < archivos.length; i++) {
      let reader = new FileReader();
      let archivoActual = archivos[i].name
      try {
        reader.readAsText(archivos[i]);
        let ref = this;
        reader.onload = async function () {
          try {
            let json = await JSON.parse(reader.result as string);
            let expedienteActual = 0
            for (let expediente of json) {
              expedienteActual += 1
              if (ref.revisarExistenciaAtributosExpediente(expediente)) {
                if (ref.revisarTiposExpediente(expediente)) {
                  expediente["fecha_nacimiento"] = new Date(expediente["fecha_nacimiento"])

                  if (expediente["fecha_nacimiento"] == "Invalid Date") {
                    bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `El atributo fecha de nacimiento no cuenta con un formato de fecha válido en el expediente ${expedienteActual}\n` })
                    if (expedienteActual == json.length) ref.mostrarBitacora(bitacora, archivoActual)
                    continue
                  } else {
                    await expediente["fecha_nacimiento"].setHours(expediente["fecha_nacimiento"].getHours() + 6)
                    expediente["fecha_nacimiento"] = expediente["fecha_nacimiento"].toString()
                  }

                  try {
                    await ref.expedienteService.create(ref.generarExpediente(expediente)).toPromise();
                    bitacora.push({ "tipo_resultado": "ÉXITO:", "resultado": `El expediente ${expedienteActual} de cédula ${expediente["cedula"]} fue registrado\n` })
                    if (expedienteActual == json.length) ref.mostrarBitacora(bitacora, archivoActual)
                  } catch {
                    bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `La cédula y/o correo electrónico del usuario del expediente ${expedienteActual} pertenece a otro usuario del sistema\n` })
                    if (expedienteActual == json.length) ref.mostrarBitacora(bitacora, archivoActual)
                  }

                } else {
                  bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `Uno o más atributos cuentan con un tipo de dato incorrecto en el expediente ${expedienteActual}\n` })
                  if (expedienteActual == json.length) ref.mostrarBitacora(bitacora, archivoActual)
                }

              } else {
                bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `Falta uno o más atributos en el expediente ${expedienteActual}\n` })
                if (expedienteActual == json.length) ref.mostrarBitacora(bitacora, archivoActual)
              }
            }

          } catch {
            bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `El archivo presenta un error en el formato\n` })
            ref.mostrarBitacora(bitacora, archivoActual)
          }
        }

      } catch (error) {
        bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `El archivo no pudo leerse correctamente\n` })
        this.mostrarBitacora(bitacora, archivoActual)
      }
    }
  }

  subirExpedientes() {
    document.querySelector('input').click()

  }

}
