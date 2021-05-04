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
import { DatePipe } from '@angular/common';
import { Usuario } from 'src/app/models/usuario';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}


@Component({
  selector: 'app-cita-edicion',
  templateUrl: './cita-edicion.component.html',
  styleUrls: ['./cita-edicion.component.scss']
})
export class CitaEdicionComponent implements OnInit {

  idCita = "";
  cita: Cita = new Cita("", null, null, null, "", "0", "0", "", "");
  nombre = '';
  fecha = new Date();
  hora = '';
  splittedHora = [];
  public datepipe: DatePipe = new DatePipe('es-ES');

  fechaFC = new FormControl('', [Validators.required, this.revisarFechaValidator()]);
  cedulaFC = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')], [this.revisarNombre()]);
  horaFC = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  medicos: Array<Usuario> = [];
  medicoSeleccionado: Usuario;

  constructor(
    private usuarioService: UsuarioService,
    private expedienteService: ExpedienteService,
    private _snackBar: MatSnackBar,
    private citaService: CitaService,
    private router: Router,
    public referenciaDialogo: MatDialogRef<CitaEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.idCita = this.data['idCita']

    this.cargarCita();
  }

  async cargarCita() {
    console.log(this);

    this.cita = await this.citaService.findByPk(this.idCita).toPromise() as Cita;
    console.log(this.cita);


    let fhc = new Date(this.cita.fecha_hora_cita);
    fhc.setHours(fhc.getHours() + 6);

    this.fecha = fhc;
    this.hora = this.datepipe.transform(new Date(fhc), 'HH:mm');

    await this.sacarMedicos();

  }

  async sacarMedicos() {

    let usuariosBD = await this.usuarioService.findAll().toPromise();
    let usuarios = usuariosBD["data"] as Usuario[];
    for (let usuario of usuarios) if (usuario.rol == 'M') this.medicos.push(usuario)

    this.medicoSeleccionado = this.medicos[0];

    for (let medico of this.medicos)
      medico.nombre = medico.nombre + " " + medico.primer_apellido + " " + medico.segundo_apellido

    console.log(this.medicos);
    console.log(this.cita);


    for (let medico of this.medicos)
      if (medico.cedula == this.cita.cedula_medico)
        this.medicoSeleccionado = medico;

    console.log(this);


  }


  getErrorMessageDate(fc: FormControl, campo: String) {

    if (fc.hasError('matDatepickerParse')) {
      return 'Debe ingresar una fecha válida'
    } else if (fc.hasError('required')) {
      return 'Debe ingresar una ' + campo;
    } else if (fc.hasError('fechaInvalida')) {
      return "Debe ingresar una fecha igual o posterior a la actual";
    }
    return '';
  }

  getErrorMessage(fc: FormControl, campo: String) {
    if (fc.hasError('required')) {
      if (campo == 'cedulaPac') {
        return 'Debe ingresar un ' + "número de cédula para el paciente de la cita";
      } else if (campo == 'hora') {
        return 'Debe ingresar una ' + "hora para la cita";
      }
    } else if (fc.hasError('pattern')) {
      return 'La cédula debe contener únicamente números';
    } else if (fc.hasError('cedulaNoExiste')) {
      return 'La cedula no esta asociada a ningún paciente registrado';
    } else
      return '';
  }


  revisarFechaValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let fechaCita: Date = new Date(control.value);
      let fechaActual: Date = new Date();
      fechaActual.setHours(0, 0, 0, 0);

      return (fechaCita < fechaActual) ? { fechaInvalida: { value: control.value } } : null;
    };
  }

  async obtenerDatosUsuario(cedula: string) {
    if (cedula == "") {
      this.nombre = "";
      return;
    }

    try {
      let usuarioPaciente = await this.expedienteService.findByPk(cedula).toPromise();
      let paciente = usuarioPaciente as Expediente;
      this.nombre = paciente.nombre + " " + paciente.primer_apellido + " " + paciente.segundo_apellido;
    } catch (error) {
      this.nombre = "";
    }
  }

  cerrar() {
    this.referenciaDialogo.close();
  }

  revisarNombre() {
    return async (control: AbstractControl): Promise<{ [key: string]: any; } | null> => {
      await this.obtenerDatosUsuario(control.value);
      return this.nombre == "" ? { cedulaNoExiste: { value: this.nombre } } : null;
    };
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
    });
  }

  formularioValido() {
    return this.cedulaFC.valid && this.fechaFC.valid && this.horaFC.valid;
  }

  async actualizarCita() {
    this.splittedHora = this.hora.split(":")
    let fechaCita: Date = new Date(this.fecha);
    fechaCita.setHours(parseInt(this.splittedHora[0]), parseInt(this.splittedHora[1]), 0, 0);
    this.cita.fecha_hora_cita = String(fechaCita);

    this.cita.cedula_medico = this.medicoSeleccionado.cedula;
    let respuesta = await this.citaService.update(this.idCita, this.cita).toPromise();
    let nuevaCita = respuesta as Cita;

    this.openSnackBar("¡Cita actualizada exitosamente!");
    this.cerrar()
  }
}
