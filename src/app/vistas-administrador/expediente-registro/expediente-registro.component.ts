import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Expediente } from 'src/app/models/expediente';
import { ExpedienteService } from '../../services/expediente.service';
import { DatePipe } from '@angular/common';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-expediente-registro',
  templateUrl: './expediente-registro.component.html',
  styleUrls: ['./expediente-registro.component.scss']
})
export class ExpedienteRegistroComponent implements OnInit {

  roles = ["Médico", "Asistente"]

  esconder = true;
  fecha = null;
  expediente: Expediente = new Expediente("", "", "", "", "", "", "", "", "", "", "", null);
  datepipe: DatePipe = new DatePipe('en-GB');

  cedulaFC = new FormControl('', [Validators.required, this.pkDuplicadaValidator(), Validators.pattern('[0-9]*')]);
  nombreFC = new FormControl('', [Validators.required]);
  primer_apellidoFC = new FormControl('', [Validators.required]);
  correo_electronicoFC = new FormControl('', [Validators.required, Validators.email, this.correoDuplicadoValidator()]);
  nacionalidadFC = new FormControl('', [Validators.required]);
  fecha_nacimientoFC = new FormControl('', [Validators.required]);
  domicilio_provinciaFC = new FormControl('', [Validators.required]);
  domicilio_cantonFC = new FormControl('', [Validators.required]);
  domicilio_distritoFC = new FormControl('', [Validators.required]);
  identidad_etnicaFC = new FormControl('', [Validators.required]);
  numero_telefonoFC = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  cedulaExpediente: String;
  expedientes: Expediente[];


  constructor(private expedienteService: ExpedienteService,
    public dialog: MatDialog,
    public referenciaDialogo: MatDialogRef<ExpedienteRegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    //this.cedulaExpediente = this.route.snapshot.paramMap.get('cedula');
    this.cargarExpedientes();
  }

  async cargarExpedientes() {
    let expedientesBD = await this.expedienteService.findAll().toPromise();
    this.expedientes = expedientesBD["data"] as Expediente[]
  }

  pkDuplicadaValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.expedientes == undefined) return null;

      let encontrado = false;
      for (let expediente of this.expedientes)
        if (this.cedulaExpediente != control.value &&
          expediente.cedula == control.value) encontrado = true;

      return encontrado ? { pkDuplicada: { value: control.value } } : null;
    };
  }

  correoDuplicadoValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.expedientes == undefined) return null;

      let encontrado = false;
      for (let expediente of this.expedientes)
        if (this.cedulaExpediente != expediente.cedula &&
          expediente.correo_electronico == control.value) encontrado = true;


      return encontrado ? { correoDuplicado: { value: control.value } } : null;
    };
  }

  async registrarExpediente() {
    this.expediente.fecha_nacimiento = String(this.fecha);
    let respuesta = await this.expedienteService.create(this.expediente).toPromise();
    let nuevoUsuario = respuesta as Expediente;

    this.referenciaDialogo.close(nuevoUsuario);

  }

  cerrar() {
    this.referenciaDialogo.close();
  }

  formularioValido() {
    return this.cedulaFC.valid && this.nombreFC.valid && this.primer_apellidoFC.valid && this.correo_electronicoFC.valid && this.nacionalidadFC.valid && this.fecha_nacimientoFC.valid && this.domicilio_provinciaFC.valid && this.domicilio_cantonFC.valid && this.domicilio_distritoFC.valid && this.identidad_etnicaFC.valid && this.numero_telefonoFC.valid;
  }

  getErrorMessage(fc: FormControl, campo: String) {

    if (fc.hasError('required')) {
      return 'Debe ingresar un ' + campo;
    } else if (fc.hasError('email')) {
      return 'Debe ingresar un correo electrónico válido';
    } else if (fc.hasError('pkDuplicada')) {
      return 'Ya existe un paciente con ese número de cédula';
    } else if (fc.hasError('correoDuplicado')) {
      return 'Ya existe un paciente con ese correo electrónico';
    } else if (fc.hasError('pattern')) {
      return 'La cédula debe contener únicamente números';
    }
    return '';
  }

}
