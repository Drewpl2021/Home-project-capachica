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
}


export interface ApiResponse {
  content: EmprendedorServicio[];
  totalElements: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
}

