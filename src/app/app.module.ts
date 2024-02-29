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
    ServiciosVehiculoComponent
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
    CalendarModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
