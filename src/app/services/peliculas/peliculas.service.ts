import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import {CarteleraResponse, Movie} from '../../interfaces/CarteleraResponse';
import { catchError, map, tap } from 'rxjs/operators'

import { MovieResponse } from 'src/app/interfaces/movie-response';
import { Cast, CreditsResponse } from 'src/app/interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private url: string = "https://api.themoviedb.org/3";
  private carteleraPage = 1;
  public cargando:boolean = false;

  constructor( private _http: HttpClient ) { }

  get params(){
    return {
      api_key:'61bb3c646849ba10fa3048ed5e03d9c6',
      language: 'es-Es' ,
      page: this.carteleraPage.toString()
    }
  }

  getCartelera() :Observable<Movie[]> {

    if(this.cargando){
      return of([]);
    }

    this.cargando = true;

    return this._http.get<CarteleraResponse>(`${this.url}/movie/now_playing?`,{
      params: this.params
    }).pipe(
      map( (resp)=> resp.results),
      tap( ()=>{
        this.carteleraPage += 1;
        this.cargando = false;
      } )
    )
  
  }

  resetCartelera(){
    this.carteleraPage = 1;
  }

  buscarPeliculas( texto: string ):Observable<Movie[]>{
    const params = {...this.params, page: '1', query: texto};

    return this._http.get<CarteleraResponse>(`${this.url}/search/movie`,{
      params
    }).pipe(
      map( resp => resp.results )
    )
  }

  getPeliculaDetalle( id:string ){
    return this._http.get<MovieResponse>(`${this.url}/movie/${id}`,{
      params: this.params
    }).pipe(
      catchError( err => of(null) )
    )
  }

  getCast( id: string ):Observable<Cast[]>{
    return this._http.get<CreditsResponse>(`${this.url}/movie/${id}/credits`,{
      params: this.params
    }).pipe(
      map( res => res.cast)
    );
  }

}
