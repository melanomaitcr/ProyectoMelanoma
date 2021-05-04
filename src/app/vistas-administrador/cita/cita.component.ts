import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Expediente } from '../../models/expediente';
import { ExpedienteService } from '../../services/expediente.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ExpedienteEdicionComponent } from '../expediente-edicion/expediente-edicion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpedienteBorradoComponent } from '../expediente-borrado/expediente-borrado.component';
import { ExpedienteRegistroComponent } from '../expediente-registro/expediente-registro.component';
import { ExpedienteRegistroConfirmacionComponent } from '../expediente-registro-confirmacion/expediente-registro-confirmacion.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaService } from 'src/app/services/cita.service';
import { Cita } from 'src/app/models/cita';
import { DatePipe } from '@angular/common';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ArchivoCita } from 'src/app/models/archivoCita';
import { ArchivoCitaService } from 'src/app/services/archivo-cita.service';
import { stringify } from '@angular/compiler/src/util';
import { HistorialPersonalCita } from 'src/app/models/historialPersonalCita';
import { HistorialPersonalCitaService } from 'src/app/services/historial-personal-cita.service';
import { HistorialFamiliarCitaService } from 'src/app/services/historial-familiar-cita.service';
import { HistorialFamiliarCita } from 'src/app/models/historialFamiliarCita';
import { addHours } from 'date-fns';
import { FamiliarOtroCancer } from 'src/app/models/familiarOtroCancer';
import { FamiliarOtroCancerService } from 'src/app/services/familiar-otro-cancer.service';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss']
})
export class CitaComponent implements OnInit {

  idCita = "1";
  cita: Cita = new Cita("", "", "", "", "", "", "", "", "");
  citaData = {
    nombrePaciente: "",
    nombreMedico: "",
    fecha: "",
    hora: "",
  };
  hpc: HistorialPersonalCita = new HistorialPersonalCita(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,);
  hfc: HistorialFamiliarCita = new HistorialFamiliarCita(null, null, null, null, null,);
  imagenes: ArchivoCita[] = [];
  archivos: ArchivoCita[] = [];
  familiaresOtroCancer: FamiliarOtroCancer[] = [];
  //insert into archivo_cita values('6', '1', 'Jaja.pdf', 'http://melanomaitcr.pythonanywhere.com/files/archivo_cita_2_Notas.pdf', 'A')
  public datepipe: DatePipe = new DatePipe('es-ES');

  constructor(private expedienteService: ExpedienteService,
    private citaService: CitaService,
    private usuarioService: UsuarioService,
    private archivoCitaService: ArchivoCitaService,
    private historialPersonalCitaService: HistorialPersonalCitaService,
    private historialFamiliarCitaService: HistorialFamiliarCitaService,
    private familiarOtroCancerService: FamiliarOtroCancerService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.idCita = this.route.snapshot.paramMap.get('idCita');
    this.cargarCita();
    this.cargarArchivos();
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

  async cargarCita() {
    //let historialPersonalCita = new HistorialPersonalCita(this.idCita, '1', 70.2, 1.75, 20, '1', 20, '0', null, '1', 20, '0', null, '0', null, null);
    //await this.historialPersonalCitaService.create(historialPersonalCita).toPromise();
    // insert into familiar_otro_cancer values('1','1','Pulmón','Madre');
    // insert into familiar_otro_cancer values('1','1','Estómago','Tío Paterno');

    this.cita = await this.citaService.findByPk(this.idCita).toPromise() as Cita;

    let fhc = new Date(this.cita.fecha_hora_cita);
    fhc.setHours(fhc.getHours() + 6);

    this.citaData.fecha = this.capitalizar(this.datepipe.transform(new Date(fhc), 'EEEE, d ')) + 'de ' + this.capitalizar(this.datepipe.transform(new Date(fhc), 'MMMM'));
    this.citaData.hora = this.datepipe.transform(new Date(fhc), 'hh:mm') + this.datepipe.transform(new Date(fhc), ' a').toLowerCase();

    await this.getNombrePaciente();
    await this.getNombreMedico();
    await this.getHistorialPersonal();
    await this.getHistorialFamiliar();

  }

  abrirImagen(imagen: ArchivoCita) {
    window.open(imagen.url_archivo, "_blank");
  }

  descargarArchivo(archivo: ArchivoCita) {
    window.open(archivo.url_archivo, "_blank");
  }

  async prediagnosticarImagen(imagen: ArchivoCita) {
    imagen.imagen_prediagnostico = "Resultado del predignóstico: No tiene cáncer"
    await this.archivoCitaService.update(imagen.id_archivo, imagen).toPromise();
  }

  descagarPrediagnostico(imagen: ArchivoCita) {
    let archivoResultado = new Blob([imagen.imagen_prediagnostico], { type: '.txt' });
    const url = window.URL.createObjectURL(archivoResultado);
    this.archivoCitaService.descargarArchivo(url, imagen.nombre_archivo, this.cita.cedula_paciente);
  }

  async borrarArchivo(archivo: ArchivoCita) {
    await this.archivoCitaService.delete(archivo.id_archivo).toPromise();
    this.cargarArchivos();
  }

  abandonarCita() {
    this.router.navigate(['citas']);
  }

  subirArchivos() {
    document.querySelector('input').click()
  }

  async finalizarCita() {
    this.cita.fecha_hora_cita = String(addHours(new Date(this.cita.fecha_hora_cita), 6));
    this.cita.cita_finalizada = '1';
    await this.citaService.update(this.idCita, this.cita).toPromise();
    this.router.navigate(['citas']);

  }

  async archivosSubidos(evento) {
    let archivos: FileList = evento.srcElement.files;

    for (let i = 0; i <= archivos.length; i++) {
      let reader = new FileReader();

      try {
        reader.readAsDataURL(archivos[i]);
        let ref = this;
        reader.onload = async function () {
          let archivoBase64 = (reader.result as string).split(',')[1];

          let nombreArchivo = archivos[i].name;
          let tipoArchivo = (nombreArchivo.includes('.png') || nombreArchivo.includes('.jpg') || nombreArchivo.includes('.jpeg') || nombreArchivo.includes('.svg') || nombreArchivo.includes('.gif')) ? 'I' : 'A';

          let archivoCita = new ArchivoCita('1', ref.idCita, nombreArchivo, archivoBase64, tipoArchivo, null);
          console.log(archivoCita);

          await ref.archivoCitaService.create(archivoCita).toPromise();

          ref.cargarArchivos();
          //  await ref.enviarArchivos(archivosBase64, nombresArchivos);
        };

      } catch (error) { }
    }

  }

  async enviarArchivos(archivosBase64: string[], nombresArchivos: string[]) {
    console.log(nombresArchivos);

    for (let i = 0; i <= archivosBase64.length; i++) {
      let nombreArchivo = nombresArchivos[i];
      let tipoArchivo = (nombreArchivo.includes('.png') || nombreArchivo.includes('.jpg') || nombreArchivo.includes('.jpeg') || nombreArchivo.includes('.svg') || nombreArchivo.includes('.gif')) ? 'I' : 'A';

      let archivoCita = new ArchivoCita('1', this.idCita, nombresArchivos[i], archivosBase64[i], tipoArchivo, '');
      await this.archivoCitaService.create(archivoCita).toPromise();
    }
    this.cargarArchivos();
  }

  capitalizar(palabra: string) {
    return palabra[0].toUpperCase() + palabra.substr(1).toLowerCase();
  }

  async getNombrePaciente() {
    let expediente = await this.expedienteService.findByPk(this.cita.cedula_paciente).toPromise() as Expediente
    this.citaData.nombrePaciente = expediente.nombre + " " + expediente.primer_apellido + " " + expediente.segundo_apellido;
  }

  async getNombreMedico() {
    let usuario = await this.usuarioService.findByPk(this.cita.cedula_medico).toPromise() as Usuario
    this.citaData.nombreMedico = usuario.nombre + " " + usuario.primer_apellido + " " + usuario.segundo_apellido;
  }

  async getHistorialPersonal() {
    this.hpc = await this.historialPersonalCitaService.findByPk(this.cita.id_cita, '1').toPromise() as HistorialPersonalCita;
  }

  async getHistorialFamiliar() {
    this.hfc = await this.historialFamiliarCitaService.findByPk(this.cita.id_cita, '1').toPromise() as HistorialFamiliarCita;
    let fsoc = (await this.familiarOtroCancerService.findAll().toPromise())['data'] as FamiliarOtroCancer[];
    for (let foc of fsoc)
      if (foc.id_cita == this.idCita)
        this.familiaresOtroCancer.push(foc);
  }

  getNombre(expediente: Expediente) {
    return expediente.nombre + " " + expediente.primer_apellido + " " + expediente.segundo_apellido;
  }

}
