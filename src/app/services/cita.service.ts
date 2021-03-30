import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

const baseUrl = 'http://localhost:4200/api/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(private https: HttpClient, private usuarioService: UsuarioService) { }

  findAll() {
    return this.https.get(baseUrl); // { headers: { 'auth-token': this.usuarioService.auth_token } }
  }

  findByPk(id_cita) {
    return this.https.get(`${baseUrl}/${id_cita}`);
  }

  findByUser(cedula) {
    return this.https.get(`${baseUrl}/paciente/${cedula}`);
  }

  create(data) {
    return this.https.post(baseUrl, data);
  }

  update(id_cita, data) {
    return this.https.put(`${baseUrl}/${id_cita}`, data);
  }

  delete(id_cita) {
    return this.https.delete(`${baseUrl}/${id_cita}`);
  }

}

