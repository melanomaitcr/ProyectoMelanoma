import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  auth_token = "";

  constructor() {
    if (window.localStorage.getItem('auth_token') == undefined) {
      this.auth_token = ""
    }
    this.auth_token = window.localStorage.getItem('auth_token')

  }

}
