import { Component } from '@angular/core';
import { Proveedor } from '../../models/Proveedor';
import { UtilityService } from '../../services/utility/utility.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {

  proveedores: Proveedor[] =[];
  cols: any[] = [
    { field: 'proveedor', header: 'Proveedor', type: 'string' }
  ];
  addProveedorSidebarVisible: boolean = false;
  saveProveedorModel: Proveedor = new Proveedor;

  constructor(private proveedorService: UtilityService) {

  }

  ngOnInit(): void {
    this.getProveedores();
  }

  saveproveedor(): void {
    this.proveedorService.saveProveedor(this.saveProveedorModel).subscribe(
      (data: any) => {
        // success
        this.addProveedorSidebarVisible = false;
        this.saveProveedorModel = new Proveedor;
        this.getProveedores();
      },
      (error: any) => {
        //error
      }
    )
  }

  private getProveedores(): void {
    this.proveedorService.getProveedores().then(data => {
      this.proveedores = data;
    });
  }

}
