import { createReducer, on } from '@ngrx/store';
import Swal from 'sweetalert2';
import { IGil } from '../model/gil';
import {
  agregarGil,
  cambiarNombreGil,
  eliminarGil,
  agregarGasto,
  quitarGasto,
  cargarGilesFromStorage,
} from './gastos.actions';

export const initialState: IGil[] = [];
export const gilesReducer = createReducer(
  initialState,
  on(agregarGil, (state, { nombreGil }) => {
    if (validarNombreExistente(state, nombreGil)) return [...state];
    const newState= [...state, { deuda: 0, gastos: [], nombre: nombreGil }]
    saveInStorage(newState)
    return [...newState];
  }),
  on(cambiarNombreGil, (state, { nombreNuevo, nombreOld }) => {
    if (validarNombreExistente(state,nombreNuevo)) {
      return [...state]
    }
    const newState = [ ...state.map((x) => {
        return x.nombre.toLowerCase() == nombreOld.toLowerCase()
          ? { ...x, nombre: nombreNuevo }
          : { ...x };
      }),
    ];
    saveInStorage(newState)
    return [...newState];
    // }
  }),
  on(eliminarGil, (state, { nombre }) => {
    const newState =  [...state.filter((g) => g.nombre !== nombre)];
    saveInStorage(newState)
    return [...newState];
  }),
  on(agregarGasto, (state, { nombre, gasto }) => {
    const newState= [
      ...state.map((x) =>
        x.nombre == nombre
          ? {
              ...x,
              gastos: [...x.gastos, { ...gasto, ts: new Date().getTime() }],
            }
          : x
      ),
    ];
    saveInStorage(newState)
    return [...newState]
  }),
  on(quitarGasto, (state, { gasto }) => {
    const newState= [
      ...state.map((x) =>
        x.nombre == gasto.nombre
          ? { ...x, gastos: [...x.gastos.filter((g) => g.ts !== gasto.ts)] }
          : x
      ),
    ];
    saveInStorage(newState)
    return [...newState]
  }),
  on(cargarGilesFromStorage, (state)=>{
    const storage = localStorage.getItem('__storage__')
    if(storage){
      console.log('Recupero de storage', storage)
      const aux = JSON.parse(storage) as IGil[]
      return [...aux]
    } else return [...state]
  })
);

const validarNombreExistente = (gilesState: IGil[], nombre: string) => {
  const existe = gilesState.find(
    (g) => g.nombre.toLocaleLowerCase() === nombre.toLocaleLowerCase()
  );
  if (existe) {
    Swal.fire(
      'No se pudo agregar',
      'Los nombres no se pueden repetir',
      'error'
    );
  }
  return existe;
};

const saveInStorage = ( state: any ) =>{
  localStorage.setItem('__storage__', JSON.stringify(state))
}

