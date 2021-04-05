import { Component, Input, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-navbar-paciente',
  templateUrl: './navbar-paciente.component.html',
  styleUrls: ['./navbar-paciente.component.scss']
})
export class NavbarPacienteComponent implements OnInit {

  @Input()
  id_cita: string;

  constructor(private autenticacionService: AutenticacionService) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    this.autenticacionService.cerrarSesion();
  }

}
