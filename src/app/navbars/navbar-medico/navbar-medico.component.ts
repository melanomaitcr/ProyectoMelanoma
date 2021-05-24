import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-navbar-medico',
  templateUrl: './navbar-medico.component.html',
  styleUrls: ['./navbar-medico.component.scss']
})
export class NavbarMedicoComponent implements OnInit {

  @Input()
  paginaActual: string;

  constructor(private autenticacionService: AutenticacionService, private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    this.autenticacionService.cerrarSesion();
  }

  getPaginaActual() {
    return this.paginaActual;
  }


  vistaCitas() {
    this.paginaActual = 'citas';
    this.router.navigate(['/citas-medico']);
  }

  vistaExpedientes() {
    this.paginaActual = 'expedientes';
    this.router.navigate(['/expedientes-medico']);
  }

  vistaPerfil() {
    this.paginaActual = 'perfil';
    this.router.navigate(['/informacion-perfil-medico']);
  }

}
