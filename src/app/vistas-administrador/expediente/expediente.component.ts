import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ArchivoCita } from 'src/app/models/archivoCita';
import { Cita } from 'src/app/models/cita';
import { Expediente } from 'src/app/models/expediente';
import { FamiliarOtroCancer } from 'src/app/models/familiarOtroCancer';
import { HistorialFamiliarCita } from 'src/app/models/historialFamiliarCita';
import { HistorialPersonalCita } from 'src/app/models/historialPersonalCita';
import { ArchivoCitaService } from 'src/app/services/archivo-cita.service';
import { CitaService } from 'src/app/services/cita.service';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { FamiliarOtroCancerService } from 'src/app/services/familiar-otro-cancer.service';
import { HistorialFamiliarCitaService } from 'src/app/services/historial-familiar-cita.service';
import { HistorialPersonalCitaService } from 'src/app/services/historial-personal-cita.service';
import { ExpedienteEdicionComponent } from '../expediente-edicion/expediente-edicion.component';


@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.scss']
})
export class ExpedienteComponent implements OnInit {
  tabActual = 0
  cedula = ""
  hpc: HistorialPersonalCita = new HistorialPersonalCita(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,);
  hfc: HistorialFamiliarCita = new HistorialFamiliarCita(null, null, null, null, null,);
  familiaresOtroCancer: FamiliarOtroCancer[] = [];
  expediente: Expediente = new Expediente(null, null, null, null, null, null, null, null, null, null, null, null)
  public datepipe: DatePipe = new DatePipe('es-ES');
  edad: String
  citas: Cita[] = []
  archivos = []
  imagenes = []

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['idcita', 'fechahora', 'acciones'];
  dataSource: MatTableDataSource<any>;
  dataVista = { visualizacionTiempo: "Mensual", visualizacionContenido: "Citas" }
  fechaMensualDt: Date = new Date();
  fechaMensual = "";

  fechaAnualDt: Date = new Date();
  fechaAnual = "";

  expedientes: Expediente[];

  filtradoMensualCitas = (data: any, filter: string) => {
    console.log(data);

    let fh = new Date(filter);
    let fhc = new Date(data.fecha_hora_cita);

    return fh.getMonth() == fhc.getMonth() &&
      fh.getFullYear() == fhc.getFullYear();
  };

  filtradoAnualCitas = (data: any, filter: string) => {
    let fh = new Date(filter);
    let fhc = new Date(data.fecha_hora_cita);

    return fh.getFullYear() == fhc.getFullYear();
  };

  constructor(private expedienteService: ExpedienteService,
    private route: ActivatedRoute,
    private router: Router,
    private citaService: CitaService,
    private historialPersonalCitaService: HistorialPersonalCitaService,
    private historialFamiliarCitaService: HistorialFamiliarCitaService,
    private archivoCitaService: ArchivoCitaService,
    public dialog: MatDialog,
    private familiarOtroCancerService: FamiliarOtroCancerService,) { }

  ngOnInit(): void {
    document.getElementById("Expediente").style.display = "block";
    this.cedula = this.route.snapshot.paramMap.get('cedula');
    this.cargarPaciente(this.cedula);
    this.getHistoriales();
    this.fechaMensualDt = new Date();
    this.actualizarFecha();
    this.cargarCitas();
  }

  async cargarCitas() {
    let citasBD = await this.citaService.findAll().toPromise();
    this.citas = citasBD["data"] as Cita[]
    console.log(this.citas);


    let nuevasCitas = []
    for (let cita of this.citas)
      if (cita.cedula_paciente == this.cedula)
        nuevasCitas.push(cita)
    this.citas = nuevasCitas;

    this.dataSource = new MatTableDataSource(this.citas);
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = this.filtradoMensualCitas;

    let fechaFixed = this.datepipe.transform(new Date(this.fechaMensualDt), 'MM/dd/yyyy');
    if (this.dataSource != undefined) this.dataSource.filter = fechaFixed;
    this.cargarArchivos();
  }

  async cargarArchivos() {
    let archivosBD = await this.archivoCitaService.findAll().toPromise();
    let archivos = archivosBD["data"] as ArchivoCita[]

    this.archivos = []
    this.imagenes = []

    for (let archivo of archivos)
      for (let cita of this.citas)
        if (cita.id_cita == archivo.id_cita) {
          archivo['fecha_hora_cita'] = cita.fecha_hora_cita

          if (archivo.tipo_archivo == 'I')
            this.imagenes.push(archivo)
          else
            this.archivos.push(archivo)
        }

  }

  cambioTiempo() {
    if (this.dataVista.visualizacionTiempo == 'Mensual')
      this.dataSource.filterPredicate = this.filtradoMensualCitas;
    else
      this.dataSource.filterPredicate = this.filtradoAnualCitas;

    this.actualizarFecha()
  }

  cambioContenido() {
    if (this.dataVista.visualizacionContenido == 'Imágenes') {
      this.dataSource = new MatTableDataSource(this.imagenes);
    } else if (this.dataVista.visualizacionContenido == 'Archivos') {
      this.dataSource = new MatTableDataSource(this.archivos);
    } else {
      this.dataSource = new MatTableDataSource(this.citas);
    }
    this.cambioTiempo();
  }


  fechaSiguiente() {
    if (this.dataVista.visualizacionTiempo == 'Mensual')
      this.fechaMensualDt.setMonth(this.fechaMensualDt.getMonth() + 1);
    else
      this.fechaAnualDt.setFullYear(this.fechaAnualDt.getFullYear() + 1);

    this.actualizarFecha();
  }

  fechaAnterior() {
    if (this.dataVista.visualizacionTiempo == 'Mensual')
      this.fechaMensualDt.setMonth(this.fechaMensualDt.getMonth() - 1);
    else
      this.fechaAnualDt.setFullYear(this.fechaAnualDt.getFullYear() - 1);

    this.actualizarFecha();
  }

  descargarArchivo(data: any) {
    window.open(data.url_archivo, "_blank");
  }

  getTiempo() {
    return this.dataVista.visualizacionTiempo == "Mensual" ? "mes" : "año"
  }

  getContenido() {
    if (this.dataVista.visualizacionContenido == 'Imágenes')
      return 'imágenes'
    else if (this.dataVista.visualizacionContenido == 'Archivos')
      return 'archivos'
    return 'citas'
  }

  actualizarFecha() {
    if (this.dataVista.visualizacionTiempo == 'Mensual') {
      this.fechaMensual = this.capitalizar(this.datepipe.transform(new Date(this.fechaMensualDt), 'LLLL')) +
        this.datepipe.transform(new Date(this.fechaMensualDt), ' yyyy');
      let fechaFixed = this.datepipe.transform(new Date(this.fechaMensualDt), 'MM/dd/yyyy');
      if (this.dataSource != undefined) this.dataSource.filter = fechaFixed;
    } else {
      this.fechaAnual = this.datepipe.transform(new Date(this.fechaAnualDt), 'yyyy');
      let fechaFixed = this.datepipe.transform(new Date(this.fechaAnualDt), 'MM/dd/yyyy');
      if (this.dataSource != undefined) this.dataSource.filter = fechaFixed;
    }
  }

  getFechaActual() {
    if (this.dataVista.visualizacionTiempo == 'Mensual') {
      return this.fechaMensual;
    } else {
      return this.fechaAnual;
    }
  }

  capitalizar(palabra: string) {
    return palabra[0].toUpperCase() + palabra.substr(1).toLowerCase();
  }


  getNombre(cita: Cita) {
    if (this.expedientes == undefined) return "";

    for (let expediente of this.expedientes) {
      if (expediente.cedula == cita.cedula_paciente)
        return expediente.nombre + " " + expediente.primer_apellido + " " + expediente.segundo_apellido;
    }
  }

  getFechaHora(cita: Cita) {
    let fhc = new Date(cita.fecha_hora_cita);
    return this.datepipe.transform(fhc, 'dd/MM//yyyy hh:mm aa');
  }

  getFecha(data: any) {
    let fhc = new Date(data.fecha_hora_cita);
    return this.datepipe.transform(fhc, 'dd/MM//yyyy');
  }

  async cargarPaciente(cedulaPaciente: String) {
    this.expediente = await this.expedienteService.findByPk(cedulaPaciente).toPromise() as Expediente;
    let fechaNacimiento = new Date(this.expediente.fecha_nacimiento)
    fechaNacimiento.setHours(fechaNacimiento.getHours() + 6)
    this.expediente.fecha_nacimiento = this.datepipe.transform(fechaNacimiento, 'dd/MM/yyyy');
    let fechaActual = new Date()
    fechaActual.setHours(fechaActual.getHours() + 6)
    let edadP = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    if (fechaNacimiento.getMonth() > fechaActual.getMonth()) edadP--
    else {
      if (fechaNacimiento.getMonth() == fechaActual.getMonth()) {
        if (fechaNacimiento.getDay() > fechaActual.getDay()) edadP--
      }
    }
    this.edad = edadP.toString() + " años"
  }

  editar(): void {
    const referenciaDialogo = this.dialog.open(ExpedienteEdicionComponent, {
      data: { cedula: this.cedula }
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      this.cargarPaciente(this.cedula)
    });
  }

  cambiarTab(nombreTab, pos) {
    // Declare all variables
    let i: number, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(nombreTab).style.display = "block";

    if (pos == 1) {
      document.getElementById(nombreTab).style.borderRadius = "10px";
    }
    this.tabActual = pos;

  }

  volver() {
    this.router.navigate(['/expedientes'])
  }

  async getHistoriales() {
    let allCitas = (await this.citaService.findAll().toPromise())['data'] as Cita[];
    let idCita = "";

    let hpcs = (await this.historialPersonalCitaService.findAll().toPromise())['data'] as HistorialPersonalCita[];
    let hfcs = (await this.historialFamiliarCitaService.findAll().toPromise())['data'] as HistorialFamiliarCita[];
    let focs = (await this.familiarOtroCancerService.findAll().toPromise())['data'] as FamiliarOtroCancer[];

    for (let cita of allCitas)
      for (let hpc of hpcs)
        if (hpc.id_cita == cita.id_cita && cita.cedula_paciente == this.cedula)
          idCita = cita.id_cita

    for (let hpc of hpcs)
      if (hpc.id_cita == idCita)
        this.hpc = hpc;

    for (let hfc of hfcs)
      if (hfc.id_cita == idCita)
        this.hfc = hfc;


    for (let foc of focs)
      if (foc.id_cita == idCita)
        this.familiaresOtroCancer.push(foc);


    console.log(this.hpc); console.log(this.hfc); console.log(this.familiaresOtroCancer);
    return;
    try {
      this.hfc = await this.historialFamiliarCitaService.findByPk(idCita, '1').toPromise() as HistorialFamiliarCita;
      let fsoc = (await this.familiarOtroCancerService.findAll().toPromise())['data'] as FamiliarOtroCancer[];
      for (let foc of fsoc)
        if (foc.id_cita == idCita)
          this.familiaresOtroCancer.push(foc);

    } catch (error) { }

    console.log(this.hpc); console.log(this.hfc);

  }
}
