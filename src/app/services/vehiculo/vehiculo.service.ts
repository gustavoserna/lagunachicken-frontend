import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Vehiculo } from '../../models/Vehiculo';
import { VehiculoServicio } from '../../models/VehiculoServicio';
import { Observable } from 'rxjs';

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

  public saveVehiculoServicio(file: File, vehiculoServicio: VehiculoServicio): Observable<any> {
    const formData: FormData = new FormData();
    if (file !== undefined) {
      formData.append('file', file, file.name);
    }

    formData.append('vehiculoServicio', JSON.stringify(vehiculoServicio));

    // Opcional: Si necesitas enviar otros datos junto con el archivo, puedes hacerlo aquí
    // formData.append('otherData', otherData);

    // Define las cabeceras si es necesario (puede variar según tu API)
    const headers = new HttpHeaders({
      'Accept': 'application/json'
      // otras cabeceras si es necesario
    });

    // Realiza la solicitud POST al servidor
    return this.http.post<Vehiculo>(this.appControllerUrl + "vehiculo/servicio", formData, { headers: headers });
  }

}
