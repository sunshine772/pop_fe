import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import {  DialogModule } from 'primeng/dialog';
import { ComentarioComponent } from './comentario/comentario.component';
import { EtiquetaComponent } from './etiqueta/etiqueta.component';
import { GeneroComponent } from './genero/genero.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';



@NgModule({
  declarations: [
    ComentarioComponent,
    EtiquetaComponent,
    GeneroComponent,
    PeliculaComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule
  ]
})
export class PanelModule { }
