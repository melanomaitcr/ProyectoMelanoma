import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const baseUrl = 'http://localhost:4200/api/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  auth_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTcxNDk4MDgsImlhdCI6MTYxNzA2MzQwOCwic3ViIjoiMTAxMTEwMTExIn0.TYmcPThDF6ZcYcR14nrN9FZ0UhVRdgRz7s3iRC3whBY";//"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTcxNDk2OTUsImlhdCI6MTYxNzA2MzI5NSwic3ViIjoiMTA1MjgwODcyIn0.05v4uc6ESxOC73C6JYahewuV0qdtcmYCHlYX1gJVQ30"; // 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTcwNjA4NjQsImlhdCI6MTYxNzA2MDM2NCwic3ViIjoiMTAxMTEwMTExIn0.UsGcH3sFZy8Q27hyN4HVI2iKYgyn4QChYWGfRM3uTj8'
  constructor(private https: HttpClient) { }

  findAll() {
    return this.https.get(baseUrl, { headers: { 'auth-token': this.auth_token } });
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

/*
import sys
sys.path.append("..")

import controllers.usuario as Controlador
from models.usuario import Usuario

from flask import request
import flask_app

@flask_app.app.route("/api/usuario", methods=["GET", "POST"])
def usuario_GETALL_POST():
    if request.method == "POST":
        data = request.get_json()
        return data if Controlador.create(Usuario.fromJSON(data)) else "DUPLICATE_PK"
    else:
        #token_autenticacion = dict(request.headers).get("Auth-Token")
        #if token_autenticacion == None:
        #    return "NOT_AUTHORIZED"

        #cedula = Usuario.decodificar_token_autenticacion(token_autenticacion)
        #if cedula == None:
        #    return "INVALID_TOKEN"

        #return cedula # Controlador.findAll()
        return Controlador.findAll()

@flask_app.app.route("/api/usuario/<id>", methods=["GET", "PUT", "DELETE"])
def usuario_GET_PUT_DELETE(id):
    if request.method == "GET":
        usuario_json = Controlador.findByPk(id)
        return usuario_json if usuario_json else "PK_NOT_EXISTS"
    elif request.method == "DELETE":
        return id if Controlador.delete(id) else "PK_NOT_EXISTS"
    else:
        data = request.get_json()
        return data if Controlador.update(id, Usuario.fromJSON(data)) else "PK_NOT_EXISTS"

@flask_app.app.route("/api/login", methods=["POST"])
def login_POST():
    data = request.get_json()
    usuarios = Controlador.findAll()["data"]

    encontrado = False
    for usuario in usuarios:
        if usuario["cedula"] == data["cedula"] and usuario["contrasenna"] == data["contrasenna"]:
            encontrado = True
            break

    return Usuario.codificar_token_autenticacion(data["cedula"]) if encontrado else "INVALID_LOGIN_INFO"

def query_usuarios():
    return Controlador.findAll()

*/