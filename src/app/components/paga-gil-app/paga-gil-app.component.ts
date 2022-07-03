import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppContextService } from '../../services/app-context.service';
import { Observable } from 'rxjs';
import { IGil } from 'src/app/model/gil';
import { selectGilesList } from '../../redux/gastos.selectors';

@Component({
  selector: 'app-paga-gil-app',
  templateUrl: './paga-gil-app.component.html',
  styleUrls: ['./paga-gil-app.component.css']
})
export class PagaGilAppComponent implements OnInit {

  giles$: Observable<IGil[]>

  constructor(public appContext: AppContextService, private store: Store<any> ) { }

  ngOnInit(): void {
    this.giles$ = this.store.select(selectGilesList)
  }

}
