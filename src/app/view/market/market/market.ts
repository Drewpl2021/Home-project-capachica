import {Asociacion} from '../../home/model/home';

export interface EmprendedorServicio {
  id: string;
  status: number;
  service_id: string;
  emprendedor_id: string;
  cantidad: number;
  name: string;
  description: string;
  costo: string;
  costo_unidad: string | null;
  code: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  emprendedor: {
    id: string;
    razon_social: string;
    address: string;
    lugar: string,

    // ... otros campos
  };
  service: {
    id: string;
    name: string;
    code: string;
    category: string;
    // ... otros campos
  };
  img_emprendedor_services: Array<{
    id: string;
    url_image: string;
    description: string | null;
    estado: number;
    code: string;
    // ... otros campos
  }>;
  imagenes: Array<{
    id: string;
    url_image: string;
    description: string | null;
    estado: number;
    code: string;
    // ... otros campos
  }>;
}

export class Servicios {
  id?: string;
  category?: string;
  code?: string;
}

export interface ApiResponse {
  content: EmprendedorServicio;
  totalElements: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
}

export interface ApiResponsedes {
  content: EmprendedorServicio[];
  totalElements: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
}
export interface ApiResponsable {
  content: Asociacion[];
  totalElements: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
}

