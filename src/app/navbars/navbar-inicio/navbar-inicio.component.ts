import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar-inicio',
  templateUrl: './navbar-inicio.component.html',
  styleUrls: ['./navbar-inicio.component.scss']
})
export class NavbarInicioComponent implements OnInit {
  @Input()
  paginaActual:string;

  constructor(private router: Router) { }

  InicioSesion() {
    this.router.navigate(['/inicio-sesion']);
  }

  IngresoCita() {
    this.router.navigate(['/ingreso-cita']);
  }
  AcercaDe() {
    this.router.navigate(['/acerca-de']);
  }

  checkCurrentPage(){
    return this.paginaActual;
  }

  ngOnInit(): void {
  }

}
