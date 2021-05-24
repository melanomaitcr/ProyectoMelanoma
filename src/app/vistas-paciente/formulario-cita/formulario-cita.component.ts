import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { HistorialPersonalCitaService } from '../../services/historial-personal-cita.service';
import { HistorialPersonalCita } from 'src/app/models/historialPersonalCita';

import { HistorialFamiliarCitaService } from '../../services/historial-familiar-cita.service';
import { HistorialFamiliarCita } from 'src/app/models/historialFamiliarCita';

import { FamiliarOtroCancerService } from '../../services/familiar-otro-cancer.service';
import { FamiliarOtroCancer } from 'src/app/models/familiarOtroCancer';
import { ArchivoCita } from 'src/app/models/archivoCita';
import { ArchivoCitaService } from 'src/app/services/archivo-cita.service';
import { ActivatedRoute } from '@angular/router';
import { Cita } from 'src/app/models/cita';
import { DatePipe } from '@angular/common';
import { Expediente } from 'src/app/models/expediente';
import { CitaService } from 'src/app/services/cita.service';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

export interface Familiar {
  name: string;
  completed: boolean;
}

export interface ListaFamiliares {
  familiares: Familiar[];
}

@Component({
  selector: 'app-formulario-cita',
  templateUrl: './formulario-cita.component.html',
  styleUrls: ['./formulario-cita.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class FormularioCitaComponent implements OnInit {

  listaFamiliares: ListaFamiliares = {
    familiares: [
      { name: "Madre", completed: false },
      { name: "Hermana", completed: false },
      { name: "Tía Materna", completed: false },
      { name: "Tía Paterna", completed: false },
      { name: "Abuela Materna", completed: false },
      { name: "Abuela Paterna", completed: false },
      { name: "Otro(s)", completed: false },
      { name: "Padre", completed: false },
      { name: "Hermano", completed: false },
      { name: "Tío Materno", completed: false },
      { name: "Tío Paterno", completed: false },
      { name: "Abuelo Materno", completed: false },
      { name: "Abuelo Paterno", completed: false },
    ]
  };

  familiaresOtroCancer = [];
  valorProgreso = 100 / 8;
  titulo = "Datos Personales"

  idCita = "1";
  imagenes: ArchivoCita[] = [];
  archivos: ArchivoCita[] = [];

  posicion = 'Inicio';

  cita: Cita = new Cita("", "", "", "", "", "", "", "", "");
  citaData = {
    nombrePaciente: "",
    nombreMedico: "",
    fecha: "",
    hora: "",
  };
  fechaNac = new Date();

  //historialPersonal: HistorialPersonalCita = new HistorialPersonalCita("","","","","","","","","","","","","","","","");
  //historialFamiliar: HistorialFamiliarCita = new HistorialFamiliarCita("","","","","");
  //familiarOtroCancer: FamiliarOtroCancer = new FamiliarOtroCancer("","","","");

  familiar = "";
  nombre = "";
  cedula = "";
  fecha = "";
  nacionalidad = "";

  correoElectronico = "";
  telefono = "";
  provincia = "";
  distrito = "";
  canton = "";

  peso = "";
  estatura = "";
  imc = "";

  actividadFisicaPorSemana = "";
  empezoFumar = "";
  periodoFumado = "";
  actividadFisicaRadioButton = "";
  fumaRadioButton = "";
  fumaActualmenteRadioButton = "";

  bebidasAlcoholicasRadioButton = "";
  consumoTotalRadioButton = "";
  diagnosticadoCancerRadioButton = "";
  tipoCancer = "";

  familiaresConCancerRadioButton = "";
  otroFamiliarCancerMelanomaCheckbox = "";

  familiaresConOtroCancerRadioButton = "";
  otroBebida = "";
  parentesco = "";
  tipoParentescoCancer = "";

  archivoImagenes = "";
  archivoDocumentos = "";


  allComplete: boolean = false;

  public datepipe: DatePipe = new DatePipe('es-ES');
  expediente: Expediente = new Expediente("", "", "", "", "", "", "", "", "", "", "", 0);

  constructor(
    private historialPersonalCitaService: HistorialPersonalCitaService,
    private historialFamiliarCitaService: HistorialFamiliarCitaService,
    private familiarOtroCancerService: FamiliarOtroCancerService,
    private archivoCitaService: ArchivoCitaService,
    private autenticacionService: AutenticacionService,
    private route: ActivatedRoute,
    private citaService: CitaService,
    private expedienteService: ExpedienteService,
  ) { }

  ngOnInit(): void {
    this.idCita = this.route.snapshot.paramMap.get('id_cita');
    this.cargarCita();
    this.cargarArchivos();
  }

  async cargarCita() {
    this.cita = await this.citaService.findByPk(this.idCita).toPromise() as Cita;

    let fhc = new Date(this.cita.fecha_hora_cita);
    fhc.setHours(fhc.getHours() + 6);
    this.cita.fecha_hora_cita = fhc.toString();

    this.citaData.fecha = this.capitalizar(this.datepipe.transform(new Date(fhc), 'EEEE, d ')) + 'de ' + this.capitalizar(this.datepipe.transform(new Date(fhc), 'MMMM'));
    this.citaData.hora = this.datepipe.transform(new Date(fhc), 'hh:mm') + this.datepipe.transform(new Date(fhc), ' a').toLowerCase();

    await this.getExpediente();
    //await this.getNombreMedico();

  }

  async getExpediente() {
    this.expediente = await this.expedienteService.findByPk(this.cita.cedula_paciente).toPromise() as Expediente
    this.expediente.nombre = this.expediente.nombre + " " + this.expediente.primer_apellido + " " + this.expediente.segundo_apellido;

    this.fechaNac = new Date(this.expediente.fecha_nacimiento);
    this.fechaNac.setHours(this.fechaNac.getHours() + 6);
  }

  capitalizar(palabra: string) {
    return palabra[0].toUpperCase() + palabra.substr(1).toLowerCase();
  }

  /*
  async getNombreMedico() {
    let usuario = await this.usuarioService.findByPk(this.cita.cedula_medico).toPromise() as Usuario
    this.citaData.nombreMedico = usuario.nombre + " " + usuario.primer_apellido + " " + usuario.segundo_apellido;
  }*/


  async borrarArchivo(archivo: ArchivoCita) {
    await this.archivoCitaService.delete(archivo.id_archivo).toPromise();
    this.cargarArchivos();
  }

  abrirImagen(imagen: ArchivoCita) {
    window.open(imagen.url_archivo, "_blank");
  }

  descargarArchivo(archivo: ArchivoCita) {
    window.open(archivo.url_archivo, "_blank");
  }

  async archivosSubidos(evento) {
    let archivos: FileList = evento.srcElement.files;

    for (let i = 0; i <= archivos.length; i++) {
      let reader = new FileReader();

      try {
        reader.readAsDataURL(archivos[i]);
        let ref = this;
        reader.onload = async function () {
          // rwbjhbvbghuead
          let archivoBase64 = (reader.result as string).split(',')[1];
          console.log(archivoBase64)

          let nombreArchivo = archivos[i].name;
          let tipoArchivo = (nombreArchivo.includes('.png') || nombreArchivo.includes('.jpg') || nombreArchivo.includes('.jpeg') || nombreArchivo.includes('.svg') || nombreArchivo.includes('.gif')) ? 'I' : 'A';

          let archivoCita = new ArchivoCita('1', ref.idCita, nombreArchivo, archivoBase64, tipoArchivo, "");
          console.log(archivoCita);

          await ref.archivoCitaService.create(archivoCita).toPromise();

          ref.cargarArchivos();
          //  await ref.enviarArchivos(archivosBase64, nombresArchivos);
        };

      } catch (error) { }
    }
  }

  async cargarArchivos() {
    let todosArchivos = (await this.archivoCitaService.findAll().toPromise())["data"] as ArchivoCita[];
    this.imagenes = [];
    this.archivos = [];

    for (let archivo of todosArchivos) {
      if (archivo.id_cita != this.idCita) continue;

      if (archivo.tipo_archivo == 'I')
        this.imagenes.push(archivo);
      else
        this.archivos.push(archivo);
    }

  }

  subirArchivos() {
    document.querySelector('input').click()
  }

  pasoPrevio(paginaArchivos?: boolean) {
    this.valorProgreso = this.valorProgreso - 100 / 8
    this.titulo = (paginaArchivos) ? "Datos Personales" : this.titulo;
  }

  pasoSiguiente(paginaArchivos?: boolean) {
    this.valorProgreso = this.valorProgreso + 100 / 8
    this.titulo = (paginaArchivos) ? "Archivos - Cita" : this.titulo;
  }

  actualizarIMC() {
    const re = /^\d*(\.\d+)?$/
    if (this.peso == "" || this.estatura == "") { this.imc = ""; return; }
    if (!this.peso.match(re) || !this.estatura.match(re)) { this.imc = ""; return; }
    try {
      this.imc = (Number(this.peso) / ((Number(this.estatura) / 100.0) * (Number(this.estatura) / 100.0))).toFixed(3)
    } catch { this.imc = "" }
  }
  agregarOtroPariente() {
    this.familiaresOtroCancer.push({ parentesco: "", tipoCancer: "" })
  }

  borrarFamiliar(i) {
    this.familiaresOtroCancer.splice(i, 1);
  }

  updateAllComplete() {
    this.allComplete = this.listaFamiliares.familiares != null && this.listaFamiliares.familiares.every(t => t.completed);
  }

  obtenerParientesConCancer(listaConCancer: Familiar[]) {
    let familiarCancer = [];
    let result = "";

    for (let familiar of listaConCancer) {
      if (familiar.completed == true) {
        familiarCancer.push(familiar.name);
      }
    }
    result = familiarCancer.join(",")
    console.log(result);

    if (!listaConCancer[6].completed) this.otroFamiliarCancerMelanomaCheckbox = "";
    return result;
  }


  async registrarFormularioCita() {


    let familiarConCancer = this.obtenerParientesConCancer(this.listaFamiliares.familiares);

    if (this.actividadFisicaRadioButton != '1') this.actividadFisicaPorSemana = "";
    if (this.fumaRadioButton != '1') this.empezoFumar = "";
    if (this.fumaActualmenteRadioButton != '1') this.periodoFumado = "";
    if (this.bebidasAlcoholicasRadioButton != '1') this.consumoTotalRadioButton = "";

    if (this.diagnosticadoCancerRadioButton != '1') this.tipoCancer = "";
    if (this.familiaresConCancerRadioButton != '1') familiarConCancer = "";

    if (this.familiaresConOtroCancerRadioButton != '1') this.familiaresOtroCancer = [];

    let historialPersonalCita = new HistorialPersonalCita(this.idCita, "1", Number(this.peso), Number(this.estatura), Number(this.imc), this.actividadFisicaRadioButton, parseInt(this.actividadFisicaPorSemana), this.diagnosticadoCancerRadioButton, this.tipoCancer, this.fumaRadioButton, parseInt(this.empezoFumar), this.fumaActualmenteRadioButton, this.periodoFumado, this.bebidasAlcoholicasRadioButton, this.consumoTotalRadioButton, this.otroBebida);
    let historialFamiliarCita = new HistorialFamiliarCita(this.idCita, "1", this.familiaresConCancerRadioButton, familiarConCancer, this.familiaresConOtroCancerRadioButton);

    await this.historialFamiliarCitaService.create(historialFamiliarCita).toPromise();
    await this.historialPersonalCitaService.create(historialPersonalCita).toPromise();

    historialPersonalCita.rellenado_por_paciente = '0'
    historialFamiliarCita.rellenado_por_paciente = '0'
    await this.historialFamiliarCitaService.create(historialFamiliarCita).toPromise();
    await this.historialPersonalCitaService.create(historialPersonalCita).toPromise();

    for (let foc_ of this.familiaresOtroCancer) {
      let foc = new FamiliarOtroCancer(this.idCita, '1', foc_['tipoCancer'], foc_['parentesco'])
      await this.familiarOtroCancerService.create(foc).toPromise();
      let foc2 = new FamiliarOtroCancer(this.idCita, '0', foc_['tipoCancer'], foc_['parentesco'])
      await this.familiarOtroCancerService.create(foc2).toPromise();
    }


    this.cita.datos_ingresados_paciente = '1'
    await this.citaService.update(this.idCita, this.cita).toPromise()
    /*
        let familiarOtroCancer = new FamiliarOtroCancer("", "1", this.tipoParentescoCancer, this.parentesco)
    
        let respuestaHistorialFamiliar = await this.historialFamiliarCitaService.create(historialFamiliarCita).toPromise();
        let respuestaHistorialPersonal = await this.historialPersonalCitaService.create(historialPersonalCita).toPromise();
        let respuestaOtrosCancer = await this.familiarOtroCancerService.create(historialPersonalCita).toPromise();
    */

    this.posicion = 'Final';
  }

  iniciarFormulario() {
    this.posicion = 'Formulario';
  }

  salir() {
    this.autenticacionService.cerrarSesion();

  }
}
