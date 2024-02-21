import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Chofer } from '../../models/Chofer';

@Injectable({
  providedIn: 'root'
})
export class ChoferService {
  
  private appControllerUrl: string;

  constructor(private http: HttpClient) {
    this.appControllerUrl = environment.appControllerUrl;
  }

  public saveChofer(chofer: Chofer) {
    return this.http.post<Chofer>(this.appControllerUrl + "chofer", chofer, { headers: { "Content-Type": "application/json" } });
  }

  public async getChoferes(): Promise<Chofer[]> {
    try {
      const data = await this.http.get<Chofer[]>(this.appControllerUrl + "chofer/findAll", { headers: { "Content-Type": "application/json" } }).toPromise();
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
