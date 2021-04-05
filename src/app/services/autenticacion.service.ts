import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/*
{"data":[{"cedula":"101110111","contrasenna":"melanoma2021","correo_electronico":"jimmymok@gmail.com","nombre":"Jimmy","primer_apellido":"Mok","rol":"D","segundo_apellido":"Zheng"},{"cedula":"105280872","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Felipe","primer_apellido":"Pacheco","rol":"M","segundo_apellido":"Cerdas"},{"cedula":"11111222","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Jajaj","primer_apellido":"Pacheco","rol":"M","segundo_apellido":"PERRRRR"},{"cedula":"122","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"FelipeFFF","primer_apellido":"ed","rol":"A","segundo_apellido":"Cerdas"},{"cedula":"142857","contrasenna":"","correo_electronico":"felipepace10@gmail.com","nombre":"Dios","primer_apellido":"Pancrasio","rol":"A","segundo_apellido":""},{"cedula":"45","contrasenna":"melanoma2021","correo_electronico":"d@de","nombre":"rwfsds","primer_apellido":"rwsfdc","rol":"A","segundo_apellido":"CERDAS"},{"cedula":"500","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Priscilla","primer_apellido":"Pacheco","rol":"M","segundo_apellido":"Cerdas"},{"cedula":"51257","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Felipe","primer_apellido":"Pacheco","rol":"M","segundo_apellido":"Cerdas"},{"cedula":"777","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Felipe","primer_apellido":"Pacheco","rol":"M","segundo_apellido":"Cerdas"},{"cedula":"7845","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Agua","primer_apellido":"x","rol":"M","segundo_apellido":"Cerdas"},{"cedula":"845","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Felpudo","primer_apellido":"Pacheco","rol":"M","segundo_apellido":"Cerdas"}]}
*/


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  auth_token: string = undefined;
  rol: string = undefined;

  constructor(private router: Router, private _snackBar: MatSnackBar) {
    if (!window.localStorage.getItem('auth_token')) {
      this.auth_token = this.rol = undefined;
      return;
    }

    this.auth_token = window.localStorage.getItem('auth_token');
    this.rol = window.localStorage.getItem('rol');
  }

  iniciarSesion(auth_token: string, rol: string) {
    this.setData(auth_token, rol);

    if (rol == 'A')
      this.router.navigate(['/cita-registro']);
    else if (rol == 'M') {
      this._snackBar.open("Se ha ingresado como médico pero actualmente este no cuenta con funcionalidades implementadas", "Cerrar", {
        duration: 4000,
      });
      this.cerrarSesion();
    } else
      this.router.navigate(['/usuarios']);

  }

  ingresarCita(auth_token: string, rol: string, id_cita: string) {
    this.setData(auth_token, rol);
    this.router.navigate(['/cita', { id_cita: id_cita }]);
  }

  setData(auth_token: string, rol: string) {
    window.localStorage.setItem("auth_token", auth_token);
    window.localStorage.setItem("rol", rol);

    this.auth_token = auth_token;
    this.rol = rol;
  }

  removeData() {
    window.localStorage.removeItem("auth_token");
    window.localStorage.removeItem("rol");
    this.auth_token = this.rol = undefined;
  }

  cerrarSesion() {
    this.removeData();
    this.router.navigate(['/inicio-sesion']);
  }

}
