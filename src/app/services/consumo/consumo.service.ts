import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { VehiculoConsumo } from '../../models/VehiculoConsumo';
import { Filtro } from '../../models/Filtro';
import { CostoConsumos } from '../../models/CostoConsumos';
import { Estacion } from '../../models/Estacion';
import { Producto } from '../../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ConsumoService {
  
  private appControllerUrl: string;

  constructor(private http: HttpClient) {
    this.appControllerUrl = environment.appControllerUrl;
  }

  public saveVehiculoConsumo(vehiculoConsumo: VehiculoConsumo) {
    return this.http.post<VehiculoConsumo>(this.appControllerUrl + "vehiculo/consumo", vehiculoConsumo, { headers: { "Content-Type": "application/json" } });
  }

  public async getVehiculosConsumos(filtro: Filtro): Promise<VehiculoConsumo[]> {
    try {
      const data = await this.http.post<VehiculoConsumo[]>(this.appControllerUrl + "vehiculo/consumo/findAll", filtro, { headers: { "Content-Type": "application/json" } }).toPromise();
      if (data !== undefined) {
        return data;
      } else {
        throw new Error("Data is undefined");
      }
    } catch (error) {
      throw error;
    }
  }

  public async getCostoConsumos(filtro: Filtro): Promise<CostoConsumos[]> {
    try {
      const data = await this.http.post<CostoConsumos[]>(this.appControllerUrl + "vehiculo/consumo/costos", filtro, { headers: { "Content-Type": "application/json" } }).toPromise();
      if (data !== undefined) {
        return data;
      } else {
        throw new Error("Data is undefined");
      }
    } catch (error) {
      throw error;
    }
  }

  public async getIncidenciasEstaciones(filtro: Filtro): Promise<Estacion[]> {
    try {
      const data = await this.http.post<Estacion[]>(this.appControllerUrl + "vehiculo/consumo/incidencia/estaciones", filtro, { headers: { "Content-Type": "application/json" } }).toPromise();
      if (data !== undefined) {
        return data;
      } else {
        throw new Error("Data is undefined");
      }
    } catch (error) {
      throw error;
    }
  }

  public async getIncidenciasProductos(filtro: Filtro): Promise<Producto[]> {
    try {
      const data = await this.http.post<Producto[]>(this.appControllerUrl + "vehiculo/consumo/incidencia/productos", filtro, { headers: { "Content-Type": "application/json" } }).toPromise();
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
