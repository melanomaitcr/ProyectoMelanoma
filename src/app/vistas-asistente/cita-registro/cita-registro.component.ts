import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { CitaMedicos } from '../../models/citaMedicos';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Cita } from '../../models/cita';
import { ExpedienteService } from '../../services/expediente.service';


@Component({
  selector: 'app-cita-registro',
  templateUrl: './cita-registro.component.html',
  styleUrls: ['./cita-registro.component.scss']
})
export class CitaRegistroComponent implements OnInit {

  
  cita: Cita = new Cita(null, null, null, null, null, null, null);
  nombre = '';
  
  fechaFC = new FormControl('', [Validators.required,this.revisarFechaValidator()]);
  cedulaFC = new FormControl('', [Validators.required]);
  horaFC = new FormControl('', [Validators.required]);
  
  medicos: Array<CitaMedicos> = [];
  medicoSeleccionado: CitaMedicos;
  
  constructor(
    private usuarioService: UsuarioService,
    private expedienteService: ExpedienteService,

  ) { }

  ngOnInit(): void {
    this.sacarMedicos();
    
  }

  async sacarMedicos(){
    
    let usuariosBD = await this.usuarioService.findAll().toPromise();
    //let usuariosBD = {"data": [{"cedula": "12", "nombre":"F P C"}, {"cedula": "17", "nombre":"J M Z"}]}
    let usuarios = usuariosBD["data"] as CitaMedicos[];
    this.medicos = usuarios;
    this.medicoSeleccionado = this.medicos[0];

    //console.log(this.medicos);
  }


  revisaString(x: string){
    if (x == "0"){
      
      return true;
    }else{
      
      return false;
      
    }
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
    if (fc.hasError('required')) {
      return 'Debe ingresar un ' + campo;
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
      this.nombre = '';
    }
  }

}
