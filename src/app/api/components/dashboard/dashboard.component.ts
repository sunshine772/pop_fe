import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';

import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { GeneroService } from 'src/app/api/services/api/genero/genero.service';
import { Genero } from 'src/app/api/models/genero/genero';
import { ComentarioService } from 'src/app/api/services/api/comentario/comentario.service';
import { EtiquetaService } from 'src/app/api/services/api/etiqueta/etiqueta.service';
import { PeliculaService } from 'src/app/api/services/api/pelicula/pelicula.service';
import { Pelicula } from '../../models/pelicula/pelicula';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    peliculas: Pelicula[] = [];

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    constructor(
        private peliculasService: PeliculaService,
        public layoutService: LayoutService
    ) {}

    ngOnInit() {
        this.peliculasService.getPeliculas().subscribe((res) => {
            console.log(res);
            this.peliculas = res;
        });
    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    // onFilter(dv: DataView, event: Event) {
    //     dv.filter((event.target as HTMLInputElement).value);
    // }
}
