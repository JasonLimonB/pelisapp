import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/CarteleraResponse';


@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() peliculas:Movie[]; 

  constructor(
    private _route: Router
  ) { }

  ngOnInit(): void {
  }

  detalle( pelicula:Movie ){
    this._route.navigate(['/pelicula',pelicula.id]);
  }

}
