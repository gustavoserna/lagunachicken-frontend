import { Component, ViewChild } from '@angular/core';
import { Vehiculo } from '../../models/Vehiculo';
import { UtilityService } from '../../services/utility/utility.service';
import { VehiculoService } from '../../services/vehiculo/vehiculo.service';
import { VehiculoConsumo } from '../../models/VehiculoConsumo';
import { Estacion } from '../../models/Estacion';
import { Producto } from '../../models/Producto';
import { Hora } from '../../models/Hora';
import { ConsumoService } from '../../services/consumo/consumo.service';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { Filtro } from '../../models/Filtro';
import { Data } from '@angular/router';
import { Dataset } from '../../models/Data';
import { utility } from '../../utility/utility';
import { Chofer } from '../../models/Chofer';
import { Sucursal } from '../../models/Sucursal';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-registro-consumo',
  templateUrl: './registro-consumo.component.html',
  styleUrl: './registro-consumo.component.css'
})
export class RegistroConsumoComponent {

  @ViewChild('dropdown') vehiculoDropdown: Dropdown;

  //filtros
  filtroConsumo: Filtro = new Filtro;
  vehiculosConsumo: Vehiculo[] = [];
  selectedVehiculoConsumo: Vehiculo = new Vehiculo;
  estacionesConsumo: Estacion[] = [];
  selectedEstacionConsumo: Estacion = new Estacion;
  productosConsumo: Producto[] = [];
  selectedProductoConsumo: Producto = new Producto;

  // form registrar servicio
  saveConsumoModel: VehiculoConsumo = new VehiculoConsumo;
  vehiculos: Vehiculo[] = [];
  estaciones: Estacion[] = [];
  productos: Producto[] = [];
  horas: Hora[] = [
    { horaConsumo: '08:00' }, { horaConsumo: '09:00' },
    { horaConsumo: '10:00' }, { horaConsumo: '11:00' }, { horaConsumo: '12:00' }, { horaConsumo: '13:00' }, { horaConsumo: '14:00' }, { horaConsumo: '15:00' }, { horaConsumo: '16:00' }, { horaConsumo: '17:00' }, { horaConsumo: '18:00' }, { horaConsumo: '19:00' },
    { horaConsumo: '20:00' }, { horaConsumo: '21:00' }, { horaConsumo: '22:00' }, { horaConsumo: '23:00' }, { horaConsumo: '00:00' }, { horaConsumo: '01:00' }, { horaConsumo: '02:00' }, { horaConsumo: '03:00' }, { horaConsumo: '04:00' }, { horaConsumo: '05:00' }, 
    { horaConsumo: '06:00' }, { horaConsumo: '07:00' }
  ];

  consumos: VehiculoConsumo[] = [];
  cols: any[] = [
    { field: 'vehiculoDTO', subfield: 'numEconomico', header: 'Número económico', type: 'string' },
    { field: 'estacionDTO', subfield: 'estacion', header: 'Estación', type: 'string' },
    { field: 'horaConsumo', header: 'Hora', type: 'string' },
    { field: 'productoDTO', subfield: 'producto', header: 'Producto', type: 'string' },
    { field: 'precio', header: 'Precio', type: 'string' },
    { field: 'cantidad', header: 'Cantidad', type: 'string' },
    { field: 'monto', header: 'Monto', type: 'string' },
    { field: 'odometro', header: 'Odómetro', type: 'string' },
    { field: 'rendimiento', header: 'Rendimiento', type: 'string' },
    { field: 'recorrido', header: 'Recorrido', type: 'string' },
    { field: 'formattedDate', header: 'Fecha consumo', type: 'string' },
  ];
  addConsumoSidebarVisible: boolean = false;

  constructor(
    private utilityService: UtilityService,
    private estacionService: UtilityService,
    private vehiculoService: VehiculoService,
    private consumoService: ConsumoService
  ) 
  {
    this.getVehiculosConsumos(new Filtro);
    this.getVehiculos();
    this.getEstaciones();
    this.getProductos();
  }

  saveVehiculoConsumo(): void {
    this.saveConsumoModel.vehiculoIdVehiculo = this.saveConsumoModel.vehiculoDTO!.idVehiculo;
    this.saveConsumoModel.estacionIdEstacion = this.saveConsumoModel.estacionDTO.idEstacion;
    this.saveConsumoModel.productoIdProducto = this.saveConsumoModel.productoDTO.idProducto;
    this.saveConsumoModel.horaConsumo = this.saveConsumoModel.horaConsumoJson.horaConsumo;

    this.consumoService.saveVehiculoConsumo(this.saveConsumoModel).subscribe(
      (data: any) => {
        // success
        this.addConsumoSidebarVisible = false;
        this.saveConsumoModel = new VehiculoConsumo;
        this.getVehiculosConsumos(new Filtro);
      },
      (error: any) => {
        //error
      }
    )
  }

  editConsumo(vehiculoConsumo: VehiculoConsumo): void {
    this.saveConsumoModel = vehiculoConsumo;

    const horaConsumo = new Hora();
    horaConsumo.horaConsumo = vehiculoConsumo.horaConsumo;

    const formattedDate = new Date(utility.formatFromStringToDate(vehiculoConsumo.fechaConsumo));
    this.saveConsumoModel.fechaConsumo = formattedDate;
    this.saveConsumoModel.horaConsumoJson = horaConsumo;

    const foundVehiculo = this.vehiculos.find(vehiculo => vehiculo.numEconomico == vehiculoConsumo.vehiculoDTO!.numEconomico);
    this.saveConsumoModel.vehiculoDTO = foundVehiculo;

    this.addConsumoSidebarVisible = true;
  }

  filtrarConsumo(borrarFiltros?: boolean): void {
    if(borrarFiltros) {
      this.filtroConsumo = new Filtro;
      this.selectedVehiculoConsumo = new Vehiculo;
      this.selectedEstacionConsumo = new Estacion;
      this.selectedProductoConsumo = new Producto;
    } else {
      this.filtroConsumo.idVehiculo = this.selectedVehiculoConsumo.idVehiculo;
      this.filtroConsumo.idEstacion = this.selectedEstacionConsumo.idEstacion;
      this.filtroConsumo.idProducto = this.selectedProductoConsumo.idProducto;
    }

    this.getVehiculosConsumos(this.filtroConsumo);
  }

  exportToCSV(cols: any[] | undefined, data: any[] | undefined) {
    const csvContent = "data:text/csv;charset=utf-8,"
      + cols!.map(col => col.header).join(',') + '\n' // Encabezados de las columnas
      + data!.map(row => cols!.map(col => this.getFieldValue(row, col)).join(',')).join('\n'); // Valores de las columnas

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'reporte.csv');
    document.body.appendChild(link); // Necesario para Firefox
    link.click();
  }

  getFieldValue(row: any, col: any): string {
    if (col.subfield) {
      const subfields = col.subfield.split('.');
      let value = row;
      for (const subfield of subfields) {
        value = value[col.field][subfield];
      }
      return value != null ? value.toString() : '';
    } else {
      return row[col.field] != null ? row[col.field].toString() : '';
    }
  }

  private getVehiculos(): void {
    this.vehiculoService.getVehiculos().then(data => {
      this.vehiculos = data;
    })
  }

  private getVehiculosConsumos(filtro: Filtro): void {
    this.consumoService.getVehiculosConsumos(this.filtroConsumo).then(data => {
      data.forEach(element => {
        const fecha = new Date(element.fechaConsumo!);
        element.formattedDate = format(fecha, "dd 'de' MMMM 'del' yyyy", { locale: es });
      });
      this.consumos = data;
    });
  }

  private getEstaciones(): void {
    this.estacionService.getEstaciones().then(data => {
      this.estaciones = data;
    });
  }

  private getProductos(): void {
    this.utilityService.getProductos().then(data => {
      this.productos = data;
    });
  }

}
