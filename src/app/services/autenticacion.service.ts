import { Injectable } from '@angular/core';

/*
{"data":[{"cedula":"101110111","contrasenna":"melanoma2021","correo_electronico":"jimmymok@gmail.com","nombre":"Jimmy","primer_apellido":"Mok","rol":"D","segundo_apellido":"Zheng"},{"cedula":"105280872","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Felipe","primer_apellido":"Pacheco","rol":"M","segundo_apellido":"Cerdas"},{"cedula":"11111222","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Jajaj","primer_apellido":"Pacheco","rol":"M","segundo_apellido":"PERRRRR"},{"cedula":"122","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"FelipeFFF","primer_apellido":"ed","rol":"A","segundo_apellido":"Cerdas"},{"cedula":"142857","contrasenna":"","correo_electronico":"felipepace10@gmail.com","nombre":"Dios","primer_apellido":"Pancrasio","rol":"A","segundo_apellido":""},{"cedula":"45","contrasenna":"melanoma2021","correo_electronico":"d@de","nombre":"rwfsds","primer_apellido":"rwsfdc","rol":"A","segundo_apellido":"CERDAS"},{"cedula":"500","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Priscilla","primer_apellido":"Pacheco","rol":"M","segundo_apellido":"Cerdas"},{"cedula":"51257","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Felipe","primer_apellido":"Pacheco","rol":"M","segundo_apellido":"Cerdas"},{"cedula":"777","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Felipe","primer_apellido":"Pacheco","rol":"M","segundo_apellido":"Cerdas"},{"cedula":"7845","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Agua","primer_apellido":"x","rol":"M","segundo_apellido":"Cerdas"},{"cedula":"845","contrasenna":"melanoma2021","correo_electronico":"felipepace09@gmail.com","nombre":"Felpudo","primer_apellido":"Pacheco","rol":"M","segundo_apellido":"Cerdas"}]}
*/


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  auth_token = "";

  constructor() {
    //let tk_medico = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTcxNzkyOTgsImlhdCI6MTYxNzA5Mjg5OCwic3ViIjoiMTA1MjgwODcyIn0.W3P0BxevqKiwOozyD_YQ6mGwDW-hodiM7mofei3ecCo";
    //let tk_admin = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTcxNzkxNDIsImlhdCI6MTYxNzA5Mjc0Miwic3ViIjoiMTAxMTEwMTExIn0.0Z6e3vrzjps6mDCtdqH4zXpinjNNHp11_uPGjw4N9yg";
    //let tk_asistente = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTcxNzk2OTIsImlhdCI6MTYxNzA5MzI5Miwic3ViIjoiMTIyIn0.rWq2cUkOxoGvbU5Us8VMp6kA_-S7bYlKsB1Sr8UvYuo";
    //window.localStorage.setItem('auth_token', tk_admin);

    if (window.localStorage.getItem('auth_token') == undefined) {
      this.auth_token = ""
    }
    this.auth_token = window.localStorage.getItem('auth_token')

  }

}
