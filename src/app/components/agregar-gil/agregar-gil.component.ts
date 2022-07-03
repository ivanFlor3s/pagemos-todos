import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { GilesListService } from '../../services/giles-list.service';
import Swal from 'sweetalert2';
import { NeutrarPipe } from '../../pipes/neutrar.pipe';
import { Store } from '@ngrx/store';
import { agregarGil, cambiarNombreGil, eliminarGil } from '../../redux/gastos.actions';
import { selectGilesList } from '../../redux/gastos.selectors';
import { IGil } from 'src/app/model/gil';

const MINCHARSNAME = 3
@Component({
  selector: 'app-agregar-gil',
  templateUrl: './agregar-gil.component.html',
  styleUrls: ['./agregar-gil.component.css'],
  providers:[NeutrarPipe]
})



export class AgregarGilComponent implements OnInit {

  nombreForma: FormGroup
  giles: string[] = []
  gilesListSubscription: Subscription
  giles$:Observable<IGil[]>


  get NombreInput(){
    return this.nombreForma.get('nombre') as FormControl
  }

  get NombreInvalido(){
    return this.NombreInput.invalid && this.NombreInput.dirty 
  }


  constructor(private fb: FormBuilder, 
    private gilesService: GilesListService,
    private store: Store<any>, 
    private toastrService: ToastrService,
    private neutrar: NeutrarPipe) { 
    this.iniciarFormulario()
    this.escucharListaGiles()
  }

  escucharListaGiles() {
    this.gilesListSubscription = this.gilesService.currentList.subscribe( list => {
     this.giles = list.map(x => x.nombre) 
    })
  }
  
  ngOnInit(): void {
    this.giles$ = this.store.select(selectGilesList)
    // this.store.select(selectGilesList).subscribe(res=>console.log(res))
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
    this.NombreInput.markAsDirty()
    if(!this.NombreInput.value) return; 
    // console.log(this.nombreForma.value, this.giles)

    if(this.giles.map(x => x.toUpperCase().trim()).includes(this.NombreInput.value.toUpperCase().trim())){
      this.toastrService.error(`${this.NombreInput.value} ya esta agregado ${this.neutrar.transform('fiera','','')}`,this.neutrar.transform('Media pila!!','',''))
      this.nombreForma.reset()
      return;
    }

    if(this.nombreForma.valid){
      // this.gilesService.AgregarGil(this.NombreInput.value)
      this.store.dispatch(agregarGil({nombreGil: this.NombreInput.value}))
      this.nombreForma.reset()
    }

    
  }

  async quitarGil(gil: IGil){

    const response = await this.pedirConfirmacion(gil.nombre)
    if(response.isConfirmed) {
      // this.gilesService.QuitarGil(gil)
      this.store.dispatch(eliminarGil({nombre: gil.nombre}))
      const [msg,title] = [`A tu puta casa `,'A casaaaa!!!!']
      
      this.toastrService.success(this.neutrar.transform(msg,'app','toastDeleteGilMsg') + gil.nombre,
      this.neutrar.transform(title,'app','toastDeleteGilTitle') )
    }

  }

  pedirConfirmacion(gil: string) {
    return Swal.fire({
      title: 'Esta seguro de quitar a ' + gil,
      text:`Recorda que se van a perder todos los gastos de ${gil}`,
      confirmButtonText: 'Confirmar',
      cancelButtonText:'Cancelar',
      showCancelButton: true
    })
  }

  async editar(gil:IGil){
    const respuesta = await this.preguntarPorCambio()
    // console.log('nuevo nombre', respuesta.value)
    if (gil == respuesta.value || !respuesta.value) return;

    // this.gilesService.cambiarNombre(gil, respuesta.value)
    this.store.dispatch(cambiarNombreGil({nombreNuevo:respuesta.value,nombreOld:gil.nombre}))
    // this.toastrService.error(' Por que no te tocas el culo?','Eh!! Eso todavia no hace nada')
  }

  preguntarPorCambio(){
    return Swal.fire({
      title: 'Que nombre deberia tener?',
      input:'text',
      showCancelButton: true,
      confirmButtonText: 'Cambiar nombre',
      inputValidator: (value) => {
        if (value.length < 3) {
          return 'El nombre debe tener al menos 3 letras'
        }
      }
    })
  }

}
