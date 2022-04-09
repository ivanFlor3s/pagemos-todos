import { Component, OnInit } from '@angular/core';
import { GilesListService } from '../../services/giles-list.service';
import { Subscription } from 'rxjs';

//Modelos
import { Gil } from 'src/app/model/gil';
import { GastoItem } from '../../model/GastoItem';

@Component({
  selector: 'app-giles-table',
  templateUrl: './giles-table.component.html',
  styleUrls: ['./giles-table.component.css']
})
export class GilesTableComponent implements OnInit {

  gilesSub: Subscription
  gilesList: Gil[] = []
  gastos: GastoItem[] = []
  totalGasto: number = 0

  totalesList: { nombre: string, cuanto: number }[] = []

  get GastoDividido(){
    return this.totalGasto / this.totalesList.length
  }

  constructor(public gilesService: GilesListService) {
    this.escucharGiles()
   }

  ngOnInit(): void {
  }



  escucharGiles(){
    this.gilesSub = this.gilesService.currentList.subscribe( gilesList => {
      this.gilesList = gilesList
      if(gilesList.length >= 0){
        let list: GastoItem[] = []
        
        gilesList.forEach( gil => {
          gil.gastos.forEach( gasto => {
            const item: GastoItem = {
              cuanto: gasto.cuanto,
              descripcion: gasto.descripcion,
              nombre: gil.nombre
            }
            list.push( item )
          }) 
        })

        this.gastos = list
        this.calcularPagarles(gilesList)
      }
    })
  }

  calcularPagarles(gilesList: Gil[]){
    this.totalGasto = 0
    this.totalesList = []
    gilesList.forEach( gil => {
      const item = {
        nombre: gil.nombre,
        cuanto: gil.gastos.map( x => x.cuanto).reduce( (a,b)=> a + b, 0)
      }
      this.totalesList.push(item)
      this.totalGasto += item.cuanto
    })
  }

  balance(item:any){
    return item.cuanto - this.totalGasto / this.totalesList.length
  }


}
