import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Cita } from '../../models/cita';


@Component({
  selector: 'app-cita-registro',
  templateUrl: './cita-registro.component.html',
  styleUrls: ['./cita-registro.component.scss']
})
export class CitaRegistroComponent implements OnInit {

  
  cita: Cita = new Cita(null, null, null, null, null, null, null);
  
  fechaFC = new FormControl('', [Validators.required,this.revisarFechaValidator()]);
  cedulaFC = new FormControl('', [Validators.required]);
  horaFC = new FormControl('', [Validators.required]);
  
  medicos: Array<string> = [];
  
  constructor(
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.sacarMedicos();
  }

  async cargarUsuarios() {
    let usuariosBD = await this.usuarioService.findAll().toPromise();
    let usuarios = usuariosBD["data"] as Usuario[]
    console.log(usuarios);
    return usuarios;
  }

  async sacarMedicos(){
    
    //let usuariosBD = await this.usuarioService.findAll().toPromise();
    let usuariosBD = {"data":[{"cedula":"101110111","contrasenna":"melanoma2021","correo_electronico":"jimmymok@gmail.com","nombre":"Jimmy","primer_apellido":"Mok","rol":"D","segundo_apellido":"Zheng"},{"cedula":"105280872","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Felipe","primer_apellido":"Pacheco","rol":"M","segundo_apellido":"Cerdas"},{"cedula":"11111222","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Jajaj","primer_apellido":"Pacheco","rol":"M","segundo_apellido":"PERRRRR"},{"cedula":"122","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"FelipeFFF","primer_apellido":"ed","rol":"A","segundo_apellido":"Cerdas"},{"cedula":"142857","contrasenna":"","correo_electronico":"felipepace10@gmail.com","nombre":"Dios","primer_apellido":"Pancrasio","rol":"A","segundo_apellido":""},{"cedula":"45","contrasenna":"melanoma2021","correo_electronico":"d@de","nombre":"rwfsds","primer_apellido":"rwsfdc","rol":"A","segundo_apellido":"CERDAS"},{"cedula":"500","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Priscilla","primer_apellido":"Pacheco","rol":"M","segundo_apellido":"Cerdas"},{"cedula":"51257","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Felipe","primer_apellido":"Pacheco","rol":"M","segundo_apellido":"Cerdas"},{"cedula":"777","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Felipe","primer_apellido":"Pacheco","rol":"M","segundo_apellido":"Cerdas"},{"cedula":"7845","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Agua","primer_apellido":"x","rol":"M","segundo_apellido":"Cerdas"},{"cedula":"845","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Felpudo","primer_apellido":"Pacheco","rol":"M","segundo_apellido":"Cerdas"}]}
    let usuarios = usuariosBD["data"] as Usuario[]
    this.medicos = [];

    for (let i of usuarios){
      if (i.rol == "M"){
        this.medicos.push(i.nombre);
      }
    }
    console.log(this.medicos);
  }

  revisarFecha(fecha: string){
    
    let fechaActual: Date = new Date();
    let fechaCita: Date = new Date(fecha);
   
    if (fechaCita > fechaActual){
      //console.log("Hola");
      return 1;
    }else{
      return 0;
    }
    
  }
  revisaString(x: string){
    if (x == "0"){
      
      return true;
    }else{
      
      return false;
      
    }
  }

  getErrorMessageDate(fc: FormControl, campo: String) {
    console.log(fc);
    if (fc.hasError('matDatepickerParse')){
      return 'Debe ingresar una fecha valida'
    }else if (fc.hasError('required')) {
      return 'Debe ingresar una ' + campo;
    } else if(fc.hasError('fechaInvalida')){
      return "Debe ingresar una fecha igual o posterior a la actual";
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

}
