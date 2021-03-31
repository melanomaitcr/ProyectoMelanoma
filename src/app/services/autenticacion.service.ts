import { Injectable } from '@angular/core';


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
