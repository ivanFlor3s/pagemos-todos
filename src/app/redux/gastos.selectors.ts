import { createSelector } from "@ngrx/store";
import { IGil } from '../model/gil';

export const selectGiles = (store: {giles: IGil[]}) => store.giles

export const selectGilesList = createSelector(
    selectGiles,
    (state) => [...state]
)