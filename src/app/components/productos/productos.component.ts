import { Component } from '@angular/core';
import { Producto } from '../../models/Producto';
import { UtilityService } from '../../services/utility/utility.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  productos: Producto[] =[];
  cols: any[] = [
    { field: 'producto', header: 'Producto', type: 'string' }
  ];
  addProductoSidebarVisible: boolean = false;
  saveProductoModel: Producto = new Producto;

  constructor(private productoService: UtilityService) {

  }

  ngOnInit(): void {
    this.getProductos();
  }

  saveproducto(): void {
    this.productoService.saveProducto(this.saveProductoModel).subscribe(
      (data: any) => {
        // success
        this.addProductoSidebarVisible = false;
        this.saveProductoModel = new Producto;
        this.getProductos();
      },
      (error: any) => {
        //error
      }
    )
  }

  private getProductos(): void {
    this.productoService.getProductos().then(data => {
      this.productos = data;
    });
  }

}
