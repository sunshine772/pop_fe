import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Pelicula } from 'src/app/api/models/pelicula/pelicula';
import { PeliculaService } from 'src/app/api/services/api/pelicula/pelicula.service';
import {
    NgxFileDropEntry,
    FileSystemFileEntry,
    FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { Genero } from 'src/app/api/models/genero/genero';
import { GeneroService } from 'src/app/api/services/api/genero/genero.service';
import { ImagenService } from 'src/app/api/services/api/imagen/imagen.service';

@Component({
    selector: 'app-pelicula',
    templateUrl: './pelicula.component.html',
    styleUrls: ['./pelicula.component.scss'],
    providers: [MessageService],
})
export class PeliculaComponent implements OnInit {
    pelicula: Pelicula = {};

    peliculas: Pelicula[] = [];
    generos: Genero[] = [];

    peliculaDialog: boolean = false;
    deletePeliculaDialog: boolean = false;
    submitted: boolean = false;

    peliculaForm!: FormGroup;

    cols: any[] = [];

    files: NgxFileDropEntry[] = [];
    selectedFile!: File;
    imageUrl: any;

    constructor(
        private peliculaService: PeliculaService,
        private generoService: GeneroService,
        private imagenService: ImagenService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private elRef: ElementRef
    ) {}

    ngOnInit(): void {
        this.loadPeliculas();
        this.loadGeneros();
        this.registerForm();

        this.cols = [
            { field: 'pelicula_id', header: 'Id' },
            { field: 'imagen.imagen_id', header: 'Imagen' },
            { field: 'titulo', header: 'Titulo' },
            { field: 'sinopsis', header: 'Sinopsis' },
            { field: 'generos.nombre', header: 'Genero' },
            { field: 'opciones', header: 'Opciones' },
        ];
    }

    loadPeliculas() {
        this.peliculaService.getPeliculas().subscribe((res) => {
            this.peliculas = res;
        });
    }

    loadGeneros() {
        this.generoService.getGeneros().subscribe((res) => {
            this.generos = res;
        });
    }

    registerForm() {
        this.peliculaForm = this.fb.group({
            pelicula_id: [''],
            titulo: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50),
                ],
            ],
            sinopsis: ['', [Validators.required, Validators.minLength(3)]],
            fecha_estreno: ['', Validators.required],
            estado: [''],
            imagen_id: [''],
            genero_id: ['', Validators.required],
        });
    }

    openNew() {
        this.fileRemove();
        this.peliculaForm.reset();
        this.peliculaDialog = true;
    }

    editPelicula(pelicula: Pelicula) {
        this.pelicula = { ...pelicula };
        this.peliculaForm.patchValue({
            pelicula_id: pelicula.pelicula_id,
            titulo: pelicula.titulo,
            sinopsis: pelicula.sinopsis,
            fecha_estreno: this.formatDate(pelicula.fecha_estreno ?? ''),
            imagen_id: pelicula.imagen?.imagen_id,
            genero_id: pelicula.genero?.genero_id,
        });

        this.imagenService.getImagen(pelicula.imagen?.imagen_id ?? 0).subscribe(
            (blob: Blob) => {
                // Crear un nuevo File a partir del Blob obtenido del servicio
                const imageFile = new File([blob], 'image', {
                    type: blob.type,
                });
                // Asignar el nuevo archivo a this.selectedFile
                this.selectedFile = imageFile;
                // Leer la imagen y asignarla a this.imageUrl para mostrarla en la interfaz
                const reader = new FileReader();
                reader.onloadend = () => {
                    this.imageUrl = reader.result;
                };
                reader.readAsDataURL(blob);
            },
            (error) => {
                console.error('Error al cargar la imagen:', error);
            }
        );

        this.peliculaDialog = true;
    }

    deletePelicula(pelicula: Pelicula) {
        this.pelicula = { ...pelicula };
        this.deletePeliculaDialog = true;
    }

    hideDialog() {
        this.peliculaDialog = false;
        this.submitted = false;
    }

    hideDeleteDialog() {
        this.deletePeliculaDialog = false;
    }

    savePelicula() {
        this.submitted = true;
    
        if (this.peliculaForm.invalid) {
            this.peliculaForm.markAllAsTouched();
            return;
        }
    
        this.pelicula.titulo = this.peliculaForm.get('titulo')?.value;
        this.pelicula.sinopsis = this.peliculaForm.get('sinopsis')?.value;
        this.pelicula.fecha_estreno = this.peliculaForm.get('fecha_estreno')?.value;
        this.pelicula.genero_id = this.peliculaForm.get('genero_id')?.value;
    
        if (!this.selectedFile && !this.pelicula.imagen_id) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'La imagen es requerida',
                life: 3000,
            });
            return;
        }
    
        const saveOrUpdate = () => {
            if (this.peliculaForm.value.pelicula_id) {
                console.log(this.pelicula);
                this.peliculaService.updatePelicula(this.pelicula).subscribe(
                    () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Película actualizada',
                            life: 3000,
                        });
                        this.peliculaDialog = false;
                        this.loadPeliculas();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Error al actualizar la película',
                            life: 3000,
                        });
                    }
                );
            } else {
                this.peliculaService.createPelicula(this.pelicula).subscribe(
                    () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Película creada',
                            life: 3000,
                        });
                        this.peliculaDialog = false;
                        this.loadPeliculas();
                    },
                    (error) => {
                        if (this.selectedFile) {
                            this.imagenService.deleteImagen(this.pelicula.imagen_id ?? 0).subscribe();
                        }
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Error al crear la película',
                            life: 3000,
                        });
                    }
                );
            }
        };
    
        if (this.selectedFile) {
            // Si hay un archivo seleccionado, se crea o actualiza la imagen
            this.imagenService.createImagen(this.selectedFile).subscribe(
                (res) => {
                    this.pelicula.imagen_id = res;
                    saveOrUpdate();
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al subir la imagen',
                        life: 3000,
                    });
                }
            );
        } else {
            // Si no hay un archivo seleccionado, se guarda o actualiza la película sin modificar la imagen
            saveOrUpdate();
        }
    }
    

    confirmDelete() {
        if (this.pelicula.imagen_id) {
            this.imagenService
                .deleteImagen(this.pelicula.imagen_id)
                .subscribe(() => {
                    this.peliculaService
                        .deletePelicula(this.pelicula.pelicula_id!)
                        .subscribe(
                            () => {
                                this.loadPeliculas();
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Successful',
                                    detail: 'Película eliminada',
                                    life: 3000,
                                });
                            },
                            (error) => {
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'Error al eliminar la película',
                                    life: 3000,
                                });
                            }
                        );
                });
        } else {
            this.peliculaService
                .deletePelicula(this.pelicula.pelicula_id!)
                .subscribe(
                    () => {
                        this.loadPeliculas();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Película eliminada',
                            life: 3000,
                        });
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Error al eliminar la película',
                            life: 3000,
                        });
                    }
                );
        }
        this.deletePeliculaDialog = false;
    }

    getImagenUrl(imagen: string): string {
        return 'data:image/png;base64,' + imagen;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    formatDate(date: string | Date): string {
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    }

    stringToDate(fecha: string): string {
        const date = new Date(fecha);
        const year = date.getFullYear().toString().slice(2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);

        return `${year}-${month}-${day}`;
    }

    dropped(files: NgxFileDropEntry[]) {
        this.files = files;
        for (const droppedFile of files) {
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {
                    if (
                        droppedFile.relativePath.match(/.(jpg|jpeg|png|gif)$/i)
                    ) {
                        const reader = new FileReader();
                        reader.addEventListener('load', () => {
                            this.imageUrl = reader.result;
                            this.selectedFile = file;
                        });
                        reader.readAsDataURL(file);
                        const getDropcozneClass =
                            this.elRef.nativeElement.querySelector(
                                '.image-drop-zone-body'
                            );
                        getDropcozneClass?.classList.remove('img-border-yes');
                        getDropcozneClass?.classList.add('img-border-none');
                    } else {
                        return;
                    }
                });
            } else {
                const fileEntry =
                    droppedFile.fileEntry as FileSystemDirectoryEntry;
                console.log(droppedFile.relativePath, fileEntry);
            }
        }
    }

    fileOver(event: any) {
        // console.log('uzerine gelince: ', event);
    }

    fileLeave(event: any) {
        // console.log('uzerinden ayrılınca: ', event);
    }

    fileRemove() {
        this.imageUrl = '';
        this.files.splice(0, 1);
        const getDropcozneClass = this.elRef.nativeElement.querySelector(
            '.image-drop-zone-body'
        );
        getDropcozneClass?.classList.remove('img-border-none');
        getDropcozneClass?.classList.add('img-border-yes');
        this.peliculaForm.get('imagen')?.reset();
        this.peliculaForm.get('imagen')?.reset();
    }
}
