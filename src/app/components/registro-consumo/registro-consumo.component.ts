import { Component, OnInit, ViewChild } from '@angular/core';
import { Vehiculo } from '../../models/Vehiculo';
import { UtilityService } from '../../services/utility/utility.service';
import { VehiculoService } from '../../services/vehiculo/vehiculo.service';
import { VehiculoConsumo } from '../../models/VehiculoConsumo';
import { Estacion } from '../../models/Estacion';
import { Producto } from '../../models/Producto';
import { Hora } from '../../models/Hora';
import { ConsumoService } from '../../services/consumo/consumo.service';
import { es, tr } from 'date-fns/locale';
import { format } from 'date-fns';
import { Filtro } from '../../models/Filtro';
import { Data } from '@angular/router';
import { Dataset } from '../../models/Data';
import { utility } from '../../utility/utility';
import { Chofer } from '../../models/Chofer';
import { Sucursal } from '../../models/Sucursal';
import { Dropdown } from 'primeng/dropdown';
import { Papa } from 'ngx-papaparse';
import { Message, MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-registro-consumo',
  templateUrl: './registro-consumo.component.html',
  styleUrl: './registro-consumo.component.css',
  providers: [MessageService]
})
export class RegistroConsumoComponent {

  @ViewChild('dropdown') vehiculoDropdown: Dropdown;

  messages: Message[] = [];

  // --- tables ----
  //consumos
  @ViewChild('consumosTable') consumosTable!: Table;
  selectedColumn: string; // Columna seleccionada para el ordenamiento
  sortOrder: number = 1; // Dirección del ordenamiento: 1 para ascendente, -1 para descendente

  //filtros
  filtroConsumo: Filtro = new Filtro;
  vehiculosConsumo: Vehiculo[] = [];
  selectedVehiculoConsumo: Vehiculo = new Vehiculo;
  estacionesConsumo: Estacion[] = [];
  selectedEstacionConsumo: Estacion = new Estacion;
  productosConsumo: Producto[] = [];
  selectedProductoConsumo: Producto = new Producto;

  // form registrar consumo
  modifyConsumo: boolean = false;
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
    { field: 'fechaConsumoString', header: 'Fecha consumo', type: 'string' },
  ];
  addConsumoSidebarVisible: boolean = false;

  constructor(
    private utilityService: UtilityService,
    private estacionService: UtilityService,
    private vehiculoService: VehiculoService,
    private consumoService: ConsumoService,
    private papa: Papa,
    private messageService: MessageService
  ) {
    this.getVehiculosConsumos(new Filtro);
    this.getVehiculos();
    this.getEstaciones();
    this.getProductos();
  }

  // Método para cambiar la columna seleccionada y la dirección del ordenamiento
  onSort(event: any) {
    this.selectedColumn = event.field;
    this.sortOrder = event.order;
  }

  handleCsvUpload(event: any) {
    const file = event.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const csv = reader.result as string;
        this.saveVehiculoConsumoCSV(csv);
      };

      reader.readAsText(file);
    } else {
      alert("Debes seleccionar un archivo CSV");
    }
  }

  saveVehiculoConsumoCSV(csv: string): void {
    this.papa.parse(csv, {
      header: true,
      complete: (result) => {
        result.data.forEach((item: any) => {
          try {
            const consumo = new VehiculoConsumo();
            consumo.fechaConsumo = new Date(utility.convertToDayMonthYearFormat(item.Fecha.trim()));
            consumo.horaConsumo = item.Hora.trim();
            consumo.despacho = item.Despacho.trim();
            consumo.precio = item.Precio.trim();
            consumo.cantidad = item.Cantidad.trim();
            consumo.monto = item.Monto.trim();
            consumo.odometro = item.Odometro.trim();
            consumo.rendimiento = item.Rendimiento.trim();
            consumo.recorrido = item.Recorrido.trim();
            consumo.vehiculoDTO.numEconomico = item.No_Economico.trim();
            consumo.estacionDTO.estacion = item.Estacion.trim();
            consumo.productoDTO.producto = item.Producto.trim();

            if (consumo.vehiculoDTO.numEconomico.length > 0) {
              this.validarConsumo(consumo);
            }
          } catch (error: any) {
            this.messageService.add({ severity: 'error', sticky: true, summary: 'Formato incorrecto en CSV', detail: error.message });
          }
        });
      }
    });
  }

  validarConsumo(consumo: VehiculoConsumo): void {
    let isValid = true;
    const consumoValidado = consumo;

    // validar vehiculo
    const vehiculoDTO = this.vehiculos.find(x => x.numEconomico === consumo.vehiculoDTO.numEconomico);
    if (vehiculoDTO) {
      consumoValidado.vehiculoIdVehiculo = vehiculoDTO.idVehiculo;
      consumoValidado.vehiculoDTO = vehiculoDTO;
    } else {
      isValid = false;
      this.messageService.add({ severity: 'error', sticky: true, summary: 'Vehículo no encontrado', detail: 'El vehículo ' + consumo.vehiculoDTO.numEconomico + ' no fué encontrado, por favor registralo en el sistema.' });
    }

    // validar estacion
    const estacionDTO = this.estaciones.find(x => x.estacion === consumo.estacionDTO.estacion);
    if (estacionDTO) {
      consumoValidado.estacionIdEstacion = estacionDTO.idEstacion;
      consumoValidado.estacionDTO = estacionDTO;
    } else {
      isValid = false;
      this.messageService.add({ severity: 'error', sticky: true, summary: 'Estación no encontrada', detail: 'La estación ' + consumo.estacionDTO.estacion + ' no fué encontrada, por favor registrala en el sistema.' });
    }

    // validar producto
    const productoDTO = this.productos.find(x => x.producto == consumo.productoDTO.producto);
    if (productoDTO) {
      consumoValidado.productoIdProducto = productoDTO.idProducto;
      consumoValidado.productoDTO = productoDTO;
    } else {
      isValid = false;
      this.messageService.add({ severity: 'error', sticky: true, summary: 'Producto no encontrado', detail: 'El producto ' + consumo.productoDTO.producto + ' no fué encontrado, por favor registralo en el sistema.' });
    }

    if (isValid) {
      this.consumoService.saveVehiculoConsumo(consumoValidado).subscribe(
        (data: any) => {
          // success
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Consumo guardado para el vehículo ' + consumoValidado.vehiculoDTO.numEconomico });
          this.getVehiculosConsumos(new Filtro);
        },
        (error: any) => {
          //error
          console.log(JSON.stringify(error));
          if (error.status === 409) {
            this.messageService.add({ severity: 'warn', sticky: true, summary: 'Información', detail: error.error.message });
          } else {
            this.messageService.add({ severity: 'error', sticky: true, summary: 'Error', detail: error.error.message });
          }
        }
      )
    }
  }

  saveVehiculoConsumo(): void {
    this.saveConsumoModel.vehiculoIdVehiculo = this.saveConsumoModel.vehiculoDTO!.idVehiculo;
    this.saveConsumoModel.estacionIdEstacion = this.saveConsumoModel.estacionDTO.idEstacion;
    this.saveConsumoModel.productoIdProducto = this.saveConsumoModel.productoDTO.idProducto;
    this.saveConsumoModel.monto = "0"; // el monto se calcula en el backend
    this.saveConsumoModel.horaConsumo = this.saveConsumoModel.horaConsumoJson.horaConsumo;
    this.saveConsumoModel.fechaConsumo = new Date(this.saveConsumoModel.fechaConsumoString);

    // validate dates
    if (!utility.validateDate(this.saveConsumoModel.fechaConsumo, this.messageService)) {
      return;
    }

    this.consumoService.saveVehiculoConsumo(this.saveConsumoModel, this.modifyConsumo).subscribe(
      (data: any) => {
        // success
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Consumo guardado para el vehículo ' + this.saveConsumoModel.vehiculoDTO.numEconomico });
        this.addConsumoSidebarVisible = false;
        this.saveConsumoModel = new VehiculoConsumo;
        this.getVehiculosConsumos(new Filtro);
        this.modifyConsumo = false;
      },
      (error: any) => {
        //error
        this.messageService.add({ severity: 'error', sticky: true, summary: 'Error', detail: error.error.message });
        this.saveConsumoModel = new VehiculoConsumo();
        this.modifyConsumo = false;
      }
    )
  }

  editConsumo(vehiculoConsumo: VehiculoConsumo): void {
    this.saveConsumoModel = vehiculoConsumo;
    this.saveConsumoModel.fechaConsumoString = this.saveConsumoModel.fechaConsumo.toString().split('T')[0];

    const horaConsumo = new Hora();
    horaConsumo.horaConsumo = vehiculoConsumo.horaConsumo;

    const formattedDate = new Date(utility.formatFromStringToDate(vehiculoConsumo.fechaConsumo.toString().split('T')[0]));
    this.saveConsumoModel.fechaConsumo = formattedDate;
    this.saveConsumoModel.horaConsumoJson = horaConsumo;

    const foundVehiculo = this.vehiculos.find(vehiculo => vehiculo.numEconomico == vehiculoConsumo.vehiculoDTO!.numEconomico);
    this.saveConsumoModel.vehiculoDTO = foundVehiculo;

    this.modifyConsumo = true;
    this.addConsumoSidebarVisible = true;
  }

  filtrarConsumo(borrarFiltros?: boolean): void {
    if (borrarFiltros) {
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
        element.fechaConsumoString = utility.convertToDayMonthYearFormatHifen(element.fechaConsumo.toString().split('T')[0]);
        element.formattedDate = utility.formatFromStringToDateDescriptive(element.fechaConsumo.toString().split('T')[0]);
        element.monto = Number(element.monto).toFixed(2).toString();
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
