import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {SidebarModule} from 'primeng/sidebar';
import {MenuItem} from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import {PanelModule} from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';

import { CalendarModule } from 'primeng/calendar';


import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { httpInterceptorProviders } from './helpers/http.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChoferesComponent } from './components/choferes/choferes.component';
import { BotoneraComponent } from './components/botonera/botonera.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos/vehiculos.component';
import { AccordionModule } from 'primeng/accordion';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ServiciosVehiculoComponent } from './components/servicios-vehiculo/servicios-vehiculo.component';
import { ConsumosComponent } from './components/consumos/consumos.component';
import { EstacionesComponent } from './components/estaciones/estaciones.component';
import { ProductosComponent } from './components/productos/productos.component';
import { RegistroConsumoComponent } from './components/registro-consumo/registro-consumo.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Router } from '@angular/router';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ChoferesComponent,
    BotoneraComponent,
    VehiculosComponent,
    ServiciosComponent,
    ServiciosVehiculoComponent,
    ConsumosComponent,
    EstacionesComponent,
    ProductosComponent,
    RegistroConsumoComponent,
    ProveedoresComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SidebarModule,
    MenuModule,
    PanelModule,
    NoopAnimationsModule,
    TableModule,
    ButtonModule,
    ChartModule,
    DialogModule,
    AvatarGroupModule,
    AvatarModule,
    HttpClientModule,
    InputTextModule,
    AccordionModule,
    DropdownModule,
    FlexLayoutModule,
    TieredMenuModule,
    PanelMenuModule,
    CalendarModule,
    InputNumberModule,
    TabViewModule,
    FileUploadModule,
    OverlayPanelModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { 
  public constructor(private router: Router) {

    if(localStorage.getItem("lastUrl")=="/error")
    {
      localStorage.setItem("lastUrl",null);
      this.router.navigate(['/']);
    
    }
  }
}
