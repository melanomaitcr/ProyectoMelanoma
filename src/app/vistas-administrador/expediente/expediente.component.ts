import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cita } from 'src/app/models/cita';
import { Expediente } from 'src/app/models/expediente';
import { FamiliarOtroCancer } from 'src/app/models/familiarOtroCancer';
import { HistorialFamiliarCita } from 'src/app/models/historialFamiliarCita';
import { HistorialPersonalCita } from 'src/app/models/historialPersonalCita';
import { CitaService } from 'src/app/services/cita.service';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { FamiliarOtroCancerService } from 'src/app/services/familiar-otro-cancer.service';
import { HistorialFamiliarCitaService } from 'src/app/services/historial-familiar-cita.service';
import { HistorialPersonalCitaService } from 'src/app/services/historial-personal-cita.service';

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

  constructor(private expedienteService: ExpedienteService,
    private route: ActivatedRoute,
    private router: Router,
    private citaService: CitaService,
    private historialPersonalCitaService: HistorialPersonalCitaService,
    private historialFamiliarCitaService: HistorialFamiliarCitaService,
    private familiarOtroCancerService: FamiliarOtroCancerService,) { }

  ngOnInit(): void {
    document.getElementById("Expediente").style.display = "block";
    this.cedula = this.route.snapshot.paramMap.get('cedula');
    this.cargarPaciente(this.cedula);
    this.getHistoriales();
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
