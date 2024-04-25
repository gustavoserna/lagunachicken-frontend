import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChoferesComponent } from './components/choferes/choferes.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos/vehiculos.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ServiciosVehiculoComponent } from './components/servicios-vehiculo/servicios-vehiculo.component';
import { ConsumosComponent } from './components/consumos/consumos.component';
import { EstacionesComponent } from './components/estaciones/estaciones.component';
import { ProductosComponent } from './components/productos/productos.component';
import { RegistroConsumoComponent } from './components/registro-consumo/registro-consumo.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';

const routes: Routes = [
  //{ path: 'dashboard', component: InicioComponent, data: {animation: 'isRight'}},
  { path: 'login', component: LoginComponent, data: { title: 'Iniciar sesión' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Registrar usuario' } },
  { path: 'profile', component: ProfileComponent },
  { path: 'choferes', component: ChoferesComponent, data: { title: 'Choferes' } },
  { path: 'inicio', component: InicioComponent, data: { title: 'Inicio' } },
  { path: 'vehiculos', component: VehiculosComponent, data: { title: 'Vehículos' } },
  { path: 'servicios', component: ServiciosComponent, data: { title: 'Servicios' } },
  { path: 'registro-servicios', component: ServiciosVehiculoComponent, data: { title: 'Registro' } },
  { path: 'consumo', component: ConsumosComponent, data: { title: 'Consumo' } },
  { path: 'proveedores', component: ProveedoresComponent, data: { title: 'Lista de proveedores' } },
  { path: 'estaciones', component: EstacionesComponent, data: { title: 'Estaciones' } },
  { path: 'productos', component: ProductosComponent, data: { title: 'Productos' } },
  { path: 'registro-consumo', component: RegistroConsumoComponent, data: { title: 'Registro consumo' } },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
