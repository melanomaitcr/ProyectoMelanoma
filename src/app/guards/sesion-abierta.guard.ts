import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class SesionAbiertaGuard implements CanActivate {

  constructor(private autenticacionService: AutenticacionService, private router: Router) { }

  canActivate() {
    if (!this.autenticacionService.auth_token)
      return true;

    if (this.autenticacionService.rol == 'D')
      this.router.navigate(['/usuarios']);
    else if (this.autenticacionService.rol == 'A')
      this.router.navigate(['/citas-asistente']);
    else if (this.autenticacionService.rol == 'M')
      this.router.navigate(['/citas-medico']);
    else if (this.autenticacionService.rol == 'P')
      this.autenticacionService.cerrarSesion()
    //this.router.navigate(['/jajaSalu2']);

    return false;

  }

}
