import { Gasto } from './gasto';


export interface IGil{
    nombre: string
    gastos: Gasto[]
    deuda: number
}
export class Gil implements IGil {
    constructor(name:string){
        this.nombre = name
        this.gastos = []
        this.deuda = 0
    }
    nombre: string;
    gastos: Gasto[];
    deuda: number;


    agregarGasto(cuanto: number, descripcion: string){
        const gasto: Gasto = {
            cuanto, descripcion
        }
        this.gastos.push(gasto)
    }
    
}

