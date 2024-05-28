import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Genero } from 'src/app/api/models/genero/genero';
import { GeneroService } from 'src/app/api/services/api/genero/genero.service';

@Component({
    selector: 'app-genero',
    templateUrl: './genero.component.html',
    styleUrl: './genero.component.scss',
    providers: [MessageService],
})
export class GeneroComponent {
    generoDialog: boolean = false;
    deleteGeneroDialog: boolean = false;
    deleteGenerosDialog: boolean = false;

    genero: Genero = {};
    generos: Genero[] = [];
    cols: any[] = [];

    submitted: boolean;

    constructor(
        private generoService: GeneroService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.generoService.getGeneros().subscribe((res) => {
            this.generos = res;
        });

        this.cols = [
            { field: 'genero_id', header: 'id' },
            { field: 'nombre', header: 'Nombre' },
            { field: 'estado', header: 'Estado' },
        ];
    }

    openNew() {
        this.genero = {};
        this.submitted = false;
        this.generoDialog = true;
    }

    editGenero(genero: Genero) {
        this.genero = { ...genero };
        this.generoDialog = true;
    }

    deleteGenero(genero: Genero) {
        this.deleteGeneroDialog = true;
        this.genero = { ...genero };
    }

    confirmDelete() {
        this.deleteGeneroDialog = false;
        this.generos = this.generos.filter(
            (val) => val.genero_id !== this.genero.genero_id
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Deleted',
            life: 3000,
        });
        this.genero = {};
    }

    hideDialog() {
        this.generoDialog = false;
        this.submitted = false;
    }

    saveGenero() {
        this.submitted = true;

        if (this.genero.nombre?.trim()) {
            if (this.genero.genero_id) {
                // @ts-ignore
                // this.genero.inventoryStatus = this.genero.inventoryStatus.value
                //     ? this.genero.inventoryStatus.value
                //     : this.genero.inventoryStatus;
                // this.generos[this.findIndexById(this.genero.genero_id)] =
                //     this.genero;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Updated',
                    life: 3000,
                });
            } else {
                // this.genero.id = this.createId();
                // this.genero.code = this.createId();
                // this.genero.image = 'genero-placeholder.svg';
                // @ts-ignore
                // this.genero.inventoryStatus = this.genero.inventoryStatus
                //     ? this.genero.inventoryStatus.value
                //     : 'INSTOCK';
                // this.generos.push(this.genero);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Created',
                    life: 3000,
                });
            }

            this.generos = [...this.generos];
            this.generoDialog = false;
            this.genero = {};
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.generos.length; i++) {
            if (this.generos[i].genero_id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
