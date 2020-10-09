import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo : any[] = [];

  
  //HttpClient toma servidores externos
  constructor(private http: HttpClient) {
    // console.log("Servicio pagina");
    this.cargarInfo();
    this.cargarEquipo();

  }

  private cargarInfo() {
    //Leer el archivo JSON
    this.http.get('assets/data/data-pagina.json')
      //Todos
      .subscribe((resp: InfoPagina) => {

        this.cargada = true;
        this.info = resp;
        // console.log(resp);

        //Personalizado
        // .subscribe(resp => {
        //   console.log(resp['facebook']);
      });
  }

  public cargarEquipo(){

     //Leer el archivo JSON
     this.http.get('https://angular-html-243a5.firebaseio.com/equipo.json')
     //Todos
     .subscribe((resp: any[]) => {

       this.equipo = resp;
       console.log("recibo equipos" +resp);

       //Personalizado
       // .subscribe(resp => {
       //   console.log(resp['facebook']);
     });

  }


}
