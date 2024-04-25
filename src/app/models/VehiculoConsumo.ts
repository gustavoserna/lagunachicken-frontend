import { Estacion } from "./Estacion";
import { Hora } from "./Hora";
import { Producto } from "./Producto";
import { Vehiculo } from "./Vehiculo";

export class VehiculoConsumo {
    idVehiculoConsumo: number = 0;
    despacho: string = "";
    vehiculoIdVehiculo: number = 0;
    estacionIdEstacion: number = 0;
    productoIdProducto: number = 0;
    vehiculoDTO: Vehiculo | undefined = new Vehiculo;
    estacionDTO: Estacion = new Estacion;
    productoDTO: Producto = new Producto;
    fechaConsumo: Date;
    formattedDate: string | undefined;
    horaConsumoJson: Hora = new Hora;
    horaConsumo: string = "";
    cantidad: string | undefined;
    precio: string | undefined;
    monto: string | undefined;
    odometro: string | undefined;
    rendimiento: string | undefined;
    recorrido: string | undefined;
}