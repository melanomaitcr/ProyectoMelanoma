import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../services/usuario.service';
import { CitaService } from '../../services/cita.service';
import { CitaMedico } from '../../models/citaMedico';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Cita } from '../../models/cita';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpedienteService } from '../../services/expediente.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ActivatedRoute } from '@angular/router';
import { Expediente } from 'src/app/models/expediente';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss']
})
export class CitaComponent implements OnInit {

  id_cita: string;
  expediente: Expediente = new Expediente("", "", "", "", "");
  cita: Cita = new Cita("", null, null, null, "", "0", "0");
  hora = "";
  fecha = "";
  public datepipe: DatePipe = new DatePipe('en-GB');

  constructor(
    private autenticacionService: AutenticacionService,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private expedienteService: ExpedienteService,
    private citaService: CitaService,

  ) { }

  ngOnInit(): void {
    this.id_cita = this.route.snapshot.paramMap.get('id_cita');
    this.cargarCita();

  }

  async cargarCita() {

    this.cita = await this.citaService.findByPk(this.id_cita).toPromise() as Cita;
    this.expediente = await this.expedienteService.findByPk(this.cita.cedula_paciente).toPromise() as Expediente;
    this.expediente.nombre = this.expediente.nombre + " " + this.expediente.primer_apellido + " " + this.expediente.segundo_apellido;

    let fhc = new Date(this.cita.fecha_hora_cita);
    fhc.setHours(fhc.getHours() + 6);

    this.fecha = this.datepipe.transform(new Date(fhc), 'dd/MM/yyyy');
    this.hora = this.datepipe.transform(new Date(fhc), 'hh:mm:ss a');

    //this.hora = String(new Date(this.cita.fecha_hora_cita).toLocaleTimeString('en-GB', { timeZone: 'GMT-0600' }));
    //this.cita.fecha_hora_cita = new Date(this.cita.fecha_hora_cita).toLocaleString('en-GB', { timeZone: 'GMT-0600' });

    console.log(this.cita.fecha_hora_cita);
    //hora = this.cita.fecha_hora_cita.
    //    this.autenticacionService.removeData();

  }
}
