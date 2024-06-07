import { Component, OnInit, ViewChild } from '@angular/core';
import { VehiculoServicio } from '../../models/VehiculoServicio';
import { UtilityService } from '../../services/utility/utility.service';
import { ChoferService } from '../../services/chofer/chofer.service';
import { Chofer } from '../../models/Chofer';
import { Proveedor } from '../../models/Proveedor';
import { VehiculoService } from '../../services/vehiculo/vehiculo.service';
import { Vehiculo } from '../../models/Vehiculo';
import { Servicio } from '../../models/Servicio';
import { ServicioService } from '../../services/servicio/servicio.service';
import { Filtro } from '../../models/Filtro';
import { format } from 'date-fns';
import { es, fi } from 'date-fns/locale';
import { FileUpload } from 'primeng/fileupload';
import { environment } from '../../../environments/environments';
import { utility } from '../../utility/utility';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-servicios-vehiculo',
  templateUrl: './servicios-vehiculo.component.html',
  styleUrl: './servicios-vehiculo.component.css',
  providers: [MessageService]
})
export class ServiciosVehiculoComponent implements OnInit {

  private fileControllerUrl: string;

  //filtros
  filtro: Filtro = new Filtro;
  selectedServicio: Servicio = new Servicio;
  selectedVehiculo: Vehiculo = new Vehiculo;

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
    { field: 'formattedDate', header: 'Fecha', type: 'string' }
  ];
  addServicioSidebarVisible: boolean = false;
  saveServicioModel: VehiculoServicio = new VehiculoServicio;

  @ViewChild('fileUpload') fileUpload: FileUpload;

  constructor(
    private vehiculoService: VehiculoService,
    private utilityService: UtilityService,
    private choferesService: ChoferService,
    private servicioService: ServicioService,
    private messageService: MessageService
  ) 
  {
    this.fileControllerUrl = environment.fileControllerUrl;
  }

  ngOnInit(): void {
    this.getVehiculosServicios(new Filtro);
    this.getVehiculos();
    this.getChoferes();
    this.getProveedores();
    this.getTiposServicio();
  }


  saveServicio(): void {
    this.saveServicioModel.vehiculoIdVehiculo = this.saveServicioModel.vehiculoDTO.idVehiculo;
    this.saveServicioModel.servicioIdServicio = this.saveServicioModel.servicioDTO.idServicio;
    this.saveServicioModel.proveedorIdProveedor = this.saveServicioModel.proveedorDTO.idProveedor;

    // Upload the file here
    // Access the uploaded file
    const uploadedFiles = this.fileUpload.files;
    const file: File = uploadedFiles[0];
    
    this.vehiculoService.saveVehiculoServicio(file, this.saveServicioModel).subscribe(
      (data: any) => {
        // success
        this.messageService.add({ severity: 'success', sticky: true, summary: 'Éxito', detail: 'Servicio guardado.' });
        this.addServicioSidebarVisible = false;
        this.saveServicioModel = new VehiculoServicio;
        this.getVehiculosServicios(new Filtro);
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', sticky: true, summary: 'Error', detail: error.error.message });
      }
    )
  }

  public filtrar(borrarFiltros?: boolean): void {
    if(borrarFiltros) {
      this.filtro = new Filtro;
      this.selectedServicio = new Servicio;
      this.selectedVehiculo = new Vehiculo;
    } else {
      this.filtro.idServicio = this.selectedServicio.idServicio;
    this.filtro.idVehiculo = this.selectedVehiculo.idVehiculo;
    }

    this.getVehiculosServicios(this.filtro);
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

  downloadFile(vehiculoServicio: VehiculoServicio): void {
    // Replace 'your_file_url' with the actual URL of your file to download
    const fileUrl = this.fileControllerUrl + vehiculoServicio.file;
    
    // Create a new anchor element
    const link = document.createElement('a');
    link.setAttribute('target', '_self');
    link.setAttribute('href', fileUrl);
    
    // Trigger the download by programmatically clicking the link
    link.click();
  }

  private getVehiculosServicios(filtro: Filtro): void {
    this.servicioService.getVehiculosServicios(this.filtro).then(data => {
      data.forEach(element => {
        element.formattedDate = utility.formatFromStringToDateDescriptive(element.fechaServicio.toString().split('T')[0]);
      });
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
