import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { VehiculoServicio } from '../../models/VehiculoServicio';
import { CostoServicios } from '../../models/CostoServicios';
import { Filtro } from '../../models/Filtro';
import { Servicio } from '../../models/Servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private appControllerUrl: string;

  constructor(private http: HttpClient) {
    this.appControllerUrl = environment.appControllerUrl;
  }

  public async getVehiculosServicios(filtro: Filtro): Promise<VehiculoServicio[]> {
    try {
      const data = await this.http.post<VehiculoServicio[]>(this.appControllerUrl + "vehiculo/servicio/findAll", filtro, { headers: { "Content-Type": "application/json" } }).toPromise();
      if (data !== undefined) {
        return data;
      } else {
        throw new Error("Data is undefined");
      }
    } catch (error) {
      throw error;
    }
  }

  public async getCostoServicios(filtro: Filtro): Promise<CostoServicios[]> {
    try {
      const data = await this.http.post<CostoServicios[]>(this.appControllerUrl + "vehiculo/servicio/costos", filtro, { headers: { "Content-Type": "application/json" } }).toPromise();
      if (data !== undefined) {
        return data;
      } else {
        throw new Error("Data is undefined");
      }
    } catch (error) {
      throw error;
    }
  }

  public async getIncidenciasServicios(filtro: Filtro): Promise<Servicio[]> {
    try {
      const data = await this.http.post<Servicio[]>(this.appControllerUrl + "vehiculo/servicio/incidencia/servicios", filtro, { headers: { "Content-Type": "application/json" } }).toPromise();
      if (data !== undefined) {
        return data;
      } else {
        throw new Error("Data is undefined");
      }
    } catch (error) {
      throw error;
    }
  }
}
