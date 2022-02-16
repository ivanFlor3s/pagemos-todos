import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Gil } from 'src/app/model/gil';
import { GilesListService } from '../../services/giles-list.service';

const MINCHARSNAME = 3
@Component({
  selector: 'app-agregar-gil',
  templateUrl: './agregar-gil.component.html',
  styleUrls: ['./agregar-gil.component.css']
})



export class AgregarGilComponent implements OnInit {

  nombreForma: FormGroup
  giles: string[] = []
  gilesListSubscription: Subscription

  minCaracteresNombre = MINCHARSNAME

  get NombreInput(){
    return this.nombreForma.get('nombre') as FormControl
  }

  get NombreInvalido(){
    return this.NombreInput.invalid && this.NombreInput.dirty 
  }

  constructor(private fb: FormBuilder, 
    private gilesService: GilesListService, 
    private toastrService: ToastrService) { 
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
      nombre: ['', [Validators.required, Validators.minLength(MINCHARSNAME)]]
    })
  }

  submitAgregar(){

    if(!this.NombreInput.value) return; 
    // console.log(this.nombreForma.value, this.giles)

    if(this.giles.map(x => x.toUpperCase().trim()).includes(this.NombreInput.value.toUpperCase().trim())){
      this.toastrService.error(`${this.NombreInput.value} ya esta agregado fiera`,'Media pila!!')
      this.nombreForma.reset()
      return;
    }

    if(this.nombreForma.valid){
      // this.giles.push(this.NombreInput.value)
      this.gilesService.AgregarGil(this.NombreInput.value)
      this.nombreForma.reset()
    }

    
  }

  quitarGil(gil: string){
    // console.log('saco a este', gil)
    this.gilesService.QuitarGil(gil)
    this.toastrService.success(`A tu puta casa ${gil}`,'A casaaaa!!!!')
  }

  editar(gil:string){
    this.toastrService.error('tocate el culo','Todavia no hace nada')
  }


}
