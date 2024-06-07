import { Component } from '@angular/core';
import { Producto } from '../../models/Producto';
import { UtilityService } from '../../services/utility/utility.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  providers: [MessageService]
})
export class ProductosComponent {

  productos: Producto[] =[];
  cols: any[] = [
    { field: 'producto', header: 'Producto', type: 'string' }
  ];
  addProductoSidebarVisible: boolean = false;
  saveProductoModel: Producto = new Producto;

  constructor(private productoService: UtilityService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.getProductos();
  }

  saveproducto(): void {
    this.productoService.saveProducto(this.saveProductoModel).subscribe(
      (data: any) => {
        // success
        this.messageService.add({ severity: 'success', sticky: true, summary: 'Éxito', detail: 'Producto guardado.' });
        this.addProductoSidebarVisible = false;
        this.saveProductoModel = new Producto;
        this.getProductos();
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', sticky: true, summary: 'Error', detail: error.error.message });
      }
    )
  }

  editProducto(producto: Producto): void {
    this.saveProductoModel = producto;

    this.addProductoSidebarVisible = true;
  }

  private getProductos(): void {
    this.productoService.getProductos().then(data => {
      this.productos = data;
    });
  }

}
