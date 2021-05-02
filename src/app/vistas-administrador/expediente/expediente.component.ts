import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.scss']
})
export class ExpedienteComponent implements OnInit {
  tabActual=0
  constructor() { }
  ngOnInit(): void {
    document.getElementById("Expediente").style.display = "block";
  }

  openCity(cityName, pos) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    if (pos==1){
      document.getElementById(cityName).style.borderRadius = "10px";
    }
    this.tabActual=pos;
    
  }
}
