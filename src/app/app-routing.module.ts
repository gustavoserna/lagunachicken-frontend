import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChoferService } from './services/chofer/chofer.service';
import { ChoferesComponent } from './components/choferes/choferes.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos/vehiculos.component';

const routes: Routes = [
  { path: 'dashboard', component: InicioComponent, data: {animation: 'isRight'}},
  { path: 'login', component: LoginComponent, data: { title: 'Iniciar sesión' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Registrar usuario' } },
  { path: 'profile', component: ProfileComponent },
  { path: 'inicio', component: InicioComponent, data: { title: 'Dashboard' } },
  { path: 'choferes', component: ChoferesComponent, data: { title: 'Choferes' } },
  { path: 'vehiculos', component: VehiculosComponent, data: { title: 'Vehículos' } },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
