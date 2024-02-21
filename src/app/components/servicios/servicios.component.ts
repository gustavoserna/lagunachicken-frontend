import { Component } from '@angular/core';
import { Servicio } from '../../models/Servicio';
import { UtilityService } from '../../services/utility/utility.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

  servicios: Servicio[] = [];
  cols: any[] = [
    { field: 'servicio', header: 'Nombre del servicio', type: 'string' },
  ];
  addServicioSidebarVisible: boolean = false;
  saveServicioModel: Servicio = new Servicio;

  constructor(private utilirtService: UtilityService) {
    this.getServicios();
  }

  saveServicio(): void {
    this.utilirtService.saveServicio(this.saveServicioModel).subscribe(
      (data: any) => {
        // success
        this.addServicioSidebarVisible = false;
        this.saveServicioModel = new Servicio;
        this.getServicios();
      },
      (error: any) => {
        //error
      }
    )
  }

  private getServicios(): void {
    this.utilirtService.getServicios().then(data => {
      this.servicios = data;
    });
  }

}
