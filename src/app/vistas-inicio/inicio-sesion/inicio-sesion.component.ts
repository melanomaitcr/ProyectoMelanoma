import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { IngresoCitaComponentOkDialog } from '../ingreso-cita/ingreso-cita.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})


export class InicioSesionComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  cedulaFC = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]);
  contrasennaFC = new FormControl('', [Validators.required]);
  esconder = true;
  cedula: string;
  contrasenna: string;
  constructor(private router: Router,
    private usuarioService: UsuarioService,
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

  inicioValido() {
    return this.cedulaFC.valid && this.contrasennaFC.valid;
  }

  async dialogoDatosInvalidos() {
    const dialogRef = this.dialog.open(IngresoCitaComponentOkDialog, {
      data: { titulo: "Datos ingresados son incorrectos", texto: "La cédula o contraseña ingresadas son incorrectas, por favor compruebe los datos e inténtelo nuevamente." }, width: '400px'
    });
  }


  async verificarDatos() {
    try {
      let data = { "cedula": this.cedula, "contrasenna": this.contrasenna };
      let informacion = await this.usuarioService.validarInicioSesion(data).toPromise();
      console.log(informacion);


      this.autenticacionService.iniciarSesion(informacion["auth_token"], informacion["rol"]);

    } catch (error) {
      this.dialogoDatosInvalidos();
    }
  }
}

