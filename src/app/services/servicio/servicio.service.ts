import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { VehiculoServicio } from '../../models/VehiculoServicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private appControllerUrl: string;

  constructor(private http: HttpClient) {
    this.appControllerUrl = environment.appControllerUrl;
  }

  public async getVehiculosServicios(): Promise<VehiculoServicio[]> {
    try {
      const data = await this.http.get<VehiculoServicio[]>(this.appControllerUrl + "vehiculo/servicio/findAll", { headers: { "Content-Type": "application/json" } }).toPromise();
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
