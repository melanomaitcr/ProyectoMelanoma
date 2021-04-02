import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ErrorStateMatcher } from '@angular/material/core';

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
  cedulaFC = new FormControl('', [Validators.required]);
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
  }

  inicioValido() {
    return this.cedulaFC.valid && this.contrasennaFC.valid;
  }

  async dialogoDatosInvalidos() {

    const dialogRef = this.dialog.open(InicioSesionComponentOkDialog, {
      width: '400px'
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


@Component({
  selector: 'not-important',
  template: `
    <h1 mat-dialog-title style="text-align:center;">Datos ingresados son incorrectos</h1>
  <div mat-dialog-content> 
  <div mat-label style="text-align:center;"> La cédula o contraseña ingresadas son incorrectas, por favor compruebe los datos e intentelo nuevamente.</div>
  </div>
  <div mat-dialog-actions style="justify-content: center;">
  <button mat-raised-button style="margin-top: 15px; margin-bottom:15px"  color="primary" (click)=siClick()>Entendido</button>
  </div>
    `
})

export class InicioSesionComponentOkDialog {

  constructor(
    public dialogRef: MatDialogRef<InicioSesionComponentOkDialog>
  ) {
  }


  siClick(): void {
    this.dialogRef.close("Ok");
  }
}
