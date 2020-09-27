import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Cast } from 'src/app/interfaces/credits-response';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public peli: MovieResponse;
  public cast:Cast[] = [];

  constructor(
    private _ARoute: ActivatedRoute,
    private _SPelis: PeliculasService,
    private _location:Location,
    private _route: Router
  ) { }

  ngOnInit(): void {

    const {id} = this._ARoute.snapshot.params;

    combineLatest([
      this._SPelis.getPeliculaDetalle(id),
      this._SPelis.getCast(id)
    ]).subscribe(([pelicula, cast]) =>{
      if( !pelicula ){
        this._route.navigateByUrl("/home");
      }
      this.peli = pelicula;
      this.cast = cast.filter( actor => actor.profile_path !== null )
    })

  }

  volver(){
    this._location.back();
  }

}
