import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GilesListService } from '../../services/giles-list.service';
import { ToastrService } from 'ngx-toastr';
import { NeutrarPipe } from '../../pipes/neutrar.pipe';
import { IGil } from '../../model/gil';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectGilesList } from '../../redux/gastos.selectors';
import { agregarGasto } from '../../redux/gastos.actions';
import { Gasto } from '../../model/gasto';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
  providers:[NeutrarPipe]
})
export class GastosComponent implements OnInit {
  gastoForma: FormGroup;
  giles$: Observable<IGil[]>

  giles: string[] = []

  get PersonaInputInvalido(){
    return this.gastoForma.get('persona').invalid && this.gastoForma.get('persona').dirty 
  }

  get CuantoInputInvalido(){
    return this.gastoForma.get('cuanto').invalid && this.gastoForma.get('cuanto').dirty 
  }
  get CuantoNotEnough(){
    return !!this.gastoForma.get('cuanto').errors['min']
   
  }

  constructor(private fb: FormBuilder, private gilesService: GilesListService,
    private toastrService: ToastrService,
    private store:Store<any>,
    private neutrar:NeutrarPipe) {
    this.iniciarFormulario();
  }

  ngOnInit(): void {

    this.giles$ = this.store.select(selectGilesList)

  }
  iniciarFormulario() {
    this.gastoForma = this.fb.group({
      persona: ['', [Validators.required]],
      cuanto: ['', [Validators.required, Validators.min(5)]],
      descripcion: [''],
    });
  }

  escucharGilesIntegrantes(){
    this.gilesService.currentList.subscribe( giles => {
      // console.log(giles)
      this.giles = giles.map(x => x.nombre)
    
    })

    
  }

  submitForm(){

    Object.keys(this.gastoForma.controls).map( control => {
      this.gastoForma.controls[control].markAsDirty()
    })

    if(this.gastoForma.invalid) {
      return ;
    };
    const {persona, cuanto, descripcion} = this.gastoForma.value
    // this.gilesService.agregarleGastoA(persona,Number(cuanto),descripcion)
    const gasto: Gasto = {
      cuanto, descripcion
    }
    this.store.dispatch(agregarGasto({nombre:persona, gasto}))
    this.toastrService.info('🎉 '+ this.neutrar.transform('Abrazo grando','app','infoToastAgregar') + persona ,this.neutrar.transform('Le va a pagar Magosha!','app','graciasInfoToast'))

    this.gastoForma.reset()
  }
}
