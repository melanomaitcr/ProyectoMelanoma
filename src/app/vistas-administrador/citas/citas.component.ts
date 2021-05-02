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
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { HistorialFamiliarCitaService } from 'src/app/services/historial-familiar-cita.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};



@Component({
  selector: 'app-citas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'cedula', 'fechahora', 'descargar', 'editar', 'borrar', 'acciones'];
  dataSource: MatTableDataSource<Cita>;
  fechaDt: Date = new Date();
  fecha = "";
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
    private modal: NgbModal) {
  }

  ngOnInit(): void {
    this.actualizarFecha();
    this.cargarCitas();
    this.cargarExpedientes();
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
    this.fecha = this.datepipe.transform(new Date(this.fechaDt), 'dd LLLL yyyy');
    let fechaFixed = this.datepipe.transform(new Date(this.fechaDt), 'MM/dd/yyyy');
    if (this.dataSource != undefined) this.dataSource.filter = fechaFixed;
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

  /*
  filtrarCitas() {
    this.dataSource.filter = this.dataVista.busqueda.trim().toLowerCase();

    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();

  }*/

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
    let citas = citasBD["data"] as Cita[]

    this.idiomarPaginator();

    this.dataSource = new MatTableDataSource(citas);
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
  }

  async cargarExpedientes() {
    let expedientesBD = await this.expedienteService.findAll().toPromise();
    this.expedientes = expedientesBD["data"] as Expediente[]
  }

  getNombre(cita: Cita) {
    for (let expediente of this.expedientes) {
      if (expediente.cedula == cita.cedula_paciente)
        return expediente.nombre + " " + expediente.primer_apellido + " " + expediente.segundo_apellido;
    }
  }

  getFechaHora(cita: Cita) {
    let fhc = new Date(cita.fecha_hora_cita);
    fhc.setHours(fhc.getHours() + 6);
    return this.datepipe.transform(fhc, 'dd/MM/yyyy hh:mm aa');
  }


  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}