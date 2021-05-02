import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//const baseUrl = 'http://melanomaitcr.pythonanywhere.com/api/archivoCita';
const baseUrl = 'http://localhost:4200/api/archivoCita';

@Injectable({
  providedIn: 'root'
})
export class ArchivoCitaService {

  constructor(private https: HttpClient) { }

  findAll() {
    return this.https.get(baseUrl);
  }

  findByPk(id_archivo) {
    return this.https.get(`${baseUrl}/${id_archivo}`);
  }

  create(data) {
    return this.https.post(baseUrl, data);
  }

  update(id_archivo, data) {
    return this.https.put(`${baseUrl}/${id_archivo}`, data);
  }

  delete(id_archivo) {
    return this.https.delete(`${baseUrl}/${id_archivo}`);
  }

}

