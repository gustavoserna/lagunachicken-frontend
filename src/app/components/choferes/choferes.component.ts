import { Component } from '@angular/core';
import { Chofer } from '../../models/Chofer';
import { ChoferService } from '../../services/chofer/chofer.service';
import { Sangre } from '../../models/Sangre';
import { utility } from '../../utility/utility';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrl: './choferes.component.css',
  providers: [MessageService]
})
export class ChoferesComponent {

  choferes: Chofer[] = [];
  sangres: string[] = ['AB+', 'AB-', 'O+', 'O-'];
  cols: any[] = [
    { field: 'nombre', header: 'Nombre', type: 'string' },
    { field: 'formattedDateNacimiento', header: 'Fecha de nacimiento', type: 'string' },
    { field: 'direccion', header: 'Dirección', type: 'string' },
    { field: 'nss', header: 'Número de seguro social', type: 'string' },
    { field: 'formattedDateLicencia', header: 'Vencimiento de licencia', type: 'string' },
    { field: 'tipoSangre', header: 'Tipo de sangre', type: 'string' }
  ];
  addChoferSidebarVisible: boolean = false;
  saveChoferModel: Chofer = new Chofer;

  constructor(private choferesService: ChoferService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.getChoferes();
  }

  saveChofer(): void {
    this.choferesService.saveChofer(this.saveChoferModel).subscribe(
      (data: any) => {
        // success
        this.messageService.add({ severity: 'success', sticky: true, summary: 'Éxito', detail: 'Chofer guardado.' });
        this.addChoferSidebarVisible = false;
        this.saveChoferModel = new Chofer;
        this.getChoferes();
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', sticky: true, summary: 'Error', detail: error.error.message });
      }
    )
  }

  private getChoferes(): void {
    this.choferesService.getChoferes().then(data => {
      data.forEach(element => {
        const formattedDateNacimiento = utility.formatFromStringToDateDescriptive(element.fechaNacimiento);
        const formattedDateLicencia = utility.formatFromStringToDateDescriptive(element.vencimientoLicencia);
        element.formattedDateNacimiento = formattedDateNacimiento;
        element.formattedDateLicencia = formattedDateLicencia;
      });
      this.choferes = data;
    })
  }
}
