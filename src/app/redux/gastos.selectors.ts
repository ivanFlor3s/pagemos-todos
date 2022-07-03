import { createSelector } from "@ngrx/store";
import { IGil } from '../model/gil';
import { GastoItem } from '../model/GastoItem';

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