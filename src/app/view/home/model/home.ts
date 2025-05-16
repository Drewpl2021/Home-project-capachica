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
export class Servicios {
  id?: string;
  category?: string;
  code?: string;
}
export class EmprendedorServicio {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  code?: string | null;
  cantidad?: number | null;
  costo?: number | null;
  costo_unidad?: string | null;
  status?: boolean | null;
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
