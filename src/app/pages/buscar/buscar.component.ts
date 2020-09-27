import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/CarteleraResponse';
import { PeliculasService } from 'src/app/services/peliculas/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  constructor(
    private _activeRoute:ActivatedRoute,
    private _SPelis: PeliculasService
  ) { }

  public valorBusqueda:string;
  public pelis:Movie[];

  ngOnInit(): void {
    this._activeRoute.params.subscribe(parametro =>{
      this.valorBusqueda = parametro.texto;
      this._SPelis.buscarPeliculas(parametro.texto).subscribe( movies =>{
        this.pelis = movies;
      })
    })
  }

}
