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
import { Router } from '@angular/router';
import { CitaInicioMedicoComponent } from '../cita-inicio-medico/cita-inicio-medico.component';
import { FamiliarOtroCancerService } from 'src/app/services/familiar-otro-cancer.service';
import { ArchivoCitaService } from 'src/app/services/archivo-cita.service';
import { FamiliarOtroCancer } from 'src/app/models/familiarOtroCancer';
import { HistorialPersonalCitaService } from 'src/app/services/historial-personal-cita.service';
import { ArchivoCita } from 'src/app/models/archivoCita';
import { HistorialPersonalCita } from 'src/app/models/historialPersonalCita';
import { HistorialFamiliarCita } from 'src/app/models/historialFamiliarCita';
import { ExpedienteBitacoraComponent } from 'src/app/vistas-administrador/expediente-bitacora/expediente-bitacora.component';

class CustomDateFormatter extends CalendarNativeDateFormatter {

  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(date);
  }
}



@Component({
  selector: 'app-citas-medico',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './citas-medico.component.html',
  styleUrls: ['./citas-medico.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,

    },
  ]
})
export class CitasMedicoComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'cedula', 'fechahora', 'descargar', 'acciones'];
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
    private historialPersonalService: HistorialPersonalCitaService,
    private historialFamiliarService: HistorialFamiliarCitaService,
    private familiarOtroCancerService: FamiliarOtroCancerService,
    private archivoCitaService: ArchivoCitaService,
    public dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit(): void {
    this.actualizarFechaMes();
    this.actualizarFecha();
    this.cargarCitas();
    let input = document.querySelector('input')
    input.addEventListener("click", (e: Event) => input.value = '');
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
    const referenciaDialogo = this.dialog.open(CitasMedicoComponent, {
      data: { idCita: cita.id_cita }
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      this.cargarCitas()
    });
  }

  borrarCita(cita: Cita): void {
    const referenciaDialogo = this.dialog.open(CitasMedicoComponent, {
      data: { idCita: cita.id_cita }, minWidth: 400
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      this.cargarCitas()
    });
  }

  iniciarCita(cita: Cita): void {
    const referenciaDialogo = this.dialog.open(CitaInicioMedicoComponent, {
      data: { idCita: cita.id_cita }, minWidth: 400
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      if (result == undefined) return;

      if (cita.cita_finalizada == '1')
        this.router.navigate(['/cita-lectura-medico', { idCita: cita.id_cita, origen: 'citas' }])
      else this.router.navigate(['/cita-medico', { idCita: cita.id_cita }])
      /**
      if (result != undefined) this.dataVista.visualizacion = "Cita";
      console.log("HERE2"); */
    });
  }



  registrarCita() {
    const referenciaDialogo = this.dialog.open(CitasMedicoComponent, {
      minWidth: 400
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      console.log(result);

      if (result == undefined) return;

      const referenciaDialogoNueva = this.dialog.open(CitasMedicoComponent, {
        data: { idCita: result }, minWidth: 400
      });

      referenciaDialogoNueva.afterClosed().subscribe(result => {
        this.cargarCitas()
        this.openSnackBar("¡Cita registrada exitosamente!");
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
    console.log(this.citas);


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
    return this.datepipe.transform(fhc, 'hh:mm aa');
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


  async getBase64ImageFromUrl(imageUrl: string) {
    imageUrl = imageUrl.replace("http://melanomaitcr.pythonanywhere.com", window.location.origin)
    var res = await fetch(imageUrl);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  }

  async estructuraArchivo(archivo: ArchivoCita) {
    let data = await this.getBase64ImageFromUrl(archivo.url_archivo).then(
      data => data
    )
    let base64 = data as string
    base64 = base64.split(",")[1]
    let jsonCita = `\n\t {"id_archivo": "${archivo.id_archivo}",\n\t "id_cita": "${archivo.id_cita}",\n\t "nombre_archivo": "${archivo.nombre_archivo}",`
    jsonCita += `\n\t "url_archivo": "${base64}",\n\t "tipo_archivo": "${archivo.tipo_archivo}",\n\t "imagen_prediagnostico": "${archivo.imagen_prediagnostico}"\n\t }`
    //console.log(jsonCita)
    return jsonCita
  }

  async exportarArchivosCita(id_cita) {
    let archivos = ""
    try {
      let archivosCita = await this.archivoCitaService.findAll().toPromise()
      let archivosCitaArray = archivosCita["data"] as ArchivoCita[]
      for (let archivo of archivosCitaArray) {
        if (archivo.id_cita == id_cita) {
          if (archivos.length > 0) { archivos += ","; }
          archivos += await this.estructuraArchivo(archivo);
          console.log(archivos)
        }
      }
    } catch (error) {
      console.log("Error al solicitar archivos")
    }

    if (archivos.length > 0) archivos += "\n "
    return archivos
  }

  estructuraFamiliarOtroCancer(familiarOtroCancer: FamiliarOtroCancer) {
    let jsonCita = `\n\t\t {"id_cita": "${familiarOtroCancer.id_cita}",\n\t\t "rellenado_por_paciente": "${familiarOtroCancer.rellenado_por_paciente}",`
    jsonCita += `\n\t\t "tipo_cancer": "${familiarOtroCancer.tipo_cancer}",\n\t\t "parentesco": "${familiarOtroCancer.parentesco}"\n\t\t }`
    console.log(jsonCita)
    return jsonCita
  }

  async exportarFamiliaresOtroCancer(id_cita) {
    let familiares = ""
    try {
      let familiaresOtroCancer = await this.familiarOtroCancerService.findAll().toPromise()
      let familiaresOtroCancerArray = familiaresOtroCancer["data"] as FamiliarOtroCancer[]
      familiaresOtroCancerArray.forEach(familiar => {
        if (familiar.id_cita == id_cita) {
          if (familiares.length > 0) { familiares += "," }
          familiares += this.estructuraFamiliarOtroCancer(familiar)
        }
      });
    } catch (error) {
      console.log("Error al solicitar familiares")
    }

    if (familiares.length > 0) familiares += "\n\t "
    return familiares
  }

  async estructuraHistorialFamiliar(historialFamiliar: HistorialFamiliarCita) {
    let jsonCita = `\n\t {"id_cita": "${historialFamiliar.id_cita}",\n\t "rellenado_por_paciente": "${historialFamiliar.rellenado_por_paciente}",`
    jsonCita += `\n\t "familiares_con_cancer_melanoma": "${historialFamiliar.familiares_con_cancer_melanoma}",`
    jsonCita += `\n\t "parientes_con_cancer_melanoma": "${historialFamiliar.parientes_con_cancer_melanoma}",`
    jsonCita += `\n\t "familiares_con_otro_tipo_cancer": "${historialFamiliar.familiares_con_otro_tipo_cancer}",`
    jsonCita += `\n\t "familiares_otro_cancer": [` + await this.exportarFamiliaresOtroCancer(historialFamiliar.id_cita) + "]"
    jsonCita += `\n\t }`

    return jsonCita
  }

  async exportarHistorialesFamiliares(id_cita) {
    let historiales = ""
    try {
      let historialFamiliar = await this.historialFamiliarService.findByPk(id_cita, 1).toPromise() as HistorialFamiliarCita
      historiales += await this.estructuraHistorialFamiliar(historialFamiliar)
    } catch (error) {
      console.log("historial rellenado por paciente no encontrado")
    }

    try {
      let historialFamiliar = await this.historialFamiliarService.findByPk(id_cita, 0).toPromise() as HistorialFamiliarCita
      if (historiales.length > 0) historiales += ","
      historiales += await this.estructuraHistorialFamiliar(historialFamiliar)
    } catch (error) {
      console.log("historial rellenado por médico no encontrado")
    }

    if (historiales.length > 0) historiales += "\n "
    return historiales
  }

  estructuraHistorialPersonal(historialPersonal: HistorialPersonalCita) {
    let jsonCita = `\n\t {"id_cita": "${historialPersonal.id_cita}",\n\t "rellenado_por_paciente": "${historialPersonal.rellenado_por_paciente}",\n\t "peso_kg": ${historialPersonal.peso_kg},`
    jsonCita += `\n\t "estatura_cm": ${historialPersonal.estatura_cm},\n\t "imc": ${historialPersonal.imc},\n\t "realizacion_actividad_fisica": "${historialPersonal.realizacion_actividad_fisica}",`
    jsonCita += `\n\t "minutos_semana_actividad_fisica": ${historialPersonal.minutos_semana_actividad_fisica},\n\t "diagnostico_propio_cancer": "${historialPersonal.diagnostico_propio_cancer}",`
    jsonCita += `\n\t "tipos_cancer_propios": "${historialPersonal.tipos_cancer_propios}",\n\t "fuma_o_ha_fumado": "${historialPersonal.fuma_o_ha_fumado}",`
    jsonCita += `\n\t "edad_empezo_fumar": ${historialPersonal.edad_empezo_fumar},\n\t "fuma_actualmente": "${historialPersonal.fuma_actualmente}",\n\t "periodo_fumado": "${historialPersonal.periodo_fumado}",`
    jsonCita += `\n\t "consume_bebidas_alcoholicas": "${historialPersonal.consume_bebidas_alcoholicas}",\n\t "consume_bebidas_alcoholicas_total": "${historialPersonal.consume_bebidas_alcoholicas_total}",`
    jsonCita += `\n\t "consume_bebidas_alcoholicas_total_otro": "${historialPersonal.consume_bebidas_alcoholicas_total_otro}"\n\t }`

    return jsonCita
  }

  async exportarHistorialesPersonales(id_cita) {
    let historiales = ""
    try {
      let historialPersonal = await this.historialPersonalService.findByPk(id_cita, 1).toPromise() as HistorialPersonalCita
      historiales += this.estructuraHistorialPersonal(historialPersonal)
    } catch (error) {
      console.log("historial rellenado por paciente no encontrado")
    }

    try {
      let historialPersonal = await this.historialPersonalService.findByPk(id_cita, 0).toPromise() as HistorialPersonalCita
      if (historiales.length > 0) historiales += ","
      historiales += this.estructuraHistorialPersonal(historialPersonal)
    } catch (error) {
      console.log("historial rellenado por médico no encontrado")
    }

    if (historiales.length > 0) historiales += "\n "
    return historiales
  }

  async exportarCita(cita: Cita) {
    let jsonCita = `[\n {"id_cita": "${cita.id_cita}",\n "cedula_medico": "${cita.cedula_medico}",\n "cedula_paciente": "${cita.cedula_paciente}",`
    jsonCita += `\n "fecha_hora_cita": "${cita.fecha_hora_cita}",\n "clave": "${cita.clave}",\n "datos_ingresados_paciente": "${cita.datos_ingresados_paciente}",`
    jsonCita += `\n "cita_finalizada": "${cita.cita_finalizada}",\n "descripcion": "${cita.descripcion}",\n "anotaciones": "${cita.anotaciones}",`
    jsonCita += `\n "historiales_personales": [` + await this.exportarHistorialesPersonales(cita.id_cita) + "],"
    jsonCita += `\n "historiales_familiares": [` + await this.exportarHistorialesFamiliares(cita.id_cita) + "],"
    jsonCita += `\n "archivos": [` + await this.exportarArchivosCita(cita.id_cita) + "]"
    jsonCita += "\n }\n]"
    let citaResultante = new Blob([jsonCita], { type: '.json' });
    saveAs(citaResultante, `Cita - ${cita.fecha_hora_cita},  Paciente - ${cita.cedula_paciente}, Medico - ${cita.cedula_medico}.json`);
  }

  generarArchivo(archivo) {
    return new ArchivoCita(archivo["id_archivo"], archivo["id_cita"], archivo["nombre_archivo"], archivo["url_archivo"], archivo["tipo_archivo"], archivo["imagen_prediagnostico"])
  }

  revisarExistenciaAtributosArchivo(archivo) {
    return "id_archivo" in archivo && "id_cita" in archivo && "nombre_archivo" in archivo && "url_archivo" in archivo && "tipo_archivo" in archivo && "imagen_prediagnostico" in archivo
  }

  revisarTiposArchivo(archivo) {
    return typeof archivo["id_archivo"] === "string" && typeof archivo["id_cita"] === "string" && typeof archivo["nombre_archivo"] === "string"
      && typeof archivo["url_archivo"] === "string" && typeof archivo["tipo_archivo"] === "string" && typeof archivo["imagen_prediagnostico"] === "string"
  }

  generarFamiliarOtroCancer(familiarOtroCancer) {
    return new FamiliarOtroCancer(familiarOtroCancer["id_cita"], familiarOtroCancer["rellenado_por_paciente"], familiarOtroCancer["tipo_cancer"], familiarOtroCancer["parentesco"])
  }

  revisarExistenciaAtributosFamiliarOtroCancer(familiarOtroCancer) {
    return "id_cita" in familiarOtroCancer && "rellenado_por_paciente" in familiarOtroCancer && "tipo_cancer" in familiarOtroCancer && "parentesco" in familiarOtroCancer
  }

  revisarTiposFamiliarOtroCancer(familiarOtroCancer) {
    return typeof familiarOtroCancer["id_cita"] === "string" && typeof familiarOtroCancer["rellenado_por_paciente"] === "string"
      && typeof familiarOtroCancer["tipo_cancer"] === "string" && typeof familiarOtroCancer["parentesco"] === "string"
  }

  generarHistorialFamiliar(historialFamiliar) {
    return new HistorialFamiliarCita(historialFamiliar["id_cita"], historialFamiliar["rellenado_por_paciente"], historialFamiliar["familiares_con_cancer_melanoma"],
      historialFamiliar["parientes_con_cancer_melanoma"], historialFamiliar["familiares_con_otro_tipo_cancer"])
  }

  revisarExistenciaAtributosHistorialFamiliar(historialFamiliar) {
    return "id_cita" in historialFamiliar && "rellenado_por_paciente" in historialFamiliar && "familiares_con_cancer_melanoma" in historialFamiliar
      && "parientes_con_cancer_melanoma" in historialFamiliar && "familiares_con_otro_tipo_cancer" in historialFamiliar && "familiares_otro_cancer" in historialFamiliar
  }

  revisarTiposHistorialFamiliar(historialFamiliar) {
    return typeof historialFamiliar["id_cita"] === "string" && typeof historialFamiliar["rellenado_por_paciente"] === "string"
      && typeof historialFamiliar["familiares_con_cancer_melanoma"] === "string" && typeof historialFamiliar["parientes_con_cancer_melanoma"] === "string"
      && typeof historialFamiliar["familiares_con_otro_tipo_cancer"] === "string" && Array.isArray(historialFamiliar["familiares_otro_cancer"])
  }

  generarHistorialPersonal(historialPersonal) {
    return new HistorialPersonalCita(historialPersonal["id_cita"], historialPersonal["rellenado_por_paciente"], historialPersonal["peso_kg"], historialPersonal["estatura_cm"], historialPersonal["imc"],
      historialPersonal["realizacion_actividad_fisica"], historialPersonal["minutos_semana_actividad_fisica"], historialPersonal["diagnostico_propio_cancer"], historialPersonal["tipos_cancer_propios"],
      historialPersonal["fuma_o_ha_fumado"], historialPersonal["edad_empezo_fumar"], historialPersonal["fuma_actualmente"], historialPersonal["periodo_fumado"],
      historialPersonal["consume_bebidas_alcoholicas"], historialPersonal["consume_bebidas_alcoholicas_total"], historialPersonal["consume_bebidas_alcoholicas_total_otro"])
  }

  revisarExistenciaAtributosHistorialPersonal(historialPersonal: JSON) {
    return "id_cita" in historialPersonal && "rellenado_por_paciente" in historialPersonal && "peso_kg" in historialPersonal && "estatura_cm" in historialPersonal
      && "imc" in historialPersonal && "realizacion_actividad_fisica" in historialPersonal && "minutos_semana_actividad_fisica" in historialPersonal
      && "diagnostico_propio_cancer" in historialPersonal && "tipos_cancer_propios" in historialPersonal && "fuma_o_ha_fumado" in historialPersonal
      && "edad_empezo_fumar" in historialPersonal && "fuma_actualmente" in historialPersonal && "periodo_fumado" in historialPersonal
      && "consume_bebidas_alcoholicas" in historialPersonal && "consume_bebidas_alcoholicas_total" in historialPersonal && "consume_bebidas_alcoholicas_total_otro" in historialPersonal
  }

  revisarTiposHistorialPersonal(historialPersonal) {
    return typeof historialPersonal["id_cita"] === "string" && typeof historialPersonal["rellenado_por_paciente"] === "string" && typeof historialPersonal["peso_kg"] === "number"
      && typeof historialPersonal["estatura_cm"] === "number" && typeof historialPersonal["imc"] === "number" && typeof historialPersonal["realizacion_actividad_fisica"] === "string"
      && typeof historialPersonal["minutos_semana_actividad_fisica"] === "number" && typeof historialPersonal["diagnostico_propio_cancer"] === "string" && typeof historialPersonal["tipos_cancer_propios"] === "string"
      && typeof historialPersonal["fuma_o_ha_fumado"] === "string" && typeof historialPersonal["edad_empezo_fumar"] === "number" && typeof historialPersonal["fuma_actualmente"] === "string"
      && typeof historialPersonal["periodo_fumado"] === "string" && typeof historialPersonal["consume_bebidas_alcoholicas"] === "string" && typeof historialPersonal["consume_bebidas_alcoholicas_total"] === "string"
      && typeof historialPersonal["consume_bebidas_alcoholicas_total_otro"] === "string"
  }

  generarCita(cita) {
    return new Cita(cita["id_cita"], cita["cedula_medico"], cita["cedula_paciente"], cita["fecha_hora_cita"], cita["clave"], cita["datos_ingresados_paciente"],
      cita["cita_finalizada"], cita["descripcion"], cita["anotaciones"])
  }

  revisarExistenciaAtributosCita(cita) {
    return "id_cita" in cita && "cedula_medico" in cita && "cedula_paciente" in cita && "fecha_hora_cita" in cita && "clave" in cita && "datos_ingresados_paciente" in cita
      && "cita_finalizada" in cita && "descripcion" in cita && "anotaciones" in cita && "historiales_personales" in cita && "historiales_familiares" in cita && "archivos" in cita
  }

  revisarTiposCita(cita) {
    return typeof cita["id_cita"] === "string" && typeof cita["cedula_medico"] === "string" && typeof cita["cedula_paciente"] === "string" && typeof cita["fecha_hora_cita"] === "string"
      && typeof cita["clave"] === "string" && typeof cita["datos_ingresados_paciente"] === "string" && typeof cita["cita_finalizada"] === "string" && typeof cita["descripcion"] === "string"
      && typeof cita["anotaciones"] === "string" && Array.isArray(cita["historiales_personales"]) && Array.isArray(cita["historiales_familiares"]) && Array.isArray(cita["archivos"])
  }

  mostrarBitacora(bitacora, nombreArchivo: string): void {
    const referenciaDialogo = this.dialog.open(ExpedienteBitacoraComponent, {
      data: { resultado: bitacora, nombreArchivo: nombreArchivo, tipo: "citas" }, minWidth: 400
    });
    this.cargarCitas()
    referenciaDialogo.afterClosed().subscribe(result => {
    });
  }

  async importarCitas(evento) {
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
            let json = JSON.parse(reader.result as string);
            let citaActual = 0
            for (let cita of json) {
              citaActual += 1
              let falloHistorialesPersonales = false
              let historialesPersonales = []
              let falloHistorialesFamiliares = false
              let historialesFamiliares = []
              let fallofamiliaresOtroCancer = false
              let familiaresOtroCancer = []
              let falloArchivos = false
              let archivos = []
              if (ref.revisarExistenciaAtributosCita(cita)) {
                if (ref.revisarTiposCita(cita)) {

                  cita["fecha_hora_cita"] = new Date(cita["fecha_hora_cita"])

                  if (cita["fecha_hora_cita"] == "Invalid Date") {
                    bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `El atributo fecha_hora_cita no cuenta con un formato de fecha válido en el expediente ${citaActual}\n` })
                    continue
                  } else {
                    cita["fecha_hora_cita"].setHours(cita["fecha_hora_cita"].getHours() + 6)
                    cita["fecha_hora_cita"] = cita["fecha_hora_cita"].toString()
                  }
                  let historialPersonalActual = 0
                  for (let historialPersonal of cita["historiales_personales"]) {
                    historialPersonalActual += 1
                    if (ref.revisarExistenciaAtributosHistorialPersonal(historialPersonal)) {
                      if (ref.revisarTiposHistorialPersonal(historialPersonal)) {
                        historialesPersonales.push(ref.generarHistorialPersonal(historialPersonal))
                      } else {
                        bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `Uno o más atributos cuentan con un tipo de dato incorrecto en el historial personal ${historialPersonalActual} de la cita ${citaActual}\n` })
                        if (citaActual == json.length) ref.mostrarBitacora(bitacora, archivoActual)
                        falloHistorialesPersonales = true
                        break
                      }
                    } else {
                      bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `Falta uno o más atributos en el historial personal ${historialPersonalActual} de la cita ${citaActual}\n` })
                      if (citaActual == json.length) ref.mostrarBitacora(bitacora, archivoActual)
                      falloHistorialesPersonales = true
                      break
                    }
                  }
                  if (falloHistorialesPersonales) continue
                  let historialFamiliarActual = 0
                  for (let historialFamiliar of cita["historiales_familiares"]) {
                    historialFamiliarActual += 1
                    if (ref.revisarExistenciaAtributosHistorialFamiliar(historialFamiliar)) {
                      if (ref.revisarTiposHistorialFamiliar(historialFamiliar)) {
                        historialesFamiliares.push(ref.generarHistorialFamiliar(historialFamiliar))
                        console.log(historialesFamiliares)
                        let familiarOtroCancerActual = 0
                        for (let familiar_otro_cancer of historialFamiliar["familiares_otro_cancer"]) {
                          if (ref.revisarExistenciaAtributosFamiliarOtroCancer(familiar_otro_cancer)) {
                            familiarOtroCancerActual += 1
                            if (ref.revisarTiposFamiliarOtroCancer(familiar_otro_cancer)) {
                              familiaresOtroCancer.push(ref.generarFamiliarOtroCancer(familiar_otro_cancer))
                            } else {
                              bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `Uno o más atributos cuentan con un tipo de dato incorrecto en el familiar otro cancer ${familiarOtroCancerActual} de la cita ${citaActual}\n` })
                              if (citaActual == json.length) ref.mostrarBitacora(bitacora, archivoActual)
                              fallofamiliaresOtroCancer = true
                              break
                            }
                          } else {
                            bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `Falta uno o más atributos en el familiar otro cáncer ${familiarOtroCancerActual} de la cita ${citaActual}\n` })
                            if (citaActual == json.length) ref.mostrarBitacora(bitacora, archivoActual)
                            fallofamiliaresOtroCancer = true
                            break
                          }
                        }
                        if (fallofamiliaresOtroCancer) {
                          falloHistorialesFamiliares = true
                          break
                        }
                      } else {
                        bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `Uno o más atributos cuentan con un tipo de dato incorrecto en el historial familiar ${historialFamiliarActual} de la cita ${citaActual}\n` })
                        if (citaActual == json.length) ref.mostrarBitacora(bitacora, archivoActual)
                        falloHistorialesFamiliares = true
                        break
                      }
                    } else {
                      bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `Falta uno o más atributos en el historial familiar ${historialFamiliarActual} de la cita ${citaActual}\n` })
                      if (citaActual == json.length) ref.mostrarBitacora(bitacora, archivoActual)
                      falloHistorialesFamiliares = true
                      break
                    }
                  }
                  if (falloHistorialesFamiliares) continue

                  let archivoCitaActual = 0
                  for (let archivo of cita["archivos"]) {
                    archivoCitaActual += 1
                    if (ref.revisarExistenciaAtributosArchivo(archivo)) {
                      if (ref.revisarTiposArchivo(archivo)) {
                        archivos.push(ref.generarArchivo(archivo))
                        console.log(archivos)
                      } else {
                        bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `Uno o más atributos cuentan con un tipo de dato incorrecto en el archivo ${archivoCitaActual} de la cita ${citaActual}\n` })
                        if (citaActual == json.length) ref.mostrarBitacora(bitacora, archivoActual)
                        falloArchivos = true
                        break
                      }
                    } else {
                      bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `Falta uno o más atributos en el archivo ${archivoCitaActual} de la cita ${citaActual}\n` })
                      if (citaActual == json.length) ref.mostrarBitacora(bitacora, archivoActual)
                      falloArchivos = true
                      break
                    }
                  }
                  if (falloArchivos) continue
                  //Sólo para pruebas
                  try {
                    let _cita = ref.generarCita(cita)

                    let id_cita = await ref.citaService.create(_cita).toPromise();
                    historialesPersonales.forEach(async historialPersonal => {
                      historialPersonal.id_cita = id_cita
                      await ref.historialPersonalService.create(historialPersonal).toPromise();
                    })
                    historialesFamiliares.forEach(async historialFamiliar => {
                      historialFamiliar.id_cita = id_cita
                      await ref.historialFamiliarService.create(historialFamiliar).toPromise();
                    })
                    familiaresOtroCancer.forEach(async familiarOtroCancer => {
                      familiarOtroCancer.id_cita = id_cita
                      await ref.familiarOtroCancerService.create(familiarOtroCancer).toPromise();
                    })
                    archivos.forEach(async archivo => {
                      archivo.id_cita = id_cita
                      await ref.archivoCitaService.create(archivo).toPromise();
                    })

                    bitacora.push({ "tipo_resultado": "ÉXITO:", "resultado": `La cita ${citaActual} de id ${id_cita} del paciente ${_cita.cedula_paciente} y del médico ${_cita.cedula_medico} fue registrada\n` })
                    if (citaActual == json.length) ref.mostrarBitacora(bitacora, archivoActual)
                  } catch {
                    bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `El médico y/o paciente tienen una cita asignada en la misma fecha y hora de la cita ${citaActual}\n` })
                    if (citaActual == json.length) ref.mostrarBitacora(bitacora, archivoActual)
                  }

                } else {
                  bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `Uno o más atributos cuentan con un tipo de dato incorrecto en la cita ${citaActual}\n` })
                  if (citaActual == json.length) ref.mostrarBitacora(bitacora, archivoActual)
                }
              } else {
                bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `Falta uno o más atributos en la cita ${citaActual}\n` })
                if (citaActual == json.length) ref.mostrarBitacora(bitacora, archivoActual)
              }
            }
          } catch {
            bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `El archivo presenta un error en el formato\n` })
            ref.mostrarBitacora(bitacora, archivoActual)
          }
        };

      } catch (error) {
        bitacora.push({ "tipo_resultado": "ERROR:", "resultado": `El archivo no pudo leerse correctamente\n` })
        this.mostrarBitacora(bitacora, archivoActual)
      }

    }
    evento = null
  }

  subirCitas() {
    document.querySelector('input').click()
  }
}