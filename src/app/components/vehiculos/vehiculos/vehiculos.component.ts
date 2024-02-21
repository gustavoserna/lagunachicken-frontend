import { Component, VERSION } from '@angular/core';
import { Vehiculo } from '../../../models/Vehiculo';
import { VehiculoService } from '../../../services/vehiculo/vehiculo.service';
import { Sucursal } from '../../../models/Sucursal';
import { UtilityService } from '../../../services/utility/utility.service';
import { Chofer } from '../../../models/Chofer';
import { ChoferService } from '../../../services/chofer/chofer.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})
export class VehiculosComponent {

  selectedVehiculo: Vehiculo = new Vehiculo;

  choferes: Chofer[] = [];
  selectedChofer: Chofer = new Chofer;

  sucursales: Sucursal[] = [];
  selectedSucursal: Sucursal = new Sucursal;

  vehiculos: Vehiculo[] = [];
  cols: any[] = [
    { field: 'choferDTO', subfield: 'nombre', header: 'Chofer', type: 'string' }, //
    { field: 'sucursalDTO', subfield: 'sucursal', header: 'Sucursal', type: 'string' }, //
    { field: 'numEconomico', header: 'Número económico', type: 'string' }, //
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

  constructor(private vehiculoService: VehiculoService, private choferesService: ChoferService, private utilityService: UtilityService) {

  }

  ngOnInit(): void {
    this.getSucursales();
    this.getChoferes();
    this.getVehiculos();
  }

  saveVehiculo(): void {
    this.saveVehiculoModel.choferDTO.idChofer = this.selectedChofer.idChofer;
    this.saveVehiculoModel.sucursalDTO.idSucursal = this.selectedSucursal.idSucursal;
    this.vehiculoService.saveVehiculo(this.saveVehiculoModel).subscribe(
      (data: any) => {
        // success
        this.addVehiculoSidebarVisible = false;
        this.getVehiculos();
      },
      (error: any) => {
        //error
      }
    )
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
