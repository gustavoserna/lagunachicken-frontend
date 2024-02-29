import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Sucursal } from '../../models/Sucursal';
import { Servicio } from '../../models/Servicio';
import { Proveedor } from '../../models/Proveedor';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private appControllerUrl: string;

  constructor(private http: HttpClient) {
    this.appControllerUrl = environment.appControllerUrl;
  }

  public async getSucursales(): Promise<Sucursal[]> {
    try {
      const data = await this.http.get<Sucursal[]>(this.appControllerUrl + "sucursal/findAll", { headers: { "Content-Type": "application/json" } }).toPromise();
      if (data !== undefined) {
        return data;
      } else {
        throw new Error("Data is undefined");
      }
    } catch (error) {
      throw error;
    }
  }

  public saveServicio(servicio: Servicio) {
    return this.http.post<Servicio>(this.appControllerUrl + "servicio", servicio, { headers: { "Content-Type": "application/json" } });
  }

  public async getServicios(): Promise<Servicio[]> {
    try {
      const data = await this.http.get<Servicio[]>(this.appControllerUrl + "servicio/findAll", { headers: { "Content-Type": "application/json" } }).toPromise();
      if (data !== undefined) {
        return data;
      } else {
        throw new Error("Data is undefined");
      }
    } catch (error) {
      throw error;
    }
  }

  public saveProveedor(proveedor: Proveedor) {
    return this.http.post<Proveedor>(this.appControllerUrl + "proveedor", proveedor, { headers: { "Content-Type": "application/json" } });
  }

  public async getProveedores(): Promise<Proveedor[]> {
    try {
      const data = await this.http.get<Proveedor[]>(this.appControllerUrl + "proveedor/findAll", { headers: { "Content-Type": "application/json" } }).toPromise();
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
