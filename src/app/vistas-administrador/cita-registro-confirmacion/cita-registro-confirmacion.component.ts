import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Expediente } from 'src/app/models/expediente';
import { Usuario } from 'src/app/models/usuario';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Cita } from "../../models/cita";
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-cita-registro-confirmacion',
  templateUrl: './cita-registro-confirmacion.component.html',
  styleUrls: ['./cita-registro-confirmacion.component.scss']
})
export class CitaRegistroConfirmacionComponent implements OnInit {
  idCita: String;
  cita: Cita = new Cita("", "", "", "", "", "", "", "", "");
  citaData = {
    nombrePaciente: "",
    nombreMedico: "",
    fecha: "",
    hora: "",
  };

  public datepipe: DatePipe = new DatePipe('es-ES');

  constructor(private citaService: CitaService,
    private expedienteService: ExpedienteService,
    private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public referenciaDialogo: MatDialogRef<CitaRegistroConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    //this.cedulaCita = this.route.snapshot.paramMap.get('cedula');
    this.idCita = this.data['idCita']
    this.cargarCita(this.idCita);
  }

  async cargarCita(idCita: String) {
    this.cita = await this.citaService.findByPk(idCita).toPromise() as Cita;

    let fhc = new Date(this.cita.fecha_hora_cita);
    fhc.setHours(fhc.getHours() + 6);

    this.citaData.fecha = this.capitalizar(this.datepipe.transform(new Date(fhc), 'EEEE, d ')) + 'de ' + this.capitalizar(this.datepipe.transform(new Date(fhc), 'MMMM'));
    this.citaData.hora = this.datepipe.transform(new Date(fhc), 'hh:mm') + this.datepipe.transform(new Date(fhc), ' a').toLowerCase();

    await this.getNombrePaciente();
    await this.getNombreMedico();
  }

  capitalizar(palabra: string) {
    return palabra[0].toUpperCase() + palabra.substr(1).toLowerCase();
  }

  cerrar() {
    this.referenciaDialogo.close();
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
    });
  }

  async getNombrePaciente() {
    let expediente = await this.expedienteService.findByPk(this.cita.cedula_paciente).toPromise() as Expediente
    this.citaData.nombrePaciente = expediente.nombre + " " + expediente.primer_apellido + " " + expediente.segundo_apellido;
  }

  async getNombreMedico() {
    let usuario = await this.usuarioService.findByPk(this.cita.cedula_medico).toPromise() as Usuario
    this.citaData.nombreMedico = usuario.nombre + " " + usuario.primer_apellido + " " + usuario.segundo_apellido;
  }
  /*
    getDomicilio(cita: Cita) {
      return cita.domicilio_provincia + ", " + cita.domicilio_canton + ", " + cita.domicilio_distrito;
    }
    */
}

