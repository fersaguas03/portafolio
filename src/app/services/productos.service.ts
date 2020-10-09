import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];
  productosFiltrados: ProductoInterface[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise((resolve, reject) => {

      this.http.get('https://angular-html-243a5.firebaseio.com/productos_idx.json')
        .subscribe((resp: ProductoInterface[]) => {
          console.log(resp);
          this.productos = resp;

          setTimeout(() => {
            this.cargando = false;
          }, 1000)

          resolve();
        });
    });
  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-243a5.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string) {

  if( this.productos.length === 0){
    //cargar productos
    this.cargarProductos().then(() =>{
      //ejecutar despues de tener los productos
      //aplicar filtros
      this.filtrarProductos( termino );
    });
  }
  else{
      //aplicar filtros
      this.filtrarProductos( termino );
  }
}
  
  private filtrarProductos( termino:string ){
    this.productosFiltrados = [];

    termino = termino.toLocaleLowerCase();
    console.log(this.productos);
    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0){
        this.productosFiltrados.push( prod );
      }
    });
  }
}
