import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-gil',
  templateUrl: './agregar-gil.component.html',
  styleUrls: ['./agregar-gil.component.css']
})
export class AgregarGilComponent implements OnInit {

  nombreForma: FormGroup
  giles: string[] = []

  get NombreInput(){
    return this.nombreForma.get('nombre') as FormControl
  }

  constructor(private fb: FormBuilder) { 
    this.iniciarFormulario()
  }
  
  ngOnInit(): void {
  }

  iniciarFormulario() {
    this.nombreForma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]]
    })
  }

  submitAgregar(){
    console.log(this.nombreForma)
    if(this.nombreForma.valid){
      this.giles.push(this.NombreInput.value)
      this.NombreInput.setValue('')
    }
  }


}
