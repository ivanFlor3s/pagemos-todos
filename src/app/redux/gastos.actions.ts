import { createAction, props } from "@ngrx/store";
import { Gasto } from "../model/gasto";
import { Gil } from '../model/gil';

export const agregarGil = createAction('[Gil] Agrego nuevo',
    props<{ nombreGil:string}>()
    )

export const cambiarNombreGil = createAction('[Gil] Cambio nombre', 
props<{nombreOld: string, nombreNuevo: string}>()
)

export const eliminarGil = createAction('[Gil] Elimino', 
props<{nombre: string}>()
)

export const agregarGasto = createAction('[Gasto] Agregar',
    props<{nombre:string,gasto: Gasto}>()
    )

export const quitarGasto = createAction('[Gasto] Crear',
props<{gasto: Gasto}>()
)

export const cargarGilesFromStorage = createAction('[GIL] Load giles')

export const cleanLista = createAction('[Giles] Clean')