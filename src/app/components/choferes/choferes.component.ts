import { Component } from '@angular/core';
import { Chofer } from '../../models/Chofer';
import { ChoferService } from '../../services/chofer/chofer.service';
import { Sangre } from '../../models/Sangre';

@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrl: './choferes.component.css'
})
export class ChoferesComponent {

  choferes: Chofer[] = [];
  sangres: string[] = ['AB+', 'AB-', 'O+', 'O-'];
  cols: any[] = [
    { field: 'nombre', header: 'Nombre', type: 'string' },
    { field: 'fechaNacimiento', header: 'Fecha de nacimiento', type: 'string' },
    { field: 'direccion', header: 'Dirección', type: 'string' },
    { field: 'nss', header: 'Número de seguro social', type: 'string' },
    { field: 'vencimientoLicencia', header: 'Vencimiento de licencia', type: 'string' },
    { field: 'tipoSangre', header: 'Tipo de sangre', type: 'string' }
  ];
  addChoferSidebarVisible: boolean = false;
  saveChoferModel: Chofer = new Chofer;

  constructor(private choferesService: ChoferService) {

  }

  ngOnInit(): void {
    this.getChoferes();
  }

  saveChofer(): void {
    this.choferesService.saveChofer(this.saveChoferModel).subscribe(
      (data: any) => {
        // success
        this.addChoferSidebarVisible = false;
        this.saveChoferModel = new Chofer;
        this.getChoferes();
      },
      (error: any) => {
        //error
      }
    )
  }

  private getChoferes(): void {
    this.choferesService.getChoferes().then(data => {
      this.choferes = data;
    })
  }
}
