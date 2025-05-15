import { Injectable, signal } from '@angular/core';

export interface ItemCarrito {
  titulo: string;
  descripcion: string;
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private _items = signal<ItemCarrito[]>([]);
  items = this._items.asReadonly();

  agregarItem(item: ItemCarrito) {
    this._items.update(items => [...items, item]);
  }

  vaciarCarrito() {
    this._items.set([]);
  }
}
