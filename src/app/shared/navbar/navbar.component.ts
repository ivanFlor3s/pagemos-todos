import { Component, OnInit } from '@angular/core';
import { AppContextService } from 'src/app/services/app-context.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public context: AppContextService) { }

  ngOnInit(): void {
  }

  cambiar(){
    this.context.togglePalabras()
  }

}
