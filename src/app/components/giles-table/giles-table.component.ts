import { Component, Input, OnInit } from '@angular/core';
import { GilesListService } from '../../services/giles-list.service';
import { Observable, Subscription } from 'rxjs';

//Modelos
import { Gil, IGil } from 'src/app/model/gil';
import { GastoItem } from '../../model/GastoItem';
import { Store } from '@ngrx/store';
import { selectGetGastos } from '../../redux/gastos.selectors';
import { quitarGasto } from 'src/app/redux/gastos.actions';

@Component({
  selector: 'app-giles-table',
  templateUrl: './giles-table.component.html',
  styleUrls: ['./giles-table.component.css']
})
export class GilesTableComponent implements OnInit {

  @Input() gilesList: IGil[]

  gastos$: Observable<GastoItem[]>
  totalGasto: number = 0

  totalesList: { nombre: string, cuanto: number }[] = []

  get GastoDividido(){
    return this.totalGasto / this.totalesList.length
  }

  constructor(private store: Store<any>) {
   }

  ngOnInit(): void {
    this.gastos$ = this.store.select(selectGetGastos)
  }


  calcularPagarles(){
    this.totalGasto = 0
    this.totalesList = []
    this.gilesList.forEach( gil => {
      const item = {
        nombre: gil.nombre,
        cuanto: gil.gastos.map( x => x.cuanto).reduce( (a,b)=> a + b, 0)
      }
      this.totalesList.push(item)
      this.totalGasto += item.cuanto
    })
  }

  quitarGasto(gasto: GastoItem){
    this.store.dispatch(quitarGasto({gasto}))
  }

  balance(item:any){
    return item.cuanto - this.totalGasto / this.totalesList.length
  }


}
