import { Chofer } from "./Chofer";
import { Sucursal } from "./Sucursal";

export class Vehiculo {
    idVehiculo: number = 0;
    choferIdChofer: number = 0;
    sucursalIdSucursal: number = 0;
    numEconomico: string = "";
    sucursalDTO: Sucursal = new Sucursal;
    choferDTO: Chofer = new Chofer;
    kilometraje: number | undefined;
    kilometrajeAviso: number | undefined;
    kilometrajePeriodo: number | undefined;
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
    vencimientoPolizaString: string = "";

}