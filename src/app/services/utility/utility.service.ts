import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Sucursal } from '../../models/Sucursal';

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
}
