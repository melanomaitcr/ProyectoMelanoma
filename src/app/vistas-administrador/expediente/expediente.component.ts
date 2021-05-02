import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Expediente } from 'src/app/models/expediente';
import { ExpedienteService } from 'src/app/services/expediente.service';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.scss']
})
export class ExpedienteComponent implements OnInit {
  tabActual=0
  expediente: Expediente = new Expediente(null, null, null, null, null, null, null, null, null, null, null, null)
  public datepipe: DatePipe = new DatePipe('es-ES');
  edad: String

  constructor(private expedienteService: ExpedienteService) { }
  
  ngOnInit(): void {
    document.getElementById("Expediente").style.display = "block";
    this.cargarPaciente("301420857")
  }

  async cargarPaciente(cedulaPaciente: String) {
    this.expediente = await this.expedienteService.findByPk(cedulaPaciente).toPromise() as Expediente;
    let fechaNacimiento = new Date(this.expediente.fecha_nacimiento) 
    fechaNacimiento.setHours(fechaNacimiento.getHours()+6)
    this.expediente.fecha_nacimiento = this.datepipe.transform(fechaNacimiento, 'dd/MM/yyyy');
    let fechaActual =new Date()
    fechaActual.setHours(fechaActual.getHours()+6)
      let edadP = fechaActual.getFullYear() -  fechaNacimiento.getFullYear();
      if (fechaNacimiento.getMonth() > fechaActual.getMonth()) edadP--
      else {
          if (fechaNacimiento.getMonth() == fechaActual.getMonth()) {
              if (fechaNacimiento.getDay() > fechaActual.getDay()) edadP--
          }
      }
      this.edad = edadP.toString()+ " años"
  }

  cambiarTab(nombreTab, pos) {
    // Declare all variables
    let i: number, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(nombreTab).style.display = "block";

    if (pos==1){
      document.getElementById(nombreTab).style.borderRadius = "10px";
    }
    this.tabActual=pos;
    
  }
}
