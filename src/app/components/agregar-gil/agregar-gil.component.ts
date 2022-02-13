import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GilesListService } from '../../services/giles-list.service';

@Component({
  selector: 'app-agregar-gil',
  templateUrl: './agregar-gil.component.html',
  styleUrls: ['./agregar-gil.component.css']
})
export class AgregarGilComponent implements OnInit {

  nombreForma: FormGroup
  giles: string[] = []

  gilesListSubscription: Subscription

  get NombreInput(){
    return this.nombreForma.get('nombre') as FormControl
  }

  constructor(private fb: FormBuilder, private gilesService: GilesListService) { 
    this.iniciarFormulario()
    this.escucharListaGiles()
  }

  escucharListaGiles() {
    this.gilesListSubscription = this.gilesService.currentList.subscribe( list => {
     this.giles = list.map(x => x.nombre) 
    })
  }
  
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
   this.gilesListSubscription.unsubscribe()
  }

  iniciarFormulario() {
    this.nombreForma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]]
    })
  }

  submitAgregar(){
    console.log(this.nombreForma)
    if(this.nombreForma.valid){
      // this.giles.push(this.NombreInput.value)
      this.gilesService.AgregarGil(this.NombreInput.value)
      this.NombreInput.setValue('')
    }
  }

  quitarGil(){

  }


}
