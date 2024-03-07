import { Component } from '@angular/core';
import { Estacion } from '../../models/Estacion';
import { UtilityService } from '../../services/utility/utility.service';
import { Vehiculo } from '../../models/Vehiculo';
import { VehiculoService } from '../../services/vehiculo/vehiculo.service';

@Component({
  selector: 'app-estaciones',
  templateUrl: './estaciones.component.html',
  styleUrl: './estaciones.component.css'
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
    private estacionService: UtilityService 
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
        this.addEstacionSidebarVisible = false;
        this.saveEstacionModel = new Estacion;
        this.getEstaciones();
      },
      (error: any) => {
        //error
      }
    )
  }

  private getEstaciones(): void {
    this.estacionService.getEstaciones().then(data => {
      this.estaciones = data;
    });
  }

}
