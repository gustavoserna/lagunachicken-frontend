import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'Plataforma';
  sidebarTitle: string = 'Dashboard';
  items: MenuItem[] = [];
  sidebarVisible: boolean = true;

  // session vars
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private storageService: StorageService, private authService: AuthService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updatePageTitle();
    });
  }

  ngOnInit() {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-chart-pie', routerLink: ['/inicio'] },
      { label: 'Choferes', icon: 'pi pi-database', routerLink: ['/choferes'] },
    ];

    // session logic
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
      this.router.navigate(['inicio']);
    } else {
      this.sidebarVisible = false;
      this.router.navigate(['login']);
    }
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
