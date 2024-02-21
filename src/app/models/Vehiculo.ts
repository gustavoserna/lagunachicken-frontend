import { Chofer } from "./Chofer";
import { Sucursal } from "./Sucursal";

export class Vehiculo {
    idVehiculo: number = 0;
    sucursalDTO: Sucursal = new Sucursal;
    choferDTO: Chofer = new Chofer;
    numEconomico: string = "";
    kilometraje: number = 0;
    placas: string = "";
    estadoPlacas: string = "";
    modelo: string = "";
    capacidad: string = "";
    marca: string = "";
    tipo: string = "";
    descripcion: string = "";
    numeroSerie: string = "";
    numeroMotor: string = "";
    numeroPoliza: string = "";
    aseguradora: string = "";
    vencimientoPoliza: Date = new Date;

}