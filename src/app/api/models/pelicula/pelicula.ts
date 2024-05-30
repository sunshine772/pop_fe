import { Genero } from "../genero/genero";
import { Imagen } from "../imagen/imagen";

export interface Pelicula {
    pelicula_id?: number;
    titulo?: string;
    sinopsis?: string;
    fecha_estreno?: string;
    estado?: boolean;
    imagen_id?: number;
    genero_id?: number;

    imagen?:Imagen;
    genero?:Genero;
  }
  