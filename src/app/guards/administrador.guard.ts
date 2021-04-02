import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AdministradorGuard implements CanActivate {

  constructor(private autenticacionService: AutenticacionService, private router: Router) { }

  canActivate() {
    if (this.autenticacionService.rol == 'D')
      return true;
    else if (this.autenticacionService.rol == 'A')
      this.router.navigate(['/cita-registro']);
    else if (this.autenticacionService.rol == 'M')
      this.router.navigate(['/jajaSalu2']);
    else if (this.autenticacionService.rol == 'P')
      this.router.navigate(['/jajaSalu2']);

    return false;
  }

}
