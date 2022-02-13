import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GilesListService } from '../../services/giles-list.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
})
export class GastosComponent implements OnInit {
  gastoForma: FormGroup;

  giles: string[] = []

  constructor(private fb: FormBuilder, private gilesService: GilesListService) {
    this.iniciarFormulario();
    this.escucharGilesIntegrantes()
  }

  ngOnInit(): void {}
  iniciarFormulario() {
    this.gastoForma = this.fb.group({
      persona: ['', [Validators.required]],
      cuanto: ['', [Validators.required]],
      descripcion: [''],
    });
  }

  escucharGilesIntegrantes(){
    this.gilesService.currentList.subscribe( giles => {
      this.giles = giles.map(x => x.nombre)
    })
  }

  submitForm(){
    if(this.gastoForma.invalid) return;
    const {persona, cuanto, descripcion} = this.gastoForma.value
    this.gilesService.agregarleGastoA(persona,cuanto,descripcion)
  }
}
