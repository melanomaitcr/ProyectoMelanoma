import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

//const baseUrl = 'http://melanomaitcr.pythonanywhere.com/api/archivoCita';
const baseUrl = window.location.origin + '/api/archivoCita';

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

  descargarArchivo(url: string, nombre_archivo: string, cedula_paciente: string) {
    this.https.get(url, { responseType: "blob", headers: { 'Accept': 'application/pdf' } })
      .subscribe(blob => {
        saveAs(blob, 'Resultado Prediagnóstico - ' + nombre_archivo + ' - ' + cedula_paciente + '.txt');
      });
  }
}

