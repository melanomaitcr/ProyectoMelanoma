import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Expediente } from "../../models/expediente";
import { ExpedienteService } from '../../services/expediente.service';

@Component({
  selector: 'app-expediente-borrado',
  templateUrl: './expediente-borrado.component.html',
  styleUrls: ['./expediente-borrado.component.scss']
})
export class ExpedienteBorradoComponent implements OnInit {

  cedulaExpediente: String;
  expediente: Expediente = new Expediente("", "", "", "", "", "", "", "", "", "", "", 0);
  public datepipe: DatePipe = new DatePipe('en-GB');

  constructor(private expedienteService: ExpedienteService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public referenciaDialogo: MatDialogRef<ExpedienteBorradoComponent>,
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

  async borrarExpediente() {
    let respuesta = await this.expedienteService.delete(this.cedulaExpediente).toPromise();
    console.log(respuesta);
    this.openSnackBar("¡Paciente eliminado correctamente!");
    this.referenciaDialogo.close();
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
    });
  }

  getNombre(expediente: Expediente) {
    return expediente.nombre + " " + expediente.primer_apellido + " " + expediente.segundo_apellido;
  }

  getDomicilio(expediente: Expediente) {
    return expediente.domicilio_provincia + ", " + expediente.domicilio_canton + ", " + expediente.domicilio_distrito;
  }
}
