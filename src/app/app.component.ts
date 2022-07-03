import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { cargarGilesFromStorage } from './redux/gastos.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'paga-gil';

  constructor(private store: Store<any>){
    this.store.dispatch(cargarGilesFromStorage())
  }


}
