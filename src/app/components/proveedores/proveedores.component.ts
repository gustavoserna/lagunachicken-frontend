import { Component } from '@angular/core';
import { Proveedor } from '../../models/Proveedor';
import { UtilityService } from '../../services/utility/utility.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css',
  providers: [MessageService]
})
export class ProveedoresComponent {

  proveedores: Proveedor[] =[];
  cols: any[] = [
    { field: 'proveedor', header: 'Proveedor', type: 'string' }
  ];
  addProveedorSidebarVisible: boolean = false;
  saveProveedorModel: Proveedor = new Proveedor;

  constructor(private proveedorService: UtilityService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.getProveedores();
  }

  saveproveedor(): void {
    this.proveedorService.saveProveedor(this.saveProveedorModel).subscribe(
      (data: any) => {
        // success
        this.messageService.add({ severity: 'success', sticky: true, summary: 'Éxito', detail: 'Proveedor guardado.' });
        this.addProveedorSidebarVisible = false;
        this.saveProveedorModel = new Proveedor;
        this.getProveedores();
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', sticky: true, summary: 'Error', detail: error.error.message });
      }
    )
  }

  editProveedor(proveedor: Proveedor): void {
    this.saveProveedorModel = proveedor;

    this.addProveedorSidebarVisible = true;
  }

  private getProveedores(): void {
    this.proveedorService.getProveedores().then(data => {
      this.proveedores = data;
    });
  }

}
