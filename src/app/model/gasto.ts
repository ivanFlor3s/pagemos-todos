export class Gasto {
  cuanto: number;
  descripcion?: string;
  ts?: number;
}

export interface GastoTotal {
  nombre: string;
  cuanto: number;
}
