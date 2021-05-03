import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cita } from '../../models/cita';
import { CitaService } from '../../services/cita.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
//import { CitaEdicionComponent } from '../cita-edicion/cita-edicion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { Expediente } from 'src/app/models/expediente';
import { CitaRegistroComponent } from '../cita-registro/cita-registro.component';
import { CitaBorradoComponent } from '../cita-borrado/cita-borrado.component';
import { CitaEdicionComponent } from '../cita-edicion/cita-edicion.component';



import {
  ChangeDetectionStrategy,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarNativeDateFormatter,
  CalendarView,
  DateFormatterParams,
} from 'angular-calendar';
import { HistorialFamiliarCitaService } from 'src/app/services/historial-familiar-cita.service';
import { CitaInicioComponent } from '../cita-inicio/cita-inicio.component';
import { Router } from '@angular/router';

class CustomDateFormatter extends CalendarNativeDateFormatter {

  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(date);
  }
}



@Component({
  selector: 'app-citas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,

    },
  ]
})
export class CitasComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'cedula', 'fechahora', 'descargar', 'editar', 'borrar', 'acciones'];
  dataSource: MatTableDataSource<Cita>;
  citas: Cita[];
  fechaDt: Date = new Date();
  fechaMesDt: Date = new Date();
  fecha = "";
  fechaMes = "";
  fechaDia = "";
  expedientes: Expediente[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  paginatorIntl: MatPaginatorIntl = new MatPaginatorIntl();

  dataVista = { visualizacion: "Diaria" }
  public datepipe: DatePipe = new DatePipe('es-ES');

  constructor(private citaService: CitaService,
    private expedienteService: ExpedienteService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit(): void {
    this.actualizarFechaMes();
    this.actualizarFecha();
    this.cargarCitas();
  }

  fechaSiguiente() {
    this.fechaDt.setDate(this.fechaDt.getDate() + 1);
    this.actualizarFecha();
  }

  fechaAnterior() {
    this.fechaDt.setDate(this.fechaDt.getDate() - 1);
    this.actualizarFecha();
  }

  actualizarFecha() {
    this.fecha = this.datepipe.transform(new Date(this.fechaDt), 'dd ') +
      this.capitalizar(this.datepipe.transform(new Date(this.fechaDt), 'LLLL')) +
      this.datepipe.transform(new Date(this.fechaDt), ' yyyy');
    let fechaFixed = this.datepipe.transform(new Date(this.fechaDt), 'MM/dd/yyyy');
    if (this.dataSource != undefined) this.dataSource.filter = fechaFixed;
  }

  mesSiguiente() {
    this.fechaMesDt.setMonth(this.fechaMesDt.getMonth() + 1);
    this.actualizarFechaMes();
  }

  mesAnterior() {
    this.fechaMesDt.setMonth(this.fechaMesDt.getMonth() - 1);
    this.actualizarFechaMes();
  }

  actualizarFechaMes() {
    this.fechaMes = this.capitalizar(this.datepipe.transform(new Date(this.fechaMesDt), 'LLLL')) +
      this.datepipe.transform(new Date(this.fechaMesDt), ' yyyy');
    let fechaFixed = this.datepipe.transform(new Date(this.fechaMesDt), 'MM/dd/yyyy');
  }

  capitalizar(palabra: string) {
    return palabra[0].toUpperCase() + palabra.substr(1).toLowerCase();
  }

  cargarEventos() {
    this.fechaDia = "Seleccione un día";
    this.activeDayIsOpen = false;
    this.events = []

    for (let cita of this.citas) {
      let fhc = new Date(cita.fecha_hora_cita);
      fhc.setHours(fhc.getHours() + 6);

      this.events.push({
        start: startOfDay(fhc),
        end: addHours(startOfDay(fhc), 1),
        title: this.getNombre(cita) + ": " + this.getHora(cita),
        color: { primary: '#4F4E4E', secondary: '#AAAAAA', },
        actions: [],
        resizable: { beforeStart: false, afterEnd: false, },
        draggable: false,
        id: cita.id_cita
      })
    }
  }

  editarCita(cita: Cita): void {
    const referenciaDialogo = this.dialog.open(CitaEdicionComponent, {
      data: { idCita: cita.id_cita }
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      this.cargarCitas()
    });
  }

  borrarCita(cita: Cita): void {
    const referenciaDialogo = this.dialog.open(CitaBorradoComponent, {
      data: { idCita: cita.id_cita }, minWidth: 400
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      this.cargarCitas()
    });
  }

  iniciarCita(cita: Cita): void {
    const referenciaDialogo = this.dialog.open(CitaInicioComponent, {
      data: { idCita: cita.id_cita }, minWidth: 400
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      if (result != undefined) this.router.navigate(['/cita', { idCita: cita.id_cita }])
      /**
      if (result != undefined) this.dataVista.visualizacion = "Cita";
      console.log("HERE2"); */
    });
  }



  registrarCita() {
    const referenciaDialogo = this.dialog.open(CitaRegistroComponent, {
      minWidth: 400
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      if (result == undefined) return;

      const referenciaDialogoNueva = this.dialog.open(CitasComponent, {
        data: { cedula: result.cedula }, minWidth: 400
      });

      referenciaDialogoNueva.afterClosed().subscribe(result => {
        this.cargarCitas()
        this.openSnackBar("Paciente registrado exitosamente!");
      });

    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
    });
  }

  idiomarPaginator() {
    this.paginator._intl.itemsPerPageLabel = 'Citas por página:';
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

  async cargarCitas() {
    let citasBD = await this.citaService.findAll().toPromise();
    this.citas = citasBD["data"] as Cita[]

    this.idiomarPaginator();

    this.dataSource = new MatTableDataSource(this.citas);
    this.dataSource.paginator = (this.paginator);
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: Cita, filter: string) => {
      let fh = new Date(filter);
      let fhc = new Date(data.fecha_hora_cita);
      fhc.setHours(fhc.getHours() + 6);

      return fh.setHours(0, 0, 0, 0) == fhc.setHours(0, 0, 0, 0);
    };

    let fechaFixed = this.datepipe.transform(new Date(this.fechaDt), 'MM/dd/yyyy');
    if (this.dataSource != undefined) this.dataSource.filter = fechaFixed;

    await this.cargarExpedientes();
    this.cargarEventos();
  }

  async cargarExpedientes() {
    let expedientesBD = await this.expedienteService.findAll().toPromise();
    this.expedientes = expedientesBD["data"] as Expediente[]
  }

  getNombre(cita: Cita) {
    if (this.expedientes == undefined) return "";

    for (let expediente of this.expedientes) {
      if (expediente.cedula == cita.cedula_paciente)
        return expediente.nombre + " " + expediente.primer_apellido + " " + expediente.segundo_apellido;
    }
  }

  getCita(idCita: string) {
    if (this.citas == undefined) return undefined;

    for (let cita of this.citas) {
      if (cita.id_cita == idCita)
        return cita;
    }
  }

  getFechaHora(cita: Cita) {
    let fhc = new Date(cita.fecha_hora_cita);
    fhc.setHours(fhc.getHours() + 6);
    return this.datepipe.transform(fhc, 'dd/MM/yyyy hh:mm aa');
  }

  getHora(cita: Cita) {
    let fhc = new Date(cita.fecha_hora_cita);
    fhc.setHours(fhc.getHours() + 6);
    return this.datepipe.transform(fhc, 'hh:mm aa');
  }


  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  eventosDia: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0)
        this.activeDayIsOpen = false;
      else
        this.activeDayIsOpen = true;
      this.viewDate = date;
    }
    this.eventosDia = events;
    this.fechaDia = this.capitalizar(this.datepipe.transform(new Date(date), 'EEEE, d ')) + 'de ' + this.capitalizar(this.datepipe.transform(new Date(date), 'MMMM'));
  }

  eventTimesChanged({ event, newStart, newEnd, }: CalendarEventTimesChangedEvent): void {
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.iniciarCita(this.getCita(String(event.id)));
  }


  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}