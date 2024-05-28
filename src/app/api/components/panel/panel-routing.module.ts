import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtiquetaComponent } from './etiqueta/etiqueta.component';
import { GeneroComponent } from './genero/genero.component';
import { PeliculaComponent } from './pelicula/pelicula.component';

const routes: Routes = [
    { path: 'etiquetas', component: EtiquetaComponent },
    { path: 'generos', component: GeneroComponent },
    { path: 'peliculas', component: PeliculaComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PanelRoutingModule {}
