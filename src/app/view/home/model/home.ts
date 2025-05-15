export class Asociacion {
  id?: string;
  nombre?: string;
  descripcion?: string;
  lugar?: string;
  url?: string;
  estado?: boolean;
  municipalidadId?: string;
  imagenes?: {
    id: string;
    url_image: string;
    estado: boolean;
    codigo: string;
  }[];
}


export interface ApiResponse {
  content: Asociacion[];
  totalElements: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
}
