import { Component, Input, OnInit } from '@angular/core';
import { GilesListService } from '../../services/giles-list.service';
import { Observable, Subscription } from 'rxjs';

//Modelos
import { Gil, IGil } from 'src/app/model/gil';
import { GastoItem } from '../../model/GastoItem';
import { Store } from '@ngrx/store';
import { selectGetGastos, selectGetTotal, selectGetTotales } from '../../redux/gastos.selectors';
import { quitarGasto } from 'src/app/redux/gastos.actions';
import { GastoTotal } from 'src/app/model/gasto';

@Component({
  selector: 'app-giles-table',
  templateUrl: './giles-table.component.html',
  styleUrls: ['./giles-table.component.css']
})
export class GilesTableComponent implements OnInit {

  @Input() gilesList: IGil[] = []

  gastos$: Observable<GastoItem[]>
  gastosTotal$:  Observable<number>

  gastosTotales$: Observable<GastoTotal[]>



  constructor(private store: Store<any>) {
   }

  ngOnInit(): void {
    this.gastos$ = this.store.select(selectGetGastos)
    this.gastosTotales$ = this.store.select(selectGetTotales)
    this.gastosTotal$ = this.store.select(selectGetTotal)
  }


  

  quitarGasto(gasto: GastoItem){
    this.store.dispatch(quitarGasto({gasto}))
  }

  balanceMayoraCero(item:any, total: number){
    return ((item.cuanto - total) / this.gilesList.length) > 0
  }


}
