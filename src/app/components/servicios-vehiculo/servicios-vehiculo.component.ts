import { Component } from '@angular/core';
import { VehiculoServicio } from '../../models/VehiculoServicio';
import { UtilityService } from '../../services/utility/utility.service';
import { ChoferService } from '../../services/chofer/chofer.service';
import { Chofer } from '../../models/Chofer';
import { Proveedor } from '../../models/Proveedor';
import { VehiculoService } from '../../services/vehiculo/vehiculo.service';
import { Vehiculo } from '../../models/Vehiculo';
import { Servicio } from '../../models/Servicio';
import { ServicioService } from '../../services/servicio/servicio.service';

@Component({
  selector: 'app-servicios-vehiculo',
  templateUrl: './servicios-vehiculo.component.html',
  styleUrl: './servicios-vehiculo.component.css'
})
export class ServiciosVehiculoComponent {

  vehiculos: Vehiculo[] = [];
  choferes: Chofer[] = [];
  proveedores: Proveedor[] = [];
  tiposServicio: Servicio[] = [];
  servicios: VehiculoServicio[] = [];
  cols: any[] = [
    { field: 'vehiculoDTO', subfield: 'numEconomico', header: 'Número económico', type: 'string' },
    { field: 'vehiculoDTO', subfield: 'placas', header: 'Placas', type: 'string' },
    { field: 'servicioDTO', subfield: 'servicio', header: 'Servicio aplicado', type: 'string' },
    { field: 'proveedorDTO', subfield: 'proveedor', header: 'Proveedor', type: 'string' },
    { field: 'kilometraje', header: 'Kilometraje registrado', type: 'string' },
    { field: 'folioFactura', header: 'Folio de factura', type: 'string' },
    { field: 'costo', header: 'Costo', type: 'string' },
    { field: 'descripcion', header: 'Descripción', type: 'string' },
  ];
  addServicioSidebarVisible: boolean = false;
  saveServicioModel: VehiculoServicio = new VehiculoServicio;

  constructor(
    private vehiculoService: VehiculoService,
    private utilityService: UtilityService,
    private choferesService: ChoferService,
    private servicioService: ServicioService
  ) {

  }

  ngOnInit(): void {
    this.getVehiculosServicios();
    this.getVehiculos();
    this.getChoferes();
    this.getProveedores();
    this.getTiposServicio();
  }

  saveServicio(): void {
    this.saveServicioModel.vehiculoIdVehiculo = this.saveServicioModel.vehiculoDTO.idVehiculo;
    this.saveServicioModel.servicioIdServicio = this.saveServicioModel.servicioDTO.idServicio;
    this.saveServicioModel.proveedorIdProveedor = this.saveServicioModel.proveedorDTO.idProveedor;

    this.vehiculoService.saveVehiculoServicio(this.saveServicioModel).subscribe(
      (data: any) => {
        // success
        this.addServicioSidebarVisible = false;
        this.saveServicioModel = new VehiculoServicio;
        //this.getVehiculoServicios();
      },
      (error: any) => {
        //error
      }
    )
  }

  private getVehiculosServicios(): void {
    this.servicioService.getVehiculosServicios().then(data => {
      this.servicios = data;
    });
  }

  private getVehiculos(): void {
    this.vehiculoService.getVehiculos().then(data => {
      this.vehiculos = data;
    })
  }

  private getChoferes(): void {
    this.choferesService.getChoferes().then(data => {
      this.choferes = data;
    })
  }

  private getProveedores(): void {
    this.utilityService.getProveedores().then(data => {
      this.proveedores = data;
    })
  }

  private getTiposServicio(): void {
    this.utilityService.getServicios().then(data => {
      this.tiposServicio = data;
    })
  }

}
