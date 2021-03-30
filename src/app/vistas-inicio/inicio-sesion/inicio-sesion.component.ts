import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})

export class InicioSesionComponent implements OnInit {
  correo_electronicoFC = new FormControl('', [Validators.required, Validators.email]);
  contrasennaFC = new FormControl('', [Validators.required]);
  esconder = true;
  correoElectronico: string;
  contrasenna: string;
  constructor(private router: Router, 
    private usuarioService: UsuarioService, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  getErrorMessage(fc: FormControl, campo: String) {
    if (fc.hasError('required')) {
      return 'Debe ingresar un ' + campo;
    }
    return this.correo_electronicoFC.hasError('email') ? 'Debe ingresar un correo electrónico válido' : '';
  }

  inicioValido() {
    return this.correo_electronicoFC.valid && this.contrasennaFC.valid;
  }

  async dialogoDatosInvalidos() {

    const dialogRef = this.dialog.open(InicioSesionComponentOkDialog, {
      width: '400px'
    });
  }

  async verificarDatos(){
    try {
      let usuariosBD = await this.usuarioService.findAll().toPromise();
      let usuarios = usuariosBD["data"] as Usuario[];
      let encontrado: boolean;
      usuarios.forEach(usuario => {
        if (this.correoElectronico == usuario.correo_electronico && this.contrasenna == usuario.contrasenna){
          if (usuario.rol=="D") {
            this.router.navigate(['/usuarios']);
          }else if (usuario.rol =="A"){
            this.router.navigate(['/registro-cita']);
          }else{
  
          }
          encontrado=true;
        }
      }); 
      if (!encontrado) this.dialogoDatosInvalidos();
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
  <div mat-label style="text-align:center;"> El correo o contraseña ingresados son incorrectos, por favor compruebe los datos e intentelo nuevamente.</div>
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
