import { Injectable, signal } from '@angular/core';

export interface ItemCarrito {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  cantidad: number;
  precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private _items = signal<ItemCarrito[]>([]);
  items = this._items.asReadonly();

  agregarItem(item: Omit<ItemCarrito, 'cantidad'>) {
    this._items.update(items => {
      const index = items.findIndex(i => i.titulo === item.titulo);
      if (index !== -1) {
        // Ya existe, aumentar cantidad
        const updatedItems = [...items];
        updatedItems[index] = {
          ...updatedItems[index],
          cantidad: updatedItems[index].cantidad + 1
        };
        return updatedItems;
      } else {
        // Nuevo item con cantidad 1
        return [...items, {...item, cantidad: 1}];
      }
    });
  }
  eliminarItem(titulo: string) {
    this._items.update(items =>
      items.filter(item => item.titulo !== titulo)
    );
  }


  vaciarCarrito() {
    this._items.set([]);
  }
}
