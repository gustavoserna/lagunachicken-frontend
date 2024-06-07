import { Component, VERSION } from '@angular/core';
import { Vehiculo } from '../../../models/Vehiculo';
import { VehiculoService } from '../../../services/vehiculo/vehiculo.service';
import { Sucursal } from '../../../models/Sucursal';
import { UtilityService } from '../../../services/utility/utility.service';
import { Chofer } from '../../../models/Chofer';
import { ChoferService } from '../../../services/chofer/chofer.service';
import { MessageService } from 'primeng/api';
import { utility } from '../../../utility/utility';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css',
  providers: [MessageService]
})
export class VehiculosComponent {

  selectedVehiculo: Vehiculo = new Vehiculo;

  choferes: Chofer[] = [];
  selectedChofer: Chofer = new Chofer;

  sucursales: Sucursal[] = [];
  selectedSucursal: Sucursal = new Sucursal;

  vehiculos: Vehiculo[] = [];
  cols: any[] = [
    { field: 'numEconomico', header: 'Número económico', type: 'string' }, //
    { field: 'choferDTO', subfield: 'nombre', header: 'Chofer', type: 'string' }, //
    { field: 'sucursalDTO', subfield: 'sucursal', header: 'Sucursal', type: 'string' }, //
    { field: 'kilometraje', header: 'Kilometraje', type: 'string' }, //
    { field: 'placas', header: 'Placas', type: 'string' }, //
    /*{ field: 'estadoPlacas', header: '', type: 'string' }, //
    { field: 'modelo', header: '', type: 'string' }, //
    { field: 'capacidad', header: '', type: 'string' }, //
    { field: 'marca', header: '', type: 'string' }, //
    { field: 'tipo', header: '', type: 'string' }, //
    { field: 'descripcion', header: '', type: 'string' }, //
    { field: 'numeroSerie', header: '', type: 'string' }, //
    { field: 'numeroMotor', header: '', type: 'string' }, //
    { field: 'aseguradora', header: '', type: 'string' }, //
    { field: 'vencimientoPoliza', header: '', type: 'string' }, //*/
  ];
  addVehiculoSidebarVisible: boolean = false;
  vehiculoDialogVisible: boolean = false;
  saveVehiculoModel: Vehiculo = new Vehiculo;

  constructor(
    private vehiculoService: VehiculoService, 
    private choferesService: ChoferService, 
    private utilityService: UtilityService,
    private messageService: MessageService
    ) 
  {

  }

  ngOnInit(): void {
    this.getSucursales();
    this.getChoferes();
    this.getVehiculos();
  }

  saveVehiculo(): void {
    this.saveVehiculoModel.choferDTO.idChofer = this.selectedChofer.idChofer;
    this.saveVehiculoModel.sucursalDTO.idSucursal = this.selectedSucursal.idSucursal;
    this.saveVehiculoModel.vencimientoPoliza = new Date(this.saveVehiculoModel.vencimientoPolizaString);

     // validate dates
     if(!utility.validateDate(this.saveVehiculoModel.vencimientoPoliza, this.messageService)) {
      return;
    }

    this.vehiculoService.saveVehiculo(this.saveVehiculoModel).subscribe(
      (data: any) => {
        // success
        this.messageService.add({ severity: 'success', sticky: true, summary: 'Éxito', detail: 'Vehículo guardado.' });
        this.addVehiculoSidebarVisible = false;
        this.saveVehiculoModel = new Vehiculo();
        this.getVehiculos();
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', sticky: true, summary: 'Error', detail: error.error.message });
        this.saveVehiculoModel = new Vehiculo();
      }
    )
  }

  editVehiculo(vehiculo: Vehiculo): void {
    this.saveVehiculoModel = vehiculo;
    this.saveVehiculoModel.vencimientoPolizaString = this.saveVehiculoModel.vencimientoPoliza.toString().split('T')[0];

    const foundChofer = this.choferes.find(chofer => chofer.idChofer == vehiculo.choferIdChofer);
    const foundSucursal = this.sucursales.find(sucursal => sucursal.sucursal = vehiculo.sucursalDTO.sucursal);

    if (foundChofer) {
        this.saveVehiculoModel.choferDTO = foundChofer;
        this.selectedChofer = foundChofer;
    } else {
        // Handle the case where chofer is not found
        // For example, you can log a message or handle it in another way
        console.error('Chofer not found for Vehiculo:', vehiculo);
    }

    if (foundSucursal) {
        this.saveVehiculoModel.sucursalDTO = foundSucursal;
        this.selectedSucursal = foundSucursal;
    } else {
        // Handle the case where sucursal is not found
        // For example, you can log a message or handle it in another way
        console.error('Sucursal not found for Vehiculo:', vehiculo);
    }

    this.addVehiculoSidebarVisible = true;
  }

  openPopupVehiculo(vehiculo: Vehiculo) {
    this.vehiculoDialogVisible = true;
    this.selectedVehiculo = vehiculo;
  }

  private getVehiculos() {
    this.vehiculoService.getVehiculos().then(data => {
      this.vehiculos = data;
    });
  }

  private getSucursales() {
    this.utilityService.getSucursales().then(data => {
      this.sucursales = data;
    });
  }

  private getChoferes(): void {
    this.choferesService.getChoferes().then(data => {
      this.choferes = data;
    })
  }

}
