import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
      data: { titulo: "Datos ingresados son incorrectos", texto: "El número de cédula o el código de cita ingresados no están asociados a una cita, por favor compruebe los datos e inténtelo nuevamente." }, width: '400px'
    });
  }

  async dialogoFormularioRellenado() {
    const dialogRef = this.dialog.open(IngresoCitaComponentOkDialog, {
      data: { titulo: "Formulario previamente rellenado", texto: "Usted ya ha ingresado previamente los datos necesarios para esta cita, por lo que no se pueden ingresar nuevamente." }, width: '400px'
    });
  }


  async validarDatos() {
    try {
      let data = { "cedula": this.cedula, "clave": this.codigo };
      let informacion = await this.expedienteService.validarIngresoCita(data).toPromise();

      this.autenticacionService.ingresarCita(informacion["auth_token"], informacion["rol"], informacion["id_cita"]);
    } catch (error) {
      if (error.error.text == 'INVALID_LOGIN_INFO')
        this.dialogoDatosInvalidos();
      else
        this.dialogoFormularioRellenado();
      //this.dialogoFormularioRellenado();
    }
  }
}

@Component({
  selector: 'not-important',
  template: `

  <mat-dialog-content >

  <mat-card class="mi-card" style="box-shadow: none;">

      <mat-card-header>

          <mat-label class="mi-titulo" style="margin-left: -20px; font-size: 24px !important;">
          {{data.titulo}} 
          </mat-label>

          <button mat-icon-button (click)="cerrar()"
                    style="color: #AAAAAA; position: absolute; margin-left: 85%; margin-top: -15px;">
                    <mat-icon>close</mat-icon>
                </button>

      </mat-card-header>
      <br /> <br />

      <mat-card-content style="text-align: left !important; align-items: flex-start;">

          <mat-label class="mi-cuerpo">
          {{data.texto}} 
          </mat-label>

      </mat-card-content>



  </mat-card>

</mat-dialog-content>

  `, styleUrls: ['../../vistas-administrador/cita-inicio/cita-inicio.component.scss']
})

export class IngresoCitaComponentOkDialog {

  constructor(
    public dialogRef: MatDialogRef<IngresoCitaComponentOkDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }


  cerrar(): void {
    this.dialogRef.close("Ok");
  }
}
