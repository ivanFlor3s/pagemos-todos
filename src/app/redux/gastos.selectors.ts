import { createSelector } from "@ngrx/store";
import { IGil } from '../model/gil';
import { GastoItem } from '../model/GastoItem';
import { GastoTotal } from '../model/gasto';

export const selectGiles = (store: {giles: IGil[]}) => store.giles

export const selectGilesList = createSelector(
    selectGiles,
    (state) => [...state]
)
export const selectGetGastos = createSelector(
    selectGiles,
    (state)=>{
        const gastos: GastoItem[] = []
        state.forEach(x=>{
            x.gastos.forEach( g => {
                const gasto: GastoItem= {
                    cuanto: g.cuanto,
                    descripcion: g.descripcion,
                    nombre:x.nombre,
                    ts: g.ts
                }
                gastos.push(gasto)
            })
           
        })
        return gastos;
    }
)

export const selectGetTotales = createSelector(
    selectGiles,
    (state)=>{
        const gastosTotales: GastoTotal[] = []
        state.forEach( gil => {
            const item: GastoTotal = {
              nombre: gil.nombre,
              cuanto: gil.gastos.map( x => x.cuanto).reduce( (a,b)=> a + Number(b), 0)
            }
            gastosTotales.push(item)
        })
        return gastosTotales;
    }
)

export const selectGetTotal = createSelector(
    selectGetTotales,
    (gastosTotales)=>  {
        const total= gastosTotales.map(x=>Number(x.cuanto)).reduce( (a,b)=> a + b, 0)
        return total
    }
)

