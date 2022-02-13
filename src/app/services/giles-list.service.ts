import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
//Models
import { Gil } from '../model/gil';

@Injectable({
  providedIn: 'root'
})
export class GilesListService {

  private currentGilesListSubject: BehaviorSubject<Gil[]> = new BehaviorSubject([] as Gil[]);
  public readonly currentList: Observable<Gil[]> = this.currentGilesListSubject.asObservable();
  constructor() { }

  AgregarGil(nombre: string){
    const gil: Gil = new Gil(nombre)
    this.currentGilesListSubject.next([...this.currentGilesListSubject.value, gil])
  }

  QuitarGil(nombre: string){
    // console.log('quito a este ', nombre)
    const listaSinGil = this.currentGilesListSubject.value.filter(x => x.nombre != nombre)
    this.currentGilesListSubject.next(listaSinGil)
  }
 

}
