import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Expediente } from "../../models/expediente";
import { ExpedienteService } from '../../services/expediente.service';

@Component({
  selector: 'app-expediente-registro-visualizacion-asistente',
  templateUrl: './expediente-registro-visualizacion-asistente.component.html',
  styleUrls: ['./expediente-registro-visualizacion-asistente.component.scss']
})
export class ExpedienteRegistroVisualizacionAsistenteComponent implements OnInit {
  cedulaExpediente: String;
  expediente: Expediente = new Expediente("", "", "", "", "", "", "", "", "", "", "", 0);
  public datepipe: DatePipe = new DatePipe('en-GB');

  constructor(private expedienteService: ExpedienteService,
    public dialog: MatDialog,
    public referenciaDialogo: MatDialogRef<ExpedienteRegistroVisualizacionAsistenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    //this.cedulaExpediente = this.route.snapshot.paramMap.get('cedula');
    this.cedulaExpediente = this.data['cedula']
    this.cargarExpediente(this.cedulaExpediente);
  }

  async cargarExpediente(cedulaExpediente: String) {
    this.expediente = await this.expedienteService.findByPk(cedulaExpediente).toPromise() as Expediente;
    let fhc = new Date(this.expediente.fecha_nacimiento);
    fhc.setHours(fhc.getHours() + 6);
    this.expediente.fecha_nacimiento = this.datepipe.transform(new Date(fhc), 'dd/MM/yyyy');
  }

  cerrar() {
    this.referenciaDialogo.close();
  }

  getNombre(expediente: Expediente) {
    return expediente.nombre + " " + expediente.primer_apellido + " " + expediente.segundo_apellido;
  }

  getDomicilio(expediente: Expediente) {
    return expediente.domicilio_provincia + ", " + expediente.domicilio_canton + ", " + expediente.domicilio_distrito;
  }
}
