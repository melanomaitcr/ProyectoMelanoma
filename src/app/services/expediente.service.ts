import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:4200/api/expediente';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {

  constructor(private https: HttpClient) { }

  findAll() {
    return this.https.get(baseUrl);
  }

  findByPk(cedula) {
    return this.https.get(`${baseUrl}/${cedula}`);
  }

  create(data) {
    return this.https.post(baseUrl, data);
  }

  update(cedula, data) {
    return this.https.put(`${baseUrl}/${cedula}`, data);
  }

  delete(cedula) {
    return this.https.delete(`${baseUrl}/${cedula}`);
  }

}
