import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EditarPerfilComponent } from '../../vistas-administrador/editar-perfil/editar-perfil.component';

@Component({
  selector: 'app-informacion-perfil-asistente',
  templateUrl: './informacion-perfil-asistente.component.html',
  styleUrls: ['./informacion-perfil-asistente.component.scss']
})
export class InformacionPerfilAsistenteComponent implements OnInit {

  usuario: Usuario = new Usuario("", "", "", "", "", "", "");
  telefono = "+506 8234 8747";

  constructor(
    public dialog: MatDialog,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  async cargarDatosUsuario() {
    this.usuario = await this.usuarioService.getInformacionPerfil().toPromise() as Usuario;
  }

  editarPerfil(usuario: Usuario): void {
    const referenciaDialogo = this.dialog.open(EditarPerfilComponent, {
      minWidth: 400, data: { cedula: usuario.cedula }
    });

    referenciaDialogo.afterClosed().subscribe(result => {
      this.cargarDatosUsuario();
    });
  }

}
