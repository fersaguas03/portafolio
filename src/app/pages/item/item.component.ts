import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  cargando=true;
  producto: ProductoDescripcion;
  id:string;
  constructor(private route: ActivatedRoute, public productoService: ProductosService) { }

  ngOnInit() {

    this.route.params.subscribe(paramateros => {
      // console.log(paramateros['id']); Muestra solo el prod_4
      this.productoService.getProducto(paramateros['id'])
        .subscribe((producto: ProductoDescripcion) => {
          //console.log(producto); //Muestra toda la descripcion del producto prod_4
          this.id = paramateros['id'];
          this.producto = producto;
          setTimeout(() => {
            this.cargando = false;
          }, 1000)
        });
    })
  }

}
