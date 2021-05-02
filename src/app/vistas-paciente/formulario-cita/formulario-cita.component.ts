import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';


@Component({
  selector: 'app-formulario-cita',
  templateUrl: './formulario-cita.component.html',
  styleUrls: ['./formulario-cita.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class FormularioCitaComponent implements OnInit {
  
  familiar ='';
  nombre = '';
  cedula = '';
  fecha = '';
  nacionalidad = '';

  correoElectronico = '';
  telefono = '';
  provincia = '';
  distrito = '';
  canton = '';

  peso = '';
  estatura = '';
  imc = '';

  actividadFisicaPorSemana = '';
  empezoFumar = '';
  fumaActualmente = '';
  actividadFisicaRadioButton = '';
  fumaRadioButton = '';
  fumaActualmenteRadioButton = '';

  bebidasAlcoholicasRadioButton = '';
  consumoTotalRadioButton = '';
  diagnosticadoCancerRadioButton = '';
  tipoCancer = '';

  familiaresConCancerRadioButton = '';

  familiaresConOtroCancerRadioButton = '';
  parentesco = '';
  tipoParentesco = '';

  archivoImagenes = '';
  archivoDocumentos = '';



  nombreFC = new FormControl('', [Validators.required]);
  cedulaFC = new FormControl('', [Validators.required]);
  fechaFC = new FormControl('', [Validators.required]);
  nacionalidadFC = new FormControl('', [Validators.required]);

  correoElectronicoFC = new FormControl('', [Validators.required]);
  telefonoFC = new FormControl('', [Validators.required]);
  provinciaFC = new FormControl('', [Validators.required]);
  distritoFC = new FormControl('', [Validators.required]);
  cantonFC = new FormControl('', [Validators.required]);

  pesoFC = new FormControl('', [Validators.required]);
  estaturaFC = new FormControl('', [Validators.required]);
  imcFC = new FormControl('', [Validators.required]);

  actividadFisicaPorSemanaFC = new FormControl('', [Validators.required]);
  empezoFumarFC = new FormControl('', [Validators.required]);
  fumaActualmenteFC = new FormControl('', [Validators.required]);
  actividadFisicaRadioButtonFC = new FormControl('', [Validators.required]);
  fumaRadioButtonFC = new FormControl('', [Validators.required]);
  fumaActualmenteRadioButtonFC = new FormControl('', [Validators.required]);

  bebidasAlcoholicasRadioButtonFC = new FormControl('', [Validators.required]);
  consumoTotalRadioButtonFC = new FormControl('', [Validators.required]);
  diagnosticadoCancerRadioButtonFC = new FormControl('', [Validators.required]);
  tipoCancerFC = new FormControl('', [Validators.required]);

  familiaresConCancerRadioButtonFC = new FormControl('', [Validators.required]);

  familiaresConOtroCancerRadioButtonFC = new FormControl('', [Validators.required]);
  parentescoFC = new FormControl('', [Validators.required]);
  tipoParentescoFC = new FormControl('', [Validators.required]);

  archivoImagenesFC = new FormControl('', [Validators.required]);
  archivoDocumentosFC = new FormControl('', [Validators.required]);

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
  }

  show2(event){
    console.log(event);
  }

}
