import { Component, Inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CitaService } from '../../services/cita.service';
import { CitaMedico } from '../../models/citaMedico';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Cita } from '../../models/cita';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpedienteService } from '../../services/expediente.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Expediente } from 'src/app/models/expediente';
import { Usuario } from 'src/app/models/usuario';
import { FamiliarOtroCancer } from 'src/app/models/familiarOtroCancer';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}


@Component({
  selector: 'app-familiar-cancer-edicion',
  templateUrl: './familiar-cancer-edicion.component.html',
  styleUrls: ['./familiar-cancer-edicion.component.scss']
})
export class FamiliarCancerEdicionComponent implements OnInit {

  textoBoton = ""

  constructor(
    public referenciaDialogo: MatDialogRef<FamiliarCancerEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FamiliarOtroCancer
  ) {
    if (data.parentesco == "" && data.tipo_cancer == "") this.textoBoton = "Registrar"
    else this.textoBoton = "Actualizar"
  }

  ngOnInit(): void {
  }

  cerrar() {
    this.referenciaDialogo.close();
  }

  registrar() {
    this.referenciaDialogo.close(this.data);
  }

}
