import { Component, OnInit } from '@angular/core';
import { AppContextService } from '../../services/app-context.service';

@Component({
  selector: 'app-paga-gil-app',
  templateUrl: './paga-gil-app.component.html',
  styleUrls: ['./paga-gil-app.component.css']
})
export class PagaGilAppComponent implements OnInit {

  constructor(public appContext: AppContextService) { }

  ngOnInit(): void {
  }

}
