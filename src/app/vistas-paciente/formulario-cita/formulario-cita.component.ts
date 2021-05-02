import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

import { HistorialPersonalCitaService } from '../../services/historial-personal-cita.service';
import { HistorialPersonalCita } from 'src/app/models/historialPersonalCita';

import { HistorialFamiliarCitaService } from '../../services/historial-familiar-cita.service';
import { HistorialFamiliarCita } from 'src/app/models/historialFamiliarCita';

import { FamiliarOtroCancerService } from '../../services/familiar-otro-cancer.service';
import { FamiliarOtroCancer } from 'src/app/models/familiarOtroCancer';

export interface Familiar {
  name: string;
  completed: boolean;
}

export interface ListaFamiliares {
  familiares: Familiar[];
}

@Component({
  selector: 'app-formulario-cita',
  templateUrl: './formulario-cita.component.html',
  styleUrls: ['./formulario-cita.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class FormularioCitaComponent implements OnInit {

  listaFamiliares: ListaFamiliares = {
    familiares: [
      {name: "Madre", completed: false},
      {name: "Hermana", completed: false},
      {name: "Tía Materna", completed: false},
      {name: "Tía Paterna", completed: false},
      {name: "Abuela Materna", completed: false},
      {name: "Abuela Paterna", completed: false},
      {name: "Otro:", completed: false},
      {name: "Padre", completed: false},
      {name: "Hermano", completed: false},
      {name: "Tío Materna", completed: false},
      {name: "Tío Paterna", completed: false},
      {name: "Abuelo Materna", completed: false},
      {name: "Abuelo Paterna", completed: false},
    ]
  };

  //historialPersonal: HistorialPersonalCita = new HistorialPersonalCita(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  //historialFamiliar: HistorialFamiliarCita = new HistorialFamiliarCita(null,null,null,null,null);
  //familiarOtroCancer: FamiliarOtroCancer = new FamiliarOtroCancer(null,null,null,null);

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

  peso = '1';
  estatura = '1';
  imc = '';

  actividadFisicaPorSemana = '';
  empezoFumar = '';
  periodoFumado = '';
  actividadFisicaRadioButton = '';
  fumaRadioButton = '';
  fumaActualmenteRadioButton = '';

  bebidasAlcoholicasRadioButton = '';
  consumoTotalRadioButton = '';
  diagnosticadoCancerRadioButton = '';
  tipoCancer = '';

  familiaresConCancerRadioButton = '';
  otroFamiliarCancerMelanomaCheckbox ='';

  familiaresConOtroCancerRadioButton = '';
  parentesco = '';
  tipoParentescoCancer = '';
  familiaresConCancer = ["asd"];

  archivoImagenes = '';
  archivoDocumentos = '';



  nombreFC = new FormControl('');
  cedulaFC = new FormControl('');
  fechaFC = new FormControl('');
  nacionalidadFC = new FormControl('');

  correoElectronicoFC = new FormControl('');
  telefonoFC = new FormControl('');
  provinciaFC = new FormControl('');
  distritoFC = new FormControl('');
  cantonFC = new FormControl('');

  pesoFC = new FormControl('');
  estaturaFC = new FormControl('');
  imcFC = new FormControl('');

  actividadFisicaPorSemanaFC = new FormControl('');
  empezoFumarFC = new FormControl('');
  periodoFumadoFC = new FormControl('');
  actividadFisicaRadioButtonFC = new FormControl('');
  fumaRadioButtonFC = new FormControl('');
  fumaActualmenteRadioButtonFC = new FormControl('');

  bebidasAlcoholicasRadioButtonFC = new FormControl('');
  consumoTotalRadioButtonFC = new FormControl('');
  diagnosticadoCancerRadioButtonFC = new FormControl('');
  tipoCancerFC = new FormControl('');

  familiaresConCancerRadioButtonFC = new FormControl('');
  otroFamiliarCancerMelanomaCheckboxFC = new FormControl('');

  familiaresConOtroCancerRadioButtonFC = new FormControl('');
  parentescoFC = new FormControl('');
  tipoParentescoCancerFC = new FormControl('');

  archivoImagenesFC = new FormControl('');
  archivoDocumentosFC = new FormControl('');

  allComplete: boolean = false;


  constructor(
    private historialPersonalCitaService: HistorialPersonalCitaService,
    private historialFamiliarCitaService: HistorialFamiliarCitaService,
    private familiarOtroCancerService: FamiliarOtroCancerService
    ) { }

  ngOnInit(): void {
 
  }

  updateAllComplete() {
    this.allComplete = this.listaFamiliares.familiares != null && this.listaFamiliares.familiares.every(t => t.completed);
  }

  obtenerParientesConCancer(listaConCancer: Familiar[]){
    let familiarCancer = [];
    let result = "";

    for (let familiar of listaConCancer) {
      if (familiar.completed == true){
      familiarCancer.push(familiar.name);
      }
    }
    result = familiarCancer.join(",")
    console.log(result);
    return result;
  }


  async registrarFormularioCita(){

    let familiarConCancer = this.obtenerParientesConCancer(this.listaFamiliares.familiares);

    let historialPersonalCita = new HistorialPersonalCita("","1",parseInt(this.peso),parseInt(this.estatura),parseInt(this.imc),this.actividadFisicaRadioButton,parseInt(this.actividadFisicaPorSemana),this.diagnosticadoCancerRadioButton,this.tipoCancer,this.fumaRadioButton,parseInt(this.empezoFumar),this.fumaActualmenteRadioButton,this.periodoFumado,this.bebidasAlcoholicasRadioButton,parseInt(this.consumoTotalRadioButton),null);
    let historialFamiliarCita = new HistorialFamiliarCita("","1",familiarConCancer,null,this.otroFamiliarCancerMelanomaCheckbox);
    let familiarOtroCancer = new FamiliarOtroCancer("","1",this.tipoParentescoCancer,this.parentesco)

    let respuestaHistorialFamiliar = await this.historialFamiliarCitaService.create(historialFamiliarCita).toPromise();
    let respuestaHistorialPersonal = await this.historialPersonalCitaService.create(historialPersonalCita).toPromise();
    let respuestaOtrosCancer = await this.familiarOtroCancerService.create(historialPersonalCita).toPromise();

  }
}
