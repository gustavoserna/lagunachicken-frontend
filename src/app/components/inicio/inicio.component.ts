import { Component, ViewChild } from '@angular/core';
import { ServicioService } from '../../services/servicio/servicio.service';
import { CostoServicios } from '../../models/CostoServicios';
import { Data, Dataset } from '../../models/Data';
import { Chofer } from '../../models/Chofer';
import { ChoferService } from '../../services/chofer/chofer.service';
import { Filtro } from '../../models/Filtro';
import { VehiculoService } from '../../services/vehiculo/vehiculo.service';
import { Vehiculo } from '../../models/Vehiculo';
import { UtilityService } from '../../services/utility/utility.service';
import { Servicio } from '../../models/Servicio';
import { VehiculoServicio } from '../../models/VehiculoServicio';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { Producto } from '../../models/Producto';
import { VehiculoConsumo } from '../../models/VehiculoConsumo';
import { ConsumoService } from '../../services/consumo/consumo.service';
import { CostoConsumos } from '../../models/CostoConsumos';
import { Table } from 'primeng/table';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  // ---- filtros ----
  //servicios
  filtro: Filtro = new Filtro;
  servicios: Servicio[] = [];
  incidenciasServicios: Servicio[] = [];
  costoServicios: CostoServicios[] = [];
  vehiculos: Vehiculo[] = [];
  choferes: Chofer[] = [];
  selectedServicio: Servicio = new Servicio;
  selectedVehiculo: Vehiculo = new Vehiculo;
  selectedChofer: Chofer = new Chofer;
  //consumo
  filtroConsumo: Filtro = new Filtro;
  vehiculosConsumo: Vehiculo[] = [];
  selectedVehiculoConsumo: Vehiculo = new Vehiculo;
  productosConsumo: Producto[] = [];
  selectedProductoConsumo: Producto = new Producto;
  incidenciasProductosConsumo: Producto[] = [];
  costoConsumos: CostoConsumos[] = [];

  // --- tables ----
  //servicios
  @ViewChild('serviciosTable') serviciosTable!: Table;
  costosTable: any;
  incidenciasTable: any;
  options: any;
  //consumos
  @ViewChild('consumosTable') consumosTable!: Table;
  costosConsumoTable: any;
  rendimientosPromediosTable: any;
  incidenciasConsumoTable: any;
  incidenciasProductoConsumoTable: any;

  // tabla servicios
  serviciosTabla: VehiculoServicio[] = [];
  cols: any[] = [
    { field: 'vehiculoDTO', subfield: 'numEconomico', header: 'Número económico', type: 'string' },
    { field: 'vehiculoDTO', subfield: 'placas', header: 'Placas', type: 'string' },
    { field: 'servicioDTO', subfield: 'servicio', header: 'Servicio aplicado', type: 'string' },
    { field: 'proveedorDTO', subfield: 'proveedor', header: 'Proveedor', type: 'string' },
    { field: 'kilometraje', header: 'Kilometraje registrado', type: 'string' },
    { field: 'folioFactura', header: 'Folio de factura', type: 'string' },
    { field: 'costo', header: 'Costo', type: 'string' },
    { field: 'descripcion', header: 'Descripción', type: 'string' },
    { field: 'formattedDate', header: 'Fecha', type: 'string' },
  ];

  // tabla consumos
  consumosTabla: VehiculoConsumo[] = [];
  colsConsumos: any[] = [
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

  constructor(
    private papa: Papa,
    private servicioService: ServicioService,
    private choferesService: ChoferService,
    private vehiculoService: VehiculoService,
    private consumoService: ConsumoService,
    private utilityService: UtilityService
  ) {
    this.options = {
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false,
          },
          angleLines: {
            display: true, // Mostrar líneas de ángulo
            lineWidth: 1, // Ancho de la línea
          }
        }],
        yAxes: [{  // Opcional, si necesitas configurar también el eje Y
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
    // general
    this.getVehiculos();
    this.getServicios();
    this.getProductos();

    // servicios
    this.getVehiculosServicios(new Filtro);
    this.getCostoServicio(new Filtro);
    this.getIncidenciasServicios(new Filtro);

    // consumos
    this.getVehiculosConsumos(new Filtro)
    this.getCostoConsumos(new Filtro);
    this.getIncidenciasProductos(new Filtro);
    this.getRendimientosPromedio(new Filtro);
  }

  public filtrar(borrarFiltros?: boolean): void {
    if(borrarFiltros) {
      this.filtro = new Filtro;
      this.selectedServicio = new Servicio;
      this.selectedVehiculo = new Vehiculo;
      this.selectedChofer = new Chofer;
    } else {
      this.filtro.idServicio = this.selectedServicio.idServicio;
    this.filtro.idVehiculo = this.selectedVehiculo.idVehiculo;
    }

    this.getCostoServicio(this.filtro);
    this.getVehiculosServicios(this.filtro);
    this.getIncidenciasServicios(this.filtro);
  }

  public filtrarConsumo(borrarFiltros?: boolean): void {
    if(borrarFiltros) {
      this.filtroConsumo = new Filtro;
      this.selectedVehiculoConsumo = new Vehiculo;
      this.selectedProductoConsumo = new Producto;
    } else {
      this.filtroConsumo.idVehiculo = this.selectedVehiculoConsumo.idVehiculo;
      this.filtroConsumo.idProducto = this.selectedProductoConsumo.idProducto;
    }

    this.getCostoConsumos(this.filtroConsumo);
    this.getIncidenciasProductos(this.filtroConsumo);
    this.getRendimientosPromedio(this.filtroConsumo);
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

  private getCostoServicio(filtro: Filtro): void {
    this.servicioService.getCostoServicios(filtro).then(result => {
      this.costoServicios = result;
      let data: Data = new Data;
      let dataset: Dataset = new Dataset;
      let datasets: Dataset[] = [];
      
      dataset.label = "Costo Mantenimientos";
      dataset.backgroundColor = "#fc3d03";

      this.costoServicios.forEach(element => {
        data.labels.push(element.vehiculoDTO.numEconomico);
        dataset.data.push(element.totalCostoServicios);
      });

      datasets.push(dataset);
      data.datasets = datasets;
      this.costosTable = data;
    });
  }

  private getCostoConsumos(filtro: Filtro): void {
    this.consumoService.getCostoConsumos(filtro).then(result => {
      this.costoConsumos = result;
      let data: Data = new Data;
      let dataset: Dataset = new Dataset;
      let datasets: Dataset[] = [];
      
      dataset.label = "Costo Consumos";
      dataset.backgroundColor = "#7c2af7";

      this.costoConsumos.forEach(element => {
        data.labels.push(element.vehiculoDTO.numEconomico);
        dataset.data.push(element.totalMontosConsumos);
      });

      datasets.push(dataset);
      data.datasets = datasets;
      this.costosConsumoTable = data;
    });
  }

  private getIncidenciasServicios(filtro: Filtro): void {
    this.servicioService.getIncidenciasServicios(filtro).then(result => {
      this.incidenciasServicios = result;
      let data: Data = new Data;
      let dataset: Dataset = new Dataset;
      let datasets: Dataset[] = [];
      
      dataset.label = "Conteo Servicios";
      dataset.backgroundColor = "#2cf205";

      this.incidenciasServicios.forEach(element => {
        data.labels.push(element.servicio);
        dataset.data.push(element.incidencias);
      });

      datasets.push(dataset);
      data.datasets = datasets;
      this.incidenciasTable = data;
    });
  }

  private getRendimientosPromedio(filtro: Filtro): void {
    this.consumoService.getCostoConsumos(filtro).then(result => {
      this.costoConsumos = result;
      
      let data: Data = new Data;
      let dataset: Dataset = new Dataset;
      let datasets: Dataset[] = [];
      
      dataset.label = "Rendimiento Promedio";
      dataset.backgroundColor = "#7c2af7";

      this.costoConsumos.forEach(element => {
        data.labels.push(element.vehiculoDTO.numEconomico);
        dataset.data.push(element.rendimientoPromedio);
      });

      datasets.push(dataset);
      data.datasets = datasets;
      this.rendimientosPromediosTable = data;
    });
  }

  private getIncidenciasProductos(filtro: Filtro): void {
    this.consumoService.getIncidenciasProductos(filtro).then(result => {
      this.incidenciasProductosConsumo = result;
      let data: Data = new Data;
      let dataset: Dataset = new Dataset;
      let datasets: Dataset[] = [];
      
      dataset.label = "Litros Combustible";
      dataset.backgroundColor = "#ed269f";

      this.incidenciasProductosConsumo.forEach(element => {
        data.labels.push(element.producto);
        dataset.data.push(element.incidenciasLitrosProducto);
      });

      datasets.push(dataset);
      data.datasets = datasets;
      this.incidenciasProductoConsumoTable = data;
    });
  }

  private getVehiculosServicios(filtro: Filtro): void {
    this.servicioService.getVehiculosServicios(filtro).then(data => {
      data.forEach(element => {
        const fecha = new Date(element.fechaServicio!);
        element.formattedDate = format(fecha, "dd 'de' MMMM 'del' yyyy", { locale: es });
      });
      this.serviciosTabla = data;
    });
  }

  private getVehiculosConsumos(filtro: Filtro): void {
    this.consumoService.getVehiculosConsumos(filtro).then(data => {
      data.forEach(element => {
        const fecha = new Date(element.fechaConsumo!);
        element.formattedDate = format(fecha, "dd 'de' MMMM 'del' yyyy", { locale: es });
      });
      this.consumosTabla = data;
    });
  }

  private getChoferes(): void {
    this.choferesService.getChoferes().then(data => {
      this.choferes = data;
    })
  }

  private getVehiculos() {
    this.vehiculoService.getVehiculos().then(data => {
      this.vehiculos = data;
      this.vehiculosConsumo = data;
    });
  }

  private getServicios(): void {
    this.utilityService.getServicios().then(data => {
      this.servicios = data;
    });
  }

  private getProductos(): void {
    this.utilityService.getProductos().then(data => {
      this.productosConsumo = data;
    });
  }

}
