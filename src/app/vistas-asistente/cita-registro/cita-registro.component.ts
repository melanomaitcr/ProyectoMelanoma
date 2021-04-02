import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { CitaService } from '../../services/cita.service';
import { CitaMedicos } from '../../models/citaMedicos';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Cita } from '../../models/cita';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpedienteService } from '../../services/expediente.service';


@Component({
  selector: 'app-cita-registro',
  templateUrl: './cita-registro.component.html',
  styleUrls: ['./cita-registro.component.scss']
})
export class CitaRegistroComponent implements OnInit {

  
  cita: Cita = new Cita("", null, null, null, "", "0", "0");
  nombre = '';
  hora = '';
  splittedHora = [];
  
  fechaFC = new FormControl('', [Validators.required,this.revisarFechaValidator()]);
  cedulaFC = new FormControl('', [Validators.required,this.revisarNombre()]);
  horaFC = new FormControl('', [Validators.required]);
  nombreFC = new FormControl('', [this.revisarNombre()]);

  medicos: Array<CitaMedicos> = [];
  medicoSeleccionado: CitaMedicos;

  
  constructor(
    private usuarioService: UsuarioService,
    private expedienteService: ExpedienteService,
    private _snackBar: MatSnackBar,
    private citaService: CitaService
  ) { }

  ngOnInit(): void {
    this.sacarMedicos();
    
  }

  async sacarMedicos(){
    
    let usuariosBD = await this.usuarioService.findAll().toPromise();
    //let usuariosBD = {"data": [{"cedula": "12", "nombre":"F P C"}, {"cedula": "17", "nombre":"J M Z"}]}
    let usuarios = usuariosBD["data"] as CitaMedicos[];
    this.medicos = usuarios;

  }


  getErrorMessageDate(fc: FormControl, campo: String) {
    
    if (fc.hasError('matDatepickerParse')){
      return 'Debe ingresar una fecha valida'
    }else if (fc.hasError('required')) {
      return 'Debe ingresar una ' + campo;
    } else if(fc.hasError('fechaInvalida')){
      return "Debe ingresar una fecha igual o posterior a la actual";
    }
    return '';
  }
  getErrorMessage(fc: FormControl, campo: String) {
    if (fc.hasError('cedulaNoExiste')){
      return 'La cedula no esta asociada a esta plataforma';
    }else if (fc.hasError('required')) {
      if (campo == "número de cédula para el usuario"){
      return 'Debe ingresar un ' + campo;
    } else if (campo == "hora"){
      return 'Debe ingresar una ' + campo;
    }
  }
    return '';
  }
  
  
  revisarFechaValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
    let fechaCita: Date = new Date(control.value);
    let fechaActual: Date = new Date();
    fechaActual.setHours(0,0,0,0);

    return (fechaCita < fechaActual) ? { fechaInvalida: { value: control.value } } : null;
    };
  }

  async obtenerDatosUsuario(cedula: string){
    
    try {
      let usuarioPaciente = await this.expedienteService.findByPk(cedula).toPromise();
      this.nombre = usuarioPaciente['nombre'];
      
    } catch (error) {
      this.nombre = "";
      
    
    }
  }

  revisarNombre(){
    return (control: AbstractControl): { [key: string]: any } | null => {
      let encontrado = false; 
      if (this.nombre == ""){
        encontrado = false;
      }else{
        encontrado = true;
      }
      return (encontrado) ? { cedulaNoExiste: { value: this.nombre } } : null;
      };
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
    });
  }

  formularioValido() {
    return this.cedulaFC.valid && this.nombreFC.valid && this.fechaFC.valid && this.horaFC.valid;
  }

  async registrarCita() {
    
    this.splittedHora = this.hora.split(":")
    let fechaCita: Date = new Date(this.cita.fecha_hora_cita);
    fechaCita.setHours(parseInt(this.splittedHora[0]),parseInt(this.splittedHora[1]),0,0);
    this.cita.fecha_hora_cita = String(fechaCita);
    this.cita.cedula_medico = this.medicoSeleccionado.cedula;
    
    let respuesta = await this.citaService.create(this.cita).toPromise();
    let nuevaCita = respuesta as Cita;
    
    
    this.openSnackBar("¡Su cita ha sido registrada!");
    

  }
}
