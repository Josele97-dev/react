import { differenceInDays } from "date-fns";

/**
 * Calcula la diferencia estricta en días entre dos fechas.
 * @param fechaInicio Fecha inicial (Date)
 * @param fechaFin Fecha final (Date)
 * @returns número de días entre ambas fechas (number)
 */
export function diferenciaEnDias(fechaInicio: Date, fechaFin: Date): number {
  return differenceInDays(fechaFin, fechaInicio);
}
