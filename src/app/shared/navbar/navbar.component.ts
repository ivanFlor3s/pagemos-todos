import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppContextService } from 'src/app/services/app-context.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showFamilyButton = false

  constructor(public context: AppContextService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const urlSecreto = this.route.snapshot.paramMap.get('secreto')
    if(urlSecreto && urlSecreto == 'secreto'){
      this.showFamilyButton = true
    }
  }

  cambiar(){
    this.context.togglePalabras()
  }

}
