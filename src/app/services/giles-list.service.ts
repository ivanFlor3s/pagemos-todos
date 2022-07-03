import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Gasto } from '../model/gasto';
//Models
import { Gil } from '../model/gil';

const GILESKEY = 'giles'
@Injectable({
  providedIn: 'root'
})
export class GilesListService {

  private currentGilesListSubject: BehaviorSubject<Gil[]> = new BehaviorSubject([] as Gil[]);
  public readonly currentList: Observable<Gil[]> = this.currentGilesListSubject.asObservable();
  constructor() {
    this.getDataFormStorage()
    this.escucharGuardarCambios()
   }

  AgregarGil(nombre: string){
    const gil: Gil = new Gil(nombre)
    this.currentGilesListSubject.next([...this.currentGilesListSubject.value, gil])
  }

  QuitarGil(nombre: string){
    const listaSinGil = this.currentGilesListSubject.value.filter(x => x.nombre != nombre)
    this.currentGilesListSubject.next(listaSinGil)
  }

  agregarleGastoA(nombre: string, cuanto: number, descripcion: string){
    const gasto: Gasto = {
      cuanto, descripcion
    }
    const listaModificada = this.currentGilesListSubject.value.map( x => {
      if( x.nombre == nombre){
        // x.agregarGasto(cuanto, descripcion)
        x.gastos.push(gasto)
      } 
    
      return x
    })
    // console.log('first', this.currentGilesListSubject.value)
    this.currentGilesListSubject.next(listaModificada)
  }

  cambiarNombre(quien:string, nuevoNombre: string){
    const listaModificada = this.currentGilesListSubject.value.map( x => {
      if (x.nombre == quien ) {
        const clone = x
        clone.nombre = nuevoNombre
        return clone
      }else return x
    })
    this.currentGilesListSubject.next(listaModificada)

  }


  escucharGuardarCambios(){
    this.currentGilesListSubject.subscribe( res => {
      localStorage.setItem(GILESKEY, JSON.stringify(res))
    })
  }

  getDataFormStorage(){
    const data = localStorage.getItem(GILESKEY)
    if(data){
      this.currentGilesListSubject.next(JSON.parse(data) as Gil[])
    }
  }

  



}
