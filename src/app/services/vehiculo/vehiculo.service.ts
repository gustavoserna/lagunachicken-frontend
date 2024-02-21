import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Vehiculo } from '../../models/Vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private appControllerUrl: string;

  constructor(private http: HttpClient) {
    this.appControllerUrl = environment.appControllerUrl;
  }

  public saveVehiculo(vehiculo: Vehiculo) {
    return this.http.post<Vehiculo>(this.appControllerUrl + "vehiculo", vehiculo, { headers: { "Content-Type": "application/json" } });
  }

  public async getVehiculos(): Promise<Vehiculo[]> {
    try {
      const data = await this.http.get<Vehiculo[]>(this.appControllerUrl + "vehiculo/findAll", { headers: { "Content-Type": "application/json" } }).toPromise();
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
