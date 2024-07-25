import { Proveedor } from "./Proveedor";
import { Servicio } from "./Servicio";
import { Vehiculo } from "./Vehiculo";

export class VehiculoServicio {
    idVehiculoServicio: number = 0;
    vehiculoIdVehiculo: number = 0;
    servicioIdServicio: number = 0;
    proveedorIdProveedor: number = 0;
    vehiculoDTO: Vehiculo = new Vehiculo;
    servicioDTO: Servicio = new Servicio;
    proveedorDTO: Proveedor = new Proveedor;
    kilometraje: string = "";
    folioFactura: string = "";
    costo: string = "";
    fechaServicio: Date | undefined;
    fechaServicioString: string;
    formattedDate: string | undefined;
    descripcion: string = "";
    file: string = "";

    getFormattedDate(): string | undefined {
        if (this.fechaServicio) {
            return this.fechaServicio.toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        return undefined;
    }
}