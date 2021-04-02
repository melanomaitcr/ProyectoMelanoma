import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cita } from 'src/app/models/cita';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CitaService } from 'src/app/services/cita.service';
import { ExpedienteService } from 'src/app/services/expediente.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-ingreso-cita',
  templateUrl: './ingreso-cita.component.html',
  styleUrls: ['./ingreso-cita.component.scss']
})



export class IngresoCitaComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  cedulaFC = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]);
  codigoFC = new FormControl('', [Validators.required]);
  cedula: string;
  codigo: string;
  constructor(private expedienteService: ExpedienteService,
    private citaService: CitaService,
    public dialog: MatDialog,
    private autenticacionService: AutenticacionService) { }

  ngOnInit(): void {
  }

  getErrorMessage(fc: FormControl, campo: String) {
    if (fc.hasError('required')) {
      return 'Debe ingresar un' + campo;
    }
    return 'La cédula debe contener únicamente números'
  }

  ingresoValido() {
    return this.cedulaFC.valid && this.codigoFC.valid;
  }

  async dialogoDatosInvalidos() {

    const dialogRef = this.dialog.open(IngresoCitaComponentOkDialog, {
      width: '400px'
    });
  }


  async validarDatos() {
    try {
      let data = { "cedula": this.cedula, "clave": this.codigo };
      let informacion = await this.expedienteService.validarIngresoCita(data).toPromise();

      this.autenticacionService.ingresarCita(informacion["auth_token"], informacion["rol"], informacion["id_cita"]);
    } catch (error) {
      this.dialogoDatosInvalidos();
    }
  }
}

@Component({
  selector: 'not-important',
  template: `
  <h1 mat-dialog-title style="text-align:center;">Datos ingresados son incorrectos</h1>
<div mat-dialog-content> 
<div mat-label style="text-align:center;">El número de cédula o el código de cita ingresados no están asociados a una cita, por favor compruebe los datos e intentelo nuevamente.</div>
</div>
<div mat-dialog-actions style="justify-content: center;">
<button mat-raised-button style="margin-top: 15px; margin-bottom:15px"  color="primary" (click)=siClick()>Entendido</button>
</div>
  `
})

export class IngresoCitaComponentOkDialog {

  constructor(
    public dialogRef: MatDialogRef<IngresoCitaComponentOkDialog>
  ) {
  }


  siClick(): void {
    this.dialogRef.close("Ok");
  }
}
