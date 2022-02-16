import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GilesListService } from '../../services/giles-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
})
export class GastosComponent implements OnInit {
  gastoForma: FormGroup;

  giles: string[] = []

  get PersonaInputInvalido(){
    return this.gastoForma.get('persona').invalid && this.gastoForma.get('persona').dirty 
  }

  get CuantoInputInvalido(){
    return this.gastoForma.get('cuanto').invalid && this.gastoForma.get('cuanto').dirty 
  }

  constructor(private fb: FormBuilder, private gilesService: GilesListService,
    private toastrService: ToastrService) {
    this.iniciarFormulario();
    this.escucharGilesIntegrantes()
  }

  ngOnInit(): void {}
  iniciarFormulario() {
    this.gastoForma = this.fb.group({
      persona: ['', [Validators.required]],
      cuanto: ['', [Validators.required]],
      descripcion: ['Penes de madera'],
    });
  }

  escucharGilesIntegrantes(){
    this.gilesService.currentList.subscribe( giles => {
      // console.log(giles)
      this.giles = giles.map(x => x.nombre)
    
    })

    
  }

  submitForm(){
    console.log(this.gastoForma)

    Object.keys(this.gastoForma.controls).map( control => {
      this.gastoForma.controls[control].markAsDirty()
    })

    if(this.gastoForma.invalid) return;
    const {persona, cuanto, descripcion} = this.gastoForma.value
    this.gilesService.agregarleGastoA(persona,cuanto,descripcion)
    this.toastrService.info('Abrazo grando ' + persona ,'Le va a pagar Magosha!')
  }
}
