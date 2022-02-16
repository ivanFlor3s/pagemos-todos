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
  constructor(public gilesService: GilesListService) {
    this.escucharGiles()
   }

  ngOnInit(): void {
  }

  escucharGiles(){
    this.gilesSub = this.gilesService.currentList.subscribe( gilesList => {
      this.gilesList = gilesList
      if(gilesList.length > 0){
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

      }
    })
  }


}
