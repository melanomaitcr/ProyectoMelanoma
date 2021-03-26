import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  title = 'ProyectoMelanoma';

  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
  }

  async ejecutarAccion() {
    console.log("Ejecutando...");

    let usuario: Usuario = new Usuario("500", "Felipe", "Pacheco", "Cerdas", "melanoma2021", "felipepace09@gmail.com", "M");

    /* DELETE */
    let respuesta = await this.usuarioService.delete(usuario.cedula).toPromise();
    console.log(respuesta);

    /* POST */
    respuesta = await this.usuarioService.create(usuario).toPromise();
    console.log(respuesta);

    /* GETALL */
    let usuariosBD = await this.usuarioService.findAll().toPromise();
    let usuarios = usuariosBD["data"] as Usuario[]
    console.log(usuarios);

    /* PUT */
    usuario["nombre"] = "Epilef"
    respuesta = await this.usuarioService.update(usuario.cedula, usuario).toPromise();
    let nuevoUsuario = respuesta as Usuario;
    console.log(nuevoUsuario.nombre);

  }

}
