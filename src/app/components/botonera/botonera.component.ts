import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-botonera',
  templateUrl: './botonera.component.html',
  styleUrl: './botonera.component.css'
})
export class BotoneraComponent {

  title = 'Plataforma';
  sidebarTitle: string = 'Dashboard';
  items: MenuItem[] = [];
  sidebarVisible: boolean = true;

  constructor(
      private router: Router, 
      private activatedRoute: ActivatedRoute,
      private storageService: StorageService,
      private authService: AuthService,
    ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updatePageTitle();
    });
  }

  ngOnInit() {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-chart-pie', routerLink: ['/inicio'] },
      { label: 'Choferes', icon: 'pi pi-users', routerLink: ['/choferes'] },
      { label: 'Servicios', icon: 'pi pi-wrench', routerLink: ['/servicios'] },
      {
        label: 'Vehículos', 
        icon: 'pi pi-truck', 
        items: [
          { label: 'Lista de vehículos', icon: 'pi pi-list', routerLink: ['/vehiculos']  },
          { label: 'Registro de servicios', icon: 'pi pi-wrench', routerLink: ['/registro-servicios']  }
        ]
      },
      { label: 'Cerrar sesión', icon: 'pi pi-power-off', command: () => this.logout() },
    ];
  }

  private updatePageTitle() {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    this.sidebarTitle = route.snapshot.data['title'] || 'Dashboard';
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
