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
  private _items = signal<ItemCarrito[]>(this.getCarritoFromStorage());

  items = this._items.asReadonly();

  private getCarritoFromStorage(): ItemCarrito[] {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
  }

  saveCarritoToStorage(items: ItemCarrito[]): void {
    localStorage.setItem('carrito', JSON.stringify(items));
  }

  agregarItem(item: Omit<ItemCarrito, 'cantidad'>) {
    this._items.update(items => {
      const index = items.findIndex(i => i.titulo === item.titulo);
      let updatedItems;

      if (index !== -1) {
        updatedItems = [...items];
        updatedItems[index] = {
          ...updatedItems[index],
          cantidad: updatedItems[index].cantidad + 1
        };
      } else {
        updatedItems = [...items, {...item, cantidad: 1}];
      }

      this.saveCarritoToStorage(updatedItems);
      return updatedItems;
    });
  }

  eliminarItem(titulo: string) {
    this._items.update(items => {
      const updatedItems = items.filter(item => item.titulo !== titulo);
      this.saveCarritoToStorage(updatedItems);
      return updatedItems;
    });
  }

  vaciarCarrito() {
    this._items.set([]);
    localStorage.removeItem('carrito');
  }

  cargarCarrito(items: ItemCarrito[]) {
    this._items.set(items);
    this.saveCarritoToStorage(items);
  }
}
