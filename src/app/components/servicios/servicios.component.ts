import { Component } from '@angular/core';
import { Servicio } from '../../models/Servicio';
import { UtilityService } from '../../services/utility/utility.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css',
  providers: [MessageService]
})
export class ServiciosComponent {

  servicios: Servicio[] = [];
  cols: any[] = [
    { field: 'servicio', header: 'Nombre del servicio', type: 'string' },
  ];
  addServicioSidebarVisible: boolean = false;
  saveServicioModel: Servicio = new Servicio;

  constructor(private utilirtService: UtilityService, private messageService: MessageService) {
    this.getServicios();
  }

  saveServicio(): void {
    this.utilirtService.saveServicio(this.saveServicioModel).subscribe(
      (data: any) => {
        // success
        this.messageService.add({ severity: 'success', sticky: true, summary: 'Éxito', detail: 'Servicio guardado.' });
        this.addServicioSidebarVisible = false;
        this.saveServicioModel = new Servicio;
        this.getServicios();
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', sticky: true, summary: 'Error', detail: error.error.message });
      }
    )
  }
  
  editServicio(servicio: Servicio): void {
    this.saveServicioModel = servicio;

    this.addServicioSidebarVisible = true;
  }

  private getServicios(): void {
    this.utilirtService.getServicios().then(data => {
      this.servicios = data;
    });
  }

}
