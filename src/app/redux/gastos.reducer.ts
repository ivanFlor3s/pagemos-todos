import { createReducer, on } from '@ngrx/store';
import Swal from 'sweetalert2';
import { Gil, IGil } from '../model/gil';
import { agregarGil, cambiarNombreGil, eliminarGil, agregarGasto, quitarGasto, cargarGilesFromStorage } from './gastos.actions';

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
  }),
  on(agregarGasto, (state, { nombre,gasto})=>{
    return [...state.map(x=> x.nombre==nombre ? {...x,gastos: [...x.gastos,{...gasto,ts:new Date().getTime()}] }:x )]
  }),
  on( quitarGasto, (state, {gasto})=>{
    return [...state.map(x => x.nombre==gasto.nombre ? {...x,gastos: [...x.gastos.filter(g => g.ts!== gasto.ts)] }:x )]
  }),
  on(cargarGilesFromStorage, (state)=>{
    console.log('saco del local storage',localStorage.getItem('__storage__'))
    const saved = JSON.parse(localStorage.getItem('__storage__'))?.giles || []
    console.log('saved',saved)
    return [...saved]
  })  
);


const validarNombreExistente = (gilesState:IGil[],nombre:string)=>{
    const existe = gilesState.find(g => g.nombre.toLocaleLowerCase() === nombre.toLocaleLowerCase())
    if(existe){
        Swal.fire('No se pudo agregar', 'Los nombres no se pueden repetir', 'error')
    }
    return existe
    
}