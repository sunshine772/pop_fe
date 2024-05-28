import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../service/app.layout.service';
import { AuthService } from 'src/app/api/services/auth/auth.service';
import { StorageService } from 'src/app/api/services/auth/storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
    isLoggedIn = false;

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private storageSevice: StorageService
    ) {}

    ngOnInit(): void {
        this.items = [
            {
                label: 'Etiquetas',
                icon: 'pi pi-tags',
                items: [
                    {
                        label: 'Gestionar',
                        icon: 'pi pi-wrench',
                        routerLink: '/panel/etiquetas',
                    },
                ],
            },
            {
                label: 'Generos',
                icon: 'pi pi-car',
                items: [
                    {
                        label: 'Gestionar',
                        icon: 'pi pi-wrench',
                        routerLink: '/panel/generos',
                    },
                ],
            },
            {
                label: 'Peliculas',
                icon: 'pi pi-play',
                items: [
                    {
                        label: 'Gestionar',
                        icon: 'pi pi-wrench',
                        routerLink: '/panel/peliculas',
                    },
                ],
            },
        ];
    }
    logout(): void {
        this.authService.logout().subscribe(
            () => {
                this.isLoggedIn = false;
            },
            (error) => {
                console.error('Logout failed', error);
            }
        );
    }
}
