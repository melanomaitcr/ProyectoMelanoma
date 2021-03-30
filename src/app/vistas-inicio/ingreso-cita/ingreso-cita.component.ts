import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cita } from 'src/app/models/cita';
import { CitaService } from 'src/app/services/cita.service';
import { ExpedienteService } from 'src/app/services/expediente.service';

@Component({
  selector: 'app-ingreso-cita',
  templateUrl: './ingreso-cita.component.html',
  styleUrls: ['./ingreso-cita.component.scss']
})
export class IngresoCitaComponent implements OnInit {
  cedulaFC = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]);
  codigoFC = new FormControl('', [Validators.required]);
  cedula: string;
  codigo: string;
  constructor(private router: Router, 
    private expedienteService: ExpedienteService,
    private citaService: CitaService,
    public dialog: MatDialog) { }

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


  async validarDatos(){
   try {
    let encontrado=false;
    let cedula = await this.expedienteService.findByPk(this.cedula).toPromise();
    let citasBD = await this.citaService.findByUser(this.cedula).toPromise();
    let citas = citasBD["data"] as Cita[];
    citas.forEach(cita => {
      if (this.codigo == cita.clave){
        this.router.navigate(['/usuarios']);
        encontrado=true;
      }
    });
    if(!encontrado) this.dialogoDatosInvalidos();;
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
