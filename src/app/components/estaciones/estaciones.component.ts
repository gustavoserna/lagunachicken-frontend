import { Component } from '@angular/core';
import { Estacion } from '../../models/Estacion';
import { UtilityService } from '../../services/utility/utility.service';
import { Vehiculo } from '../../models/Vehiculo';
import { VehiculoService } from '../../services/vehiculo/vehiculo.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-estaciones',
  templateUrl: './estaciones.component.html',
  styleUrl: './estaciones.component.css',
  providers: [MessageService]
})
export class EstacionesComponent {

  // form registrar servicio
  vehiculos: Vehiculo[] = [];

  estaciones: Estacion[] =[];
  cols: any[] = [
    { field: 'estacion', header: 'Estación', type: 'string' }
  ];
  addEstacionSidebarVisible: boolean = false;
  saveEstacionModel: Estacion = new Estacion;

  constructor(
    private estacionService: UtilityService,
    private messageService: MessageService
  ) 
  {

  }

  ngOnInit(): void {
    this.getEstaciones();
  }

  saveEstacion(): void {
    this.estacionService.saveEstacion(this.saveEstacionModel).subscribe(
      (data: any) => {
        // success
        this.messageService.add({ severity: 'success', sticky: true, summary: 'Éxito', detail: 'Estación guardada.' });
        this.addEstacionSidebarVisible = false;
        this.saveEstacionModel = new Estacion;
        this.getEstaciones();
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', sticky: true, summary: 'Error', detail: error.error.message });
      }
    )
  }

  editEstacion(estacion: Estacion): void {
    this.saveEstacionModel = estacion;

    this.addEstacionSidebarVisible = true;
  }

  private getEstaciones(): void {
    this.estacionService.getEstaciones().then(data => {
      this.estaciones = data;
    });
  }

}
