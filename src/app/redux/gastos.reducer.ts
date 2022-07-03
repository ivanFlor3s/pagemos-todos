import { createReducer, on } from "@ngrx/store";
import { Gil } from '../model/gil';
import { agregarGil } from './gastos.actions';

export const initialState: Gil[] = []
export const gilesReducer = createReducer(initialState,
    on(agregarGil, (state,{gil})=>
    ([...state,gil])
    )

)
