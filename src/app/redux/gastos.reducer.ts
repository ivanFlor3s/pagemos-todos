import { createReducer, on } from '@ngrx/store';
import Swal from 'sweetalert2';
import { Gil, IGil } from '../model/gil';
import { agregarGil, cambiarNombreGil, eliminarGil } from './gastos.actions';

export const initialState: IGil[] = [];
export const gilesReducer = createReducer(
  initialState,
  on(agregarGil, (state, { nombreGil }) => {
    if (validarNombreExistente(state,nombreGil))return [...state];
    return [
        ...state,
        { deuda: 0, gastos: [], nombre: nombreGil },
      ]
    }
  ),
  on(cambiarNombreGil,(state, {nombreNuevo, nombreOld})=>{
    if (validarNombreExistente(state,nombreNuevo))return [...state];
    return [...state.map(x=> x.nombre==nombreOld ? {...x,nombre:nombreNuevo}:x )]
  }),
  on(eliminarGil, (state,{nombre})=>{
    return [...state.filter(g => g.nombre !== nombre)]
  })

);


const validarNombreExistente = (gilesState:IGil[],nombre:string)=>{
    const existe = gilesState.find(g => g.nombre.toLocaleLowerCase() === nombre.toLocaleLowerCase())
    if(existe){
        Swal.fire('No se pudo agregar', 'Los nombres no se pueden repetir', 'error')
    }

    return existe
    
}